import { IUseCase } from '@/usecase'
import { addMembers, Member } from '@/lib/firestore'

export type MembersAddInputs = {
  members: Member[]
}

// FIX: 複数じゃないほうがDDDっぽいね
export class MembersAddUseCase implements IUseCase<MembersAddInputs, void> {
  async do(inputs: MembersAddInputs): Promise<void> {
    try {
      await addMembers(inputs.members)
    } catch (error: unknown) {
      throw Error('cannot add members')
    }
  }
}
