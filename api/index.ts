export const API_BASE =
  "https://corsssssss.herokuapp.com/https://dev.lemmy.ml/api/v1";

export async function getPosts(jwt: string, type = "Subscribed", sort = "Hot") {
  const res = await fetch(
    API_BASE + `/post/list?type_=${type}&sort=${sort}&auth=${jwt}`
  );
  return (await res.json()).posts;
}

export async function login(
  username: string,
  password: string
): Promise<Response> {
  return await fetch(API_BASE + "/user/login", {
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
