export interface UserResponse {
  id: string
  email: string
  name: string
  avatar?: string
}

export interface AuthResponse {
  user: UserResponse
  message: string
  token: string
  isNewUser: boolean
}

export interface GoogleAuthResponse {
  success: boolean
  authUrl: string
  message: string
}

export interface GoogleSignInRequest {
  credential: string
}
