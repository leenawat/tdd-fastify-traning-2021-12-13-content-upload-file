import { join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload'
import { FastifyPluginAsync } from 'fastify'

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  // Place here your custom code!
  fastify.register(require('fastify-multer').contentParser)

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  })

  fastify.log.fatal('1 `fatal`')
  fastify.log.error('2 `error`')
  fastify.log.warn('3 `warn`')
  fastify.log.info('4 `info`')
  fastify.log.debug('5 `debug`')
  fastify.log.trace('6 `trace`')
}

export default app
export { app }
