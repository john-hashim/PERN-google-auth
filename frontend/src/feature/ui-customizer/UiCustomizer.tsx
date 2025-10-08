import { useUserStore } from '@/store/userStore'
import { authService } from '@/api/services/auth'
import { useApi } from '@/hooks/useApi'

const UiCustomizer = () => {
  const user = useUserStore(state => state.user)
  const logoutStore = useUserStore(state => state.logout)

  const { execute: executeLogout, loading } = useApi<{ message: string }, []>(authService.logout)

  const handleLogout = async () => {
    try {
      await executeLogout()
      logoutStore()
    } catch (error) {
      console.error('Logout failed:', error)
      // Clear state even if API fails
      logoutStore()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">UI Customizer</h1>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Welcome, {user?.name || 'User'}!</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Customize Your Interface</h3>
            <p className="text-gray-600">UI customization options will be available here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UiCustomizer
