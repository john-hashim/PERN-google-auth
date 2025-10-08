// src/api/services/auth.ts
import { type AxiosResponse } from 'axios'
import apiClient from '../index'
import { ENDPOINTS } from '../endpoints'
import type { AuthResponse, GoogleSignInRequest, User } from '@/types/auth'

export const authService = {
  /**
   * Get current user profile
   * @returns Promise with user data
   */
  getMe: (): Promise<AxiosResponse<User>> => {
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

  /**
   * Logout user and delete session
   * @returns Promise with success message
   */
  logout: (): Promise<AxiosResponse<{ message: string }>> => {
    return apiClient.post(ENDPOINTS.AUTH.LOGOUT)
  },
}
