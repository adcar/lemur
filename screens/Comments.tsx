import React, {useContext, useEffect, useState} from "react";

import CommentsAppbar from "../components/CommentsAppbar";
import { getPost } from "../api";
import { Context } from "../components/Store";

interface IProps {
  navigation: any;
  route: any;
}

export default function Comments({ navigation, route }: IProps) {
  const { id } = route.params;
  const [state, dispatch] = useContext(Context);
  const [post, setPost] = useState({});
  useEffect(() => {
    (async () => {
      const res = await getPost(id, state.server);
      setPost(res);
    })();
  }, []);

  return (
    <>
      <CommentsAppbar navigation={navigation} />
    </>
  );
}
