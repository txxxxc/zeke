export interface IUseCase<T, U> {
  do(payload: T): Promise<U>
}
