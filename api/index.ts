function getBase(server: string) {
    return `https://corsssssss.herokuapp.com/https://${server}/api/v1`;
}

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

export async function getPosts(
    jwt: string,
    type = "Subscribed",
    page = 1,
    sort = "Hot",
    server = "dev.lemmy.ml",
    id?:number
) {
    const apiBase = getBase(server);
    let res;
    if (type==="Community"){
        res = await fetch(apiBase+`/post/list?type_=Community&sort=${sort}&community_id=${id}&page=${page}&auth=${jwt}`);
    }
    else {
        res = await fetch(
            apiBase + `/post/list?type_=${type}&auth=${jwt}&page=${page}&sort=${sort}`
        );
    }
    return (await res.json()).posts;
}



export async function getPost(
    id: number,
    server = "dev.lemmy.ml",
    jwt: string,
    sort: "Hot" | "Top" | "New" | "Old" = "Hot"
) {
  const apiBase = getBase(server);
  const res = await fetch(apiBase + `/post?id=${id}&sort=${sort}&auth=${jwt}`);
  return await res.json();
}

export async function login(
    username: string,
    password: string,
    server: string
): Promise<Response> {
    const apiBase = getBase(server);
    console.log("url" + apiBase + "/user/login");
    return await fetch(apiBase + "/user/login", {
        method: "POST",
        headers,
        body: JSON.stringify({
            username_or_email: username,
            password: password,
        }),
    });
}

export async function upvote(id: number, jwt: string, server: string) {
    const {my_vote, score} = await vote(1, id, jwt, server);
    return {my_vote, score};
}

export async function downvote(id: number, jwt: string, server: string) {
    const {my_vote, score} = await vote(-1, id, jwt, server);
    return {my_vote, score};
}

export async function undovote(id: number, jwt: string, server: string) {
    const {my_vote, score} = await vote(0, id, jwt, server);
    return {my_vote, score};
}

async function vote(vote: number, id: number, jwt: string, server: string) {
    const apiBase = getBase(server);
    const res = await fetch(apiBase + "/post/like", {
        method: "POST",
        headers,
        body: JSON.stringify({
            post_id: id,
            score: vote,
            auth: jwt,
        }),
    });

    return (await res.json()).post;
}

//returns a list of communities the user follows
export async function followedCommunities(jwt: string, server: string) {
    const apiBase = getBase(server);
    const res = await fetch(apiBase + `/user/followed_communities?auth=${jwt}`);
    return (await res.json()).communities;
}

//community details
export async function getCommunity(jwt:string, server:string, id:any, name:string){
    const apiBase = getBase(server);
    const res = await fetch(apiBase+`/community?id=${id}&name=${name}&auth=${jwt}`);
    return (await res.json());

}


