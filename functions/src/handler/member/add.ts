import { MemberSchema } from '@/lib/firestore'
import { MembersAddUseCase } from '@/usecase'
import { Request, Response , https } from 'firebase-functions'
import { z } from 'zod'

const RequestSchema = z.array(MemberSchema)

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
  const members = parseResult.data
  const usecase = new MembersAddUseCase()
  await usecase.do({ members: members })
  res.status(200).json('Members are sucessfully added')
  return
})

