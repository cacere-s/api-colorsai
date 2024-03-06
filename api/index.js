import Fastify from 'fastify'
import { ColorAI } from '../utils/cohere-ia.js'

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  const responseAI = await ColorAI()
  reply.send(responseAI)
})

// Run the server!
try {
  await fastify.listen({ port: process.env.PORT ?? 3000 })
  console.log(`server listening on port ${fastify.server.address().port}`)
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
