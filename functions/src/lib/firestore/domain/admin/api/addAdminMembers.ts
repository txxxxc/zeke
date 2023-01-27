import { DocumentData, DocumentReference } from 'firebase-admin/firestore'
import { Admin, client, ADMIN_COLLECTION_KEY } from '@/lib/firestore'

export const addAdminMembers = async (
  adminMembers: Admin[]
): Promise<DocumentReference<DocumentData>[]> => {
  const results: DocumentReference<DocumentData>[] = []
  for (const admin of adminMembers) {
    const writeResult = await client
      .firestore()
      .collection(ADMIN_COLLECTION_KEY)
      .add({
        ...admin,
      })
    results.push(writeResult)
  }
  return results
}
