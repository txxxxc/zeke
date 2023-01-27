import { ZodType } from 'zod'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const schemaForType =
  <T>() =>
  <S extends ZodType<T, any, any>>(arg: S): S => {
    return arg
  }

