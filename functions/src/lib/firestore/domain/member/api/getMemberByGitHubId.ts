import { Member, MEMBERS_COLLECTION_KEY, client } from '@/lib/firestore'

export const getMemberByGitHubId = async (id: string): Promise<Member> => {
  // TODO: エラーハンドリング頼んだ
  const githubId: Extract<keyof Member, 'githubId'> = 'githubId'
  const collectionRef = client.firestore().collection(MEMBERS_COLLECTION_KEY)
  const searchResult = await collectionRef.where(githubId, '==', id).get()
  const data = searchResult.docs[0].data() as Member
  return data
}
