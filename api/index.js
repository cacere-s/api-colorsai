import Fastify from 'fastify'
import { ColorAI } from './cohere-ia.js'
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})
await fastify.register(cors, {
  origin: '*'
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
