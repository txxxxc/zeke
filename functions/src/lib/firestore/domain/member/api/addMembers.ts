import { Member, client, MEMBERS_COLLECTION_KEY } from '@/lib/firestore/'
import { DocumentData, DocumentReference } from 'firebase-admin/firestore'

export const addMembers = async (
  members: Member[]
): Promise<DocumentReference<DocumentData>[]> => {
  const results: DocumentReference<DocumentData>[] = []
  for (const member of members) {
    const writeResult = await client
      .firestore()
      .collection(MEMBERS_COLLECTION_KEY)
      .add({
        ...member,
      })
    results.push(writeResult)
  }
  return results
}
