import type { Ref } from 'vue'

interface CounterApp {
  count: Ref<number>
  accretion: () => void
}

export default (): CounterApp => {
  let count = $ref(0)

  function accretion (): void {
    count++
  }

  return {
    count: $$(count),
    accretion
  }
}
