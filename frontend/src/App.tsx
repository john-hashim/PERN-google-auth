import './App.css'
import Login from '@/feature/auth/Login'
import UiCustomizer from '@/feature/ui-customizer/UiCustomizer'
import { Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { useUserStore } from '@/store/userStore'

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  if (!googleClientId) {
    console.error('Google Client ID is not set in environment variables')
  }
  return (
    <GoogleOAuthProvider clientId={googleClientId || ''}>
      <AppRoutes />
    </GoogleOAuthProvider>
  )
}

function AppRoutes() {
  const token = useUserStore(state => state.token)

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/ui-customizer" replace /> : <Login />}
      />
      <Route
        path="/ui-customizer"
        element={
          <ProtectedRoute>
            <UiCustomizer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/ui-customizer" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
