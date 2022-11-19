// CommonJs
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('./exC_our-first-route'))

fastify.listen({ port: 3399 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})