import type { Ref } from 'vue'

interface CounterApp {
  count: Ref<number>
  accretion: () => void
  reduction: () => void
}

export default (): CounterApp => {
  const count = ref(0)

  function accretion () {
    count.value++
  }

  function reduction () {
    count.value--
  }

  return {
    count,
    accretion,
    reduction
  }
}
