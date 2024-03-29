import { AdminSchema } from '@/lib/firestore'
import { AdminMembersAddUseCase } from '@/usecase'
import { Request, Response , https } from 'firebase-functions'
import { z } from 'zod'

const RequestSchema = z.object({
  adminMembers: z.array(AdminSchema),
})

export const add = https.onRequest(async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    res.status(405).json('This endpoint allows POST method only')
    return
  }
  const parseResult = RequestSchema.safeParse(req.body)
  if (!parseResult.success) {
    res.status(400).json('Invalid Parameters')
    return
  }
  const { adminMembers } = parseResult.data
  const usecase = new AdminMembersAddUseCase()
  await usecase.do({ adminMembers })
  res.status(200).json('Members are sucessfully added')
})
