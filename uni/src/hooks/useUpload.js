const VITE_UPLOAD_BASEURL = import.meta.env.VITE_UPLOAD_BASEURL

/**
 * useUpload 是一个定制化的请求钩子，用于处理上传图片。
 * @param formData 额外传递给后台的数据
 * @returns 返回一个对象{loading, error, data, run}，包含请求的加载状态、错误信息、响应数据和手动触发请求的函数。
 */
export default function useUpload(formData = {}, { shallow } = {}) {
  const error = shallowRef(false)
  const loading = shallowRef(false)
  const data = (shallow ? shallowRef : ref)()

  const run = () => {
    // #ifdef MP-WEIXIN
    // 微信小程序从基础库 2.21.0 开始， wx.chooseImage 停止维护，请使用 uni.chooseMedia 代替。
    // 微信小程序在2023年10月17日之后，使用本API需要配置隐私协议
    uni.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        loading.value = true
        const tempFilePath = res.tempFiles[0].tempFilePath
        uploadFile({ tempFilePath, formData, data, error, loading })
      },
      fail: (err) => {
        error.value = err
      },
    })
    // #endif

    // #ifndef MP-WEIXIN
    uni.chooseImage({
      count: 1,
      success: (res) => {
        loading.value = true
        const tempFilePath = res.tempFilePaths[0]
        uploadFile({ tempFilePath, formData, data, error, loading })
      },
      fail: (err) => {
        error.value = err
      },
    })
    // #endif
  }

  return { loading, error, data, run }
}

function uploadFile({ tempFilePath, formData, data, error, loading }) {
  uni.uploadFile({
    url: VITE_UPLOAD_BASEURL,
    filePath: tempFilePath,
    name: 'file',
    formData,
    success: (res) => {
      data.value = res.data
    },
    fail: (err) => {
      error.value = err
    },
    complete: () => {
      loading.value = false
    },
  })
}
