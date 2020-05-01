import React from "react";

import CommentsAppbar from "../components/CommentsAppbar";

interface IProps {
  navigation: any;
}

export default function Comments({ navigation }: IProps) {
  return (
    <>
      <CommentsAppbar navigation={navigation} />
    </>
  );
}
