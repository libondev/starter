<script lang="ts" setup>
import { useToastError } from '@/composables/use-toast'
import { toArray } from '@/utils/transform/data'

const props = withDefaults(
  defineProps<{
    accept?: string
    maxsize?: number
    multiple?: boolean
    circular?: boolean
    deletable?: boolean
    replaceable?: boolean
  }>(),
  {
    accept: 'image/jpg,image/png,image/jpeg',
    // 500kb
    maxsize: 500,
    deletable: true,
    replaceable: true,
  },
)

const emits = defineEmits(['selected', 'deleted'])

const modelValue = defineModel<string | string[]>()

const chooseFiles = ref<{ file?: File, base64: string }[]>([])

const inputRef = shallowRef<HTMLInputElement>()

const replaceIndex = shallowRef()

function onUploadButtonClick(idx?: number) {
  inputRef.value?.click()

  replaceIndex.value = idx
}

function removeImageByIndex(index: number) {
  chooseFiles.value.splice(index, 1)
  emits('deleted', index)
}

function onFileSelectChange(ev: Event) {
  const maxSize = ~~props.maxsize * 1024
  const acceptTypes = props.accept?.split(',')

  const files = [...(ev.target as HTMLInputElement).files!].filter((file) => {
    if (maxSize && file.size > maxSize) {
      useToastError(`【${file.name}】文件大小超过 ${props.maxsize}kb，请重新选择`)
      return false
    }

    // 判断文件类型是否符合
    if (acceptTypes && file.type && !acceptTypes.includes(file.type)) {
      useToastError(`【${file.name}】文件类型不符合，请重新选择`)
      return false
    }

    return true
  })

  if (!files.length)
    return

  // 如果有指定替换某张图片则替换, 替换时只能选择单张, 所以直接取 0 位
  if (replaceIndex.value !== undefined) {
    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      chooseFiles.value.splice(replaceIndex.value, 1, { file: files[0], base64 })

      replaceIndex.value = undefined

      emits('selected', [{ file: files[0], base64 }])
    }

    return
  }

  // 将选择的图片转换成本地预览地址
  files.forEach((file, idx) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      chooseFiles.value.push({ file, base64: e.target?.result as string })

      // 如果是最后一张图片则触发 selected 事件
      if (idx >= files.length - 1)
        emits('selected', chooseFiles.value)
    }
  })
}

watch(() => modelValue.value, (value) => {
  chooseFiles.value = toArray(value).map(base64 => ({ file: undefined, base64 }))
}, { immediate: true })

defineExpose({
  chooseFiles,
})
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      v-show="multiple || !chooseFiles.length"
      class="relative border border-input bg-transparent shadow-sm p-8 hover:transition-colors hover:bg-secondary hover:text-primary active:bg-input"
      :class="[circular ? 'rounded-full' : 'rounded-md']"
      @click="onUploadButtonClick()"
    >
      <i class="i-solar-cloud-upload-linear block text-3xl opacity-60" />
    </button>

    <ul v-if="chooseFiles.length" class="">
      <li
        v-for="({ base64 }, idx) of chooseFiles"
        :key="idx"
        :class="[circular ? 'rounded-full' : 'rounded-md']"
        class="relative border border-input w-24 h-24 shadow-sm overflow-hidden group"
      >
        <Image :src="base64" alt="" />
        <div class="absolute inset-0 bg-white/95 flex items-center gap-2 justify-center opacity-0 transition-opacity group-hover:opacity-100 empty:hidden">
          <i v-if="replaceable" class="i-solar-refresh-line-duotone hover:text-primary text-2xl cursor-pointer" @click="onUploadButtonClick(idx)" />
          <i v-if="deletable" class="i-solar-trash-bin-2-linear hover:text-destructive text-2xl cursor-pointer" @click="removeImageByIndex(idx)" />
        </div>
      </li>
    </ul>

    <input
      ref="inputRef"
      type="file"
      accept=""
      :multiple="!replaceIndex || multiple"
      hidden
      v-bind="$attrs"
      @change="onFileSelectChange"
    >
  </div>
</template>
