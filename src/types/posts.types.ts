export interface PostResponse {
  posts: PostData[]
  total: number
  skip: number
  limit: number
}

export interface PostData {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
}

export interface Reactions {
  likes: number
  dislikes: number
}