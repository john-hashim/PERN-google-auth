// src/api/services/auth.ts
import { type AxiosResponse } from 'axios'
import apiClient from '../index'
import { ENDPOINTS } from '../endpoints'
import type { AuthResponse, GoogleSignInRequest, UserResponse } from '@/types/auth'

export const authService = {
  /**
   * Get current user profile
   * @returns Promise with user data
   */
  getMe: (): Promise<AxiosResponse<UserResponse>> => {
    return apiClient.get(ENDPOINTS.AUTH.GET_ME)
  },

  /**
   * Sign in with Google using authorization code (API approach)
   * @param data - Google authorization code
   * @returns Promise with user data and token
   */
  googleSignIn: (data: GoogleSignInRequest): Promise<AxiosResponse<AuthResponse>> => {
    return apiClient.post(ENDPOINTS.AUTH.GOOGLE.SIGNIN, data)
  },
}
