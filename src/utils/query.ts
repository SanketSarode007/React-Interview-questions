import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getPosts, getOnePost, getUsers } from "./queryFn"
import { PostData } from "../types/posts.types"
import { createQueryKeys } from "@lukemorales/query-key-factory"

export const postsKeys = createQueryKeys('posts', {
    all: ['posts'],
})

console.log("D")

export const usePosts = (): UseQueryResult<PostData[], Error>  => {
   return useQuery<PostData[], Error>({
        queryKey: postsKeys.all.queryKey,
        queryFn:  getPosts
    })
}

export const useOnePosts = (id : string): UseQueryResult<PostData, Error>  => {
   return useQuery<PostData, Error>({
        queryKey: ['oneposts', {id}],
        queryFn: () =>  getOnePost(id)
    })
}

export const useUsers = (colName: string, orderBy: string) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(colName, orderBy)
    })
}