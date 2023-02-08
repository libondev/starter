import type { Ref } from 'vue'

interface CounterApp {
  count: Ref<number>
  accretion: () => void
}

export default (): CounterApp => {
  const count = ref(0)

  function accretion (): void {
    count.value++
  }

  return {
    count,
    accretion
  }
}
