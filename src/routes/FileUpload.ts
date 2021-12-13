/* eslint-disable no-unused-vars */
import { FastifyPluginAsync } from 'fastify'
import multer from 'fastify-multer'
import { File } from 'fastify-multer/lib/interfaces'
// import { fileTypeFromBuffer } from 'file-type'
// import * as fs from 'fs'
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'

const FileUpload: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const uploadPath = 'uploads/'
  // const fileAmountLimit = 3

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      const _ext = path.extname(file.originalname)
      const filename = uuidv4() + _ext
      cb(null, filename)
    },
  })
  // const upload = multer({ dest: uploadPath })
  const upload = multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      // กำหนด type
      if (!(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg')) {
        return cb(new Error('Invalid mimetype!'), false)
      }
      cb(null, true)
    },
  })

  fastify.post('/api/upload', {

    preHandler: upload.single('file'),
  }, async function (req, reply) {
    const file: File = req.file
    return reply.code(200).send(file)
  })
}

export default FileUpload
