// api.types.ts
export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}
