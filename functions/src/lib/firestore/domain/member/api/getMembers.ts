import { Member, client, MEMBERS_COLLECTION_KEY } from '@/lib/firestore/index'

export const getMembers = async (): Promise<Member[]> => {
  const result: Member[] = []
  const data = await client.firestore().collection(MEMBERS_COLLECTION_KEY).get()
  // TODO: error handling
  for (const admin of data.docs) {
    result.push(admin.data() as Member)
  }
  return result
}
