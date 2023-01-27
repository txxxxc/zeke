import { client, Post, POSTS_COLLECTION_KEY } from '@/lib/firestore'

export type GetPostInput = {
  discussionId: Post['discussionId']
}

export const getPost = async (params: GetPostInput): Promise<Post> => {
  const { discussionId } = params
  const discussionIdField: Extract<keyof GetPostInput, 'discussionId'> =
    'discussionId'
  const collectionRef = client.firestore().collection(POSTS_COLLECTION_KEY)
  const searchResult = await collectionRef
    .where(discussionIdField, '==', discussionId)
    .get()
  const snapshot = searchResult.docs[0]
  const data = snapshot.data() as Post
  return data
}
