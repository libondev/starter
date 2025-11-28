export default class LRUCache<K, V> {
  private readonly items: Map<K, V>
  private readonly capacity: number

  constructor(capacity: number) {
    this.items = new Map<K, V>()
    this.capacity = capacity
  }

  get(key: K): V | undefined {
    let item: V | undefined

    // 如果 key 存在，将其移动到最后（最近使用）
    if (this.items.has(key)) {
      item = this.items.get(key)
      this.items.delete(key)
      this.items.set(key, item as V)
    }

    return item
  }

  set(key: K, value: V): void {
    // 设置数据时先删除再添加，确保顺序在最后
    if (this.items.has(key)) {
      this.items.delete(key)
    } else if (this.items.size >= this.capacity) {
      // 如果当前缓存已满，删除最不常用的项
      const firstKey = this.items.keys().next().value

      if (firstKey) {
        this.items.delete(firstKey)
      }
    }

    this.items.set(key, value)
  }
}
