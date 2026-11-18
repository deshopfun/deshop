export type ApiSuccess<T> = {
  result: true
  data: T
  message?: string
}

export type ApiFailure = {
  result: false
  data?: unknown
  message?: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccess<T> {
  return response?.result === true
}
