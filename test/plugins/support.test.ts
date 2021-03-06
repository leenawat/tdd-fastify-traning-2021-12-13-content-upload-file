import Fastify from 'fastify'
import Support from '../../src/plugins/support'
it('support works standalone', async () => {
  const fastify = Fastify()
  fastify.register(Support)
  await fastify.ready()
  expect(fastify.someSupport()).toBe('hugs')
  await fastify.close()
})
