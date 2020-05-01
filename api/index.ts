function getBase(server: string) {
  return `https://corsssssss.herokuapp.com/https://${server}/api/v1`;
}

export async function getPosts(
  jwt: string,
  type = "Subscribed",
  page = 1,
  sort = "Hot",
  server = "dev.lemmy.ml"
) {
  const apiBase = getBase(server);
  const res = await fetch(
    apiBase + `/post/list?type_=${type}&auth=${jwt}&page=${page}&sort=${sort}`
  );
  return (await res.json()).posts;
}

export async function login(
  username: string,
  password: string,
  server: string
): Promise<Response> {
  const apiBase = getBase(server);
  return await fetch(apiBase + "/user/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username_or_email: username,
      password: password,
    }),
  });
}
