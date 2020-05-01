import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button, Card, Title, IconButton, Text } from "react-native-paper";

import FitImage from "react-native-fit-image";

import { Linking } from "expo";

interface IProps {
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
export default function Post(props: IProps) {
  let heading;

  const { url, thumbnail_url } = props;

  async function openUrl() {
    if (url !== null) {
      await Linking.openURL(url);
    }
  }

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
      // TODO: Make this not hardcoded
      heading = (
        <TouchableOpacity onPress={openUrl} style={styles.row}>
          <Title style={styles.title}>{props.name}</Title>
          <Image
            style={styles.image}
            source={{
              uri: `https://dev.lemmy.ml/pictshare/${thumbnail_url}`,
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

  return (
    <Card style={styles.root}>
      {heading}
      <Card.Actions>
        <Button icon="comment-multiple">
          {props.number_of_comments} comments
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
            onPress={() => console.log("Pressed")}
          />
          <Text>{props.score}</Text>
          <IconButton
            icon="arrow-down-thick"
            onPress={() => console.log("Pressed")}
          />
          <IconButton icon="star" />
          <IconButton icon="dots-vertical" />
        </View>
      </Card.Actions>
    </Card>
  );
}
