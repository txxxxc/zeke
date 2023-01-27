import { client, Admin, ADMIN_COLLECTION_KEY } from '@/lib/firestore'

export const getAdminMembers = async (): Promise<Admin[]> => {
  const result: Admin[] = []
  const data = await client.firestore().collection(ADMIN_COLLECTION_KEY).get()
  for (const admin of data.docs) {
    result.push(admin.data() as Admin)
  }
  return result
}
