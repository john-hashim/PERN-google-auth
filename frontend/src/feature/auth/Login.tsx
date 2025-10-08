import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'

const Login: React.FC = () => {
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.log('Failed to get Google credentials')
      return
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
