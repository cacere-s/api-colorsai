import Fastify from 'fastify'
import { ColorAI } from './cohere-ia.js'

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  const responseAI = await ColorAI()
  return reply.status(200).send(responseAI)
})

export default async function handler (req, reply) {
  await fastify.ready()
  fastify.server.emit('request', req, reply)
}
