import { atPolyfill } from '@/utils/polyfill/array.js'
import { routeInterceptor } from '@/utils/interceptors/route.js'

export function bootstrap() {
  atPolyfill()
  routeInterceptor()
}
