import React from "react";
import Comment from "./Comment";
import { Text } from "react-native-paper";
interface IProps {
  comments: IComment[];
  topLevelComments: number[];
  idsToChildren: idsToChildren;
}

export default function AllComments(props: IProps) {
  const coms = props.comments.map((comment) => {
    return addChildrenToComment(comment);
  });

  console.log(coms);
  function addChildrenToComment(comment: IComment) {
    let newComment = comment;

    // @ts-ignore
    newComment["children"] = getChildren(comment.id);
    return newComment;
  }

  function getChildren(id: number) {
    let children = [];
    props.idsToChildren[id].forEach((childId) => {
      props.comments.forEach((comment) => {
        if (comment.id === childId) {
          children.push(comment);
        }
      });
    });

    return children;
  }

  return <Text>Hello</Text>;
}
