export const API_BASE =
  "https://corsssssss.herokuapp.com/https://dev.lemmy.ml/api/v1";

export async function getPosts(jwt: string, type = "Subscribed", sort = "Hot") {
  const res = await fetch(
    `${API_BASE}/post/list?type_=${type}&sort=${sort}&auth=${jwt}`
  );
  return (await res.json()).posts;
}
