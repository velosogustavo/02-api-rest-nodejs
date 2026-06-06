import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.get('/', async (request, reply) => {
  return reply.send({
    message: 'Transactions API',
    version: '1.0.0',
    docs: 'https://github.com/velosogustavo/02-api-rest-nodejs#-rotas-da-api',
  })
})
