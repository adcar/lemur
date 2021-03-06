import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import {
  Button,
  Card,
  Title,
  IconButton,
  Text,
  withTheme,
} from "react-native-paper";
import FitImage from "react-native-fit-image";
import { Linking } from "expo";
import { downvote, undovote, upvote } from "../api";
import { Context } from "./Store";
import Toast from "react-native-easy-toast";

interface IProps {
  navigation: any;
  theme: any;

  community_name: string;
  url: string | null;
  name: string;
  body: string | null;
  score: number;
  thumbnail_url: string | null;
  published: string;
  creator_actor_id: string;
  community_actor_id: string;
  creator_avatar: string | null;
  number_of_comments: number;
  local: boolean;
  saved: boolean;
  id: number;
  my_vote: number;
}

const styles = StyleSheet.create({
  root: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    margin: 10,
    flex: 0.7,
  },
  image: {
    width: 100,
    height: 100,
    flex: 0.3,
  },
  row: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
  },
});

function Post(props: IProps) {
  const [state] = useContext(Context);
  // -1, 0, 1
  const [vote, setVote] = useState(props.my_vote);
  const [score, setScore] = useState(props.score);

  const toast = useRef();

  const { colors } = props.theme;
  const { url, thumbnail_url } = props;

  async function openUrl() {
    if (url !== null) {
      await Linking.openURL(url);
    }
  }
  let heading;
  if (url !== null) {
    if (url.includes("pictshare")) {
      heading = (
        <>
          <Title style={styles.title}>
            <Text>{props.name}</Text>
          </Title>
          <FitImage source={{ uri: url }} />
        </>
      );
    } else if (thumbnail_url !== null) {
      heading = (
        <TouchableOpacity onPress={openUrl} style={styles.row}>
          <Title style={styles.title}>{props.name}</Title>
          <Image
            style={styles.image}
            source={{
              uri: `https://${state.server}/pictshare/${thumbnail_url}`,
            }}
          />
        </TouchableOpacity>
      );
    } else {
      heading = (
        <TouchableOpacity onPress={openUrl} style={styles.row}>
          <Title style={styles.title}>{props.name}</Title>
          <Image
            style={styles.image}
            source={{
              uri:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/External_link_font_awesome.svg/1200px-External_link_font_awesome.svg.png",
            }}
          />
        </TouchableOpacity>
      );
    }
  } else {
    heading = (
      <Title style={{ margin: styles.title.margin }}>{props.name}</Title>
    );
  }

  function doVote(type: "UPVOTE" | "DOWNVOTE") {
    if (type === "UPVOTE" && vote === 0) {
      setVote(1);
      setScore(score + 1);
      upvote(props.id, state.jwt, state.server)
        .then()
        .catch(() => {
          // Undo
          state.toast.current.show("CNetwork error occurred: Couldn't upvote");
          setScore(props.score);
          setVote(0);
        });
    } else if (type === "UPVOTE" && vote === -1) {
      setVote(1);
      setScore(score + 2);
      upvote(props.id, state.jwt, state.server)
        .then()
        .catch(() => {
          // Undo
          state.toast.current.show("Network error occurred");
          setScore(props.score);
          setVote(0);
        });
    } else if (type === "DOWNVOTE" && vote === 0) {
      setVote(-1);
      setScore(score - 1);
      downvote(props.id, state.jwt, state.server)
        .then()
        .catch(() => {
          state.toast.current.show("Network error occurred");
          setScore(props.score);
          setVote(0);
        });
    } else if (type === "DOWNVOTE" && vote === 1) {
      setVote(-1);
      setScore(score - 2);
      downvote(props.id, state.jwt, state.server)
        .then()
        .catch(() => {
          state.toast.current.show("Network error occurred");
          setScore(props.score);
          setVote(0);
        });
    } else {
      setVote(0);
      if (type === "DOWNVOTE") {
        setScore(score + 1);
        undovote(props.id, state.jwt, state.server)
          .then()
          .catch(() => {
            state.toast.current.show(
              "Network error occurred: Couldn't undo vote"
            );
            setScore(props.score);
            setVote(-1);
          });
      }
      if (type === "UPVOTE") {
        setScore(score - 1);
        undovote(props.id, state.jwt, state.server)
          .then()
          .catch(() => {
            state.toast.current.show(
              "Network error occurred: Couldn't undo vote"
            );
            setScore(props.score);
            setVote(1);
          });
      }
    }
  }

  let color;
  switch (vote) {
    case -1:
      color = colors.accent;
      break;
    case 1:
      color = colors.primary;
      break;
    case 0:
    default:
      color = colors.text;
  }

  return (
    <>
      <Toast ref={toast} />
      <Card style={styles.root}>
        {heading}
        <Card.Actions>
          <Button
            icon="comment-multiple"
            onPress={() =>
              props.navigation.navigate("Comments", { id: props.id })
            }
          ><Text style={{color:'#8e44ad', fontSize:12}}>
            {props.number_of_comments} comments</Text>
          </Button>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              icon="arrow-up-thick"
              onPress={() => doVote("UPVOTE")}
              color={vote === 1 ? colors.primary : colors.text}
            />
            <Text
              style={{
                color,
              }}
            >
              {score}
            </Text>
            <IconButton
              icon="arrow-down-thick"
              onPress={() => doVote("DOWNVOTE")}
              color={vote === -1 ? colors.accent : colors.text}
            />
            <IconButton icon="star" />
            <IconButton icon="dots-vertical" />
          </View>
        </Card.Actions>
      </Card>
    </>
  );
}

export default withTheme(Post);
