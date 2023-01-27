import { client, Post, POSTS_COLLECTION_KEY, PostSchema } from '@/lib/firestore'

export const savePost = async (params: Post): Promise<Post> => {
  // firestoreに保存する
  const writeResult = await client
    .firestore()
    .collection(POSTS_COLLECTION_KEY)
    .add({
      ...params,
    })

  const document = await writeResult.get()
  const data = PostSchema.parse(document.data())
  return data
}
