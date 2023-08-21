import { httpClient } from '../httpClient'

export interface CreatePostData {
  title: string
  content: string
  categoryId: string
  image: FileList
  tags?: string[]
}

export interface CreatePostResponse {
  post: {
    id: string
    title: string
    content: string
    image: string
    tags: string[]
    createdAt: string
    authorId: string
    categoryId: string
  }
}

export const create = async (
  body: CreatePostData,
): Promise<CreatePostResponse> => {
  const { data } = await httpClient.post<CreatePostResponse>('/posts', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}
