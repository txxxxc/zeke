export type Unwrap<T> = {
  [P in keyof T]-?: T[P]
}

export const hasProperty = <T extends Record<string, unknown>>(
  object: T
): object is Unwrap<T> => {
  return Object.values(object).every((value) => value)
}
