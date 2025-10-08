import { authService } from '@/api/services/auth'
import { useApi } from '@/hooks/useApi'
import { useRootStore } from '@/store/rootStore'
import type { AuthResponse, GoogleSignInRequest } from '@/types/auth'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'

const Login: React.FC = () => {
  const { execute: executeGoogleSignIn } = useApi<AuthResponse, [GoogleSignInRequest]>(
    authService.googleSignIn
  )

  const { execute: excuteTokenCheck } = useApi<{ data: string }, []>(authService.tokenCheck)

  const { user } = useRootStore()

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.log('Failed to get Google credentials')
      return
    }
    try {
      const response = await executeGoogleSignIn({
        credential: credentialResponse.credential,
      })
      user.setUser(response.user)
      user.setToken(response.token)
    } catch (err) {
      console.error('Google login failed:', err)
    }
  }

  const handleGoogleError = () => {
    console.log('Google sign-in failed. Please try again.')
  }

  const checkToken = () => {
    excuteTokenCheck()
  }

  const handleLogout = () => {
    user.logout()
  }

  return (
    <div>
      <div className="w-full flex items-center justify-center max-w-[384px]">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          theme="filled_black"
          size="medium"
          width={200}
          shape="rectangular"
          useOneTap
          auto_select={false}
        />
      </div>
      <button onClick={checkToken}>check token</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Login
