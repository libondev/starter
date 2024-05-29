import { defineStore } from 'pinia'
import { getCurrentUserInfo } from '@/api/user.js'

const initState = {
  name: '',
  enName: '',
  email: '',
  employeeNo: '',
}

export const useUserStore = defineStore(
  'User',
  () => {
    const currentUser = shallowRef({ ...initState })

    async function getCurrentUser() {
      const { data } = await getCurrentUserInfo()
      currentUser.value = data
    }

    return {
      currentUser,
      getCurrentUser,
    }
  },
  {
    persist: true,
  },
)
