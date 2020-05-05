import React, { useContext, useEffect, useState } from "react";

import CommentsAppbar from "../components/CommentsAppbar";
import { getPost } from "../api";
import { Context } from "../components/Store";

interface IProps {
  navigation: any;
  route: any;
}

export default function Comments({ navigation, route }: IProps) {
  const { id } = route.params;
  const [state, ] = useContext(Context);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getPost(id, state.server, state.jwt);
      setComments(res.comments);

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
            index,
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

      console.log(organizedComments);
    })();
  }, []);

  return (
    <>
      <CommentsAppbar navigation={navigation} />
    </>
  );
}
