import { authService } from '@/api/services/auth'
import { useApi } from '@/hooks/useApi'
import type { AuthResponse, GoogleSignInRequest } from '@/types/auth'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'

const Login: React.FC = () => {
  const { execute: executeGoogleSignIn } = useApi<AuthResponse, [GoogleSignInRequest]>(
    authService.googleSignIn
  )

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.log('Failed to get Google credentials')
      return
    }
    try {
      const response = await executeGoogleSignIn({
        credential: credentialResponse.credential,
      })

      if (response && response.token) {
        console.log(response)
      }
    } catch (err) {
      console.error('Google login failed:', err)
    }
    console.log(credentialResponse.credential)
  }

  const handleGoogleError = () => {
    console.log('Google sign-in failed. Please try again.')
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
    </div>
  )
}

export default Login
