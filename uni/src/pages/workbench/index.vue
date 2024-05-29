<route type="home">
style:
  navigationBarTitleText: 工作台
  navigationBarBackgroundColor: #F8F8F8
  backgroundColor: #F8F8F8
  enablePullDownRefresh: false
  onReachBottomDistance: 50
  navigationBarShadow: false
  navigationStyle: custom
</route>

<script setup>
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()
</script>

<template>
  <view
    class="overflow-hidden pt-2 px-4"
  >
    {{ userStore.currentUser }}
    <view class="text-justify max-w-100 m-auto bg-red-500 mb-2">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic unde enim temporibus similique. Dignissimos optio ratione soluta unde, suscipit quae nam beatae doloremque ducimus qui sapiente quis delectus? Odit, reprehenderit.
    </view>
  </view>
</template>
