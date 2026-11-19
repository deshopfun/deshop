import { useMutation } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'

export function useRequestLoginCode() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = (await axios.post(Http.login, { email })) as ApiResponse<unknown>
      if (!response.result) {
        throw new Error(response.message || 'Cannot get the login code, please check your email')
      }
      return response
    },
  })
}

export function useLoginByCode() {
  return useMutation({
    mutationFn: async (payload: { email: string; code: string }) => {
      const response = (await axios.post(Http.login_by_code, payload)) as ApiResponse<{
        auth: string
        uuid: string
      }>
      if (!response.result || !response.data) {
        throw new Error('Login failed, please check your code')
      }
      return response.data
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = (await axios.post(Http.register, { email })) as ApiResponse<unknown>
      if (!response.result) {
        throw new Error(response.message || 'Registration failed')
      }
      return response
    },
  })
}

export function useVerifyInvitation() {
  return useMutation({
    mutationFn: async (code: string) => {
      const response = (await axios.get(Http.verify_invitation, {
        params: { code },
      })) as ApiResponse<unknown>
      if (!response.result) {
        throw new Error(response.message || 'Verification failed, please try again')
      }
      return response
    },
  })
}
