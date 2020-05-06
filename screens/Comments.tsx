import React, { useContext, useEffect, useState } from "react";
import Comment from "../components/Comment";
import { Text } from "react-native-paper";
import CommentsAppbar from "../components/CommentsAppbar";
import { getPost } from "../api";
import { Context } from "../components/Store";

interface IProps {
  navigation: any;
  route: any;
}

interface CommentData {
  data: any;
  children: any[];
}

export default function Comments({ navigation, route }: IProps) {
  const { id } = route.params;
  const [state] = useContext(Context);
  const initialState: CommentData[] | null = null;
  const [comments, setComments] = useState(initialState);

  useEffect(() => {
    (async () => {
      const res = await getPost(id, state.server, state.jwt);

      let idsToChildren: idsToChildren = {};

      const topLevelComments: number[] = [];

      for (const [index, comment] of res.comments.entries()) {
        const { parent_id } = comment;
        if (parent_id !== null) {
          if (!idsToChildren[parent_id]) {
            idsToChildren[parent_id] = [];
          }
          idsToChildren[parent_id].push(index);
        } else {
          topLevelComments.push(index);
        }
      }
      let indexesToChildren: idsToChildren = {};

      for (const [index, comment] of res.comments.entries()) {
        const { id } = comment;
        if (idsToChildren[id]) {
          indexesToChildren[index] = idsToChildren[id];
        }
      }
      // recursive
      function getChildren(index: number): any {
        if (indexesToChildren[index]) {
          return {
            data: res.comments[index],
            children: indexesToChildren[index].map((childIndex) =>
              getChildren(childIndex)
            ),
          };
        } else {
          return { data: res.comments[index], children: null };
        }
      }

      let organizedComments: any = [];
      topLevelComments.forEach((index) => {
        organizedComments.push(getChildren(index));
      });

      setComments(organizedComments);
    })();
  }, []);

  return (
    <>
      <CommentsAppbar navigation={navigation} />
      {comments !== null ? (
        ((comments as unknown) as CommentData[]).map((comment, index) => {
          return (
            <Comment
              indent={0}
              key={index}
              data={comment.data}
              children={comment.children}
            />
          );
        })
      ) : (
        <Text>Loading comments...</Text>
      )}
    </>
  );
}
