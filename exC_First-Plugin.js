// ESM
import Fastify from 'fastify'
import firstRoute from './exC_our-first-route.js'
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})

fastify.register(firstRoute)

fastify.listen({ port: 3399 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})