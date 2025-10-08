import { useUserStore } from './userStore'

export const useRootStore = () => ({
  user: useUserStore(),
})
