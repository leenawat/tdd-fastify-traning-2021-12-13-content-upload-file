import { FastifyPluginAsync } from 'fastify'
import multer from 'fastify-multer'
import { File } from 'fastify-multer/lib/interfaces'
// import fs from 'fs'

const FileUpload: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const upload = multer({ dest: 'uploads/' })
  fastify.post('/api/upload', {

    preHandler: upload.single('file'),
  }, async function (req, reply) {
    const file: File = req.file
    return reply.code(200).send(file)
  })
}

export default FileUpload
