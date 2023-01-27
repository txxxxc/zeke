import { addAdminMembers, Admin } from '@/lib/firestore'
import { IUseCase } from '@/usecase'

export type AdminMembersAddInputs = {
  adminMembers: Admin[]
}

// FIX: 複数じゃないほうがDDDっぽいね
export class AdminMembersAddUseCase
  implements IUseCase<AdminMembersAddInputs, void>
{
  async do(inputs: AdminMembersAddInputs): Promise<void> {
    try {
      await addAdminMembers(inputs.adminMembers)
    } catch (error: unknown) {
      throw Error('cannot add admin members')
    }
  }
}
