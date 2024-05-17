import Koa from 'koa'
import cors from 'koa2-cors'
import logger from 'koa-logger'
import parser from 'koa-bodyparser'

import router from '../routes'

const app = new Koa()

app.use(logger())

app.use(parser({
  enableTypes: ['json', 'form', 'text'],
}))

app.use(cors({
  credentials: true,
  exposeHeaders: ['*'],
}))

app.use(router.routes())
app.use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on: http://localhost:3000')
})

export default app
