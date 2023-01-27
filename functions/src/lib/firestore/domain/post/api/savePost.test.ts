import { firestore } from 'firebase-admin'
import { describe, it, assert } from 'vitest'
import { POSTS_COLLECTION_KEY, savePost } from '@/lib/firestore'

describe('Cloud Functions', () => {
  it('should success', async () => {
    const result = await savePost({
      channelId: '1',
      discussionId: '2',
      ts: '100',
    })

    assert.equal(result.channelId, '1')
    assert.equal(result.discussionId, '2')
    assert.equal(result.ts, '100')
    await firestore()
      .collection(POSTS_COLLECTION_KEY)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((snapshot) => {
          snapshot.ref.delete()
        })
      })
  })
})
