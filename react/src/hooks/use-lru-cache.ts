import LRUCache from '@/utils/lru-cache'

export default function useLruCache<K, V>(capacity = 10) {
  return new LRUCache<K, V>(capacity)
}
