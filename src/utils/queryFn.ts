import { PostData, PostResponse } from "../types/posts.types";
import { api } from "../services/api";

export async function getPosts(): Promise<PostData[]>{
    const response = await api.get('/posts')
    const postsResponse = response.data
    return postsResponse.posts;
}

console.log("C")

export async function getOnePost(id: string): Promise<PostData>{
    const response = await api.get(`/posts/${id}`)
    return response.data;
}