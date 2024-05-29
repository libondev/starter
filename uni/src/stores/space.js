import { defineStore } from 'pinia'
import { getDefaultSpace } from '@/api/space.js'

export const useSpaceStore = defineStore(
  'Space',
  () => {
    const currentSpace = shallowRef({})
    // 获取当前应用下的空间列表
    const getCurrentSpaceApps = () => currentSpace.value.apmSpaceAppVoList ?? []

    async function getCurrentSpace() {
      const { data } = await getDefaultSpace()
      currentSpace.value = data
    }

    return {
      currentSpace,
      getCurrentSpace,
      getCurrentSpaceApps,
    }
  },
)
