import { build } from '../helper'
import formMethod from 'form-auto-content'
import * as fs from 'fs'
import * as path from 'path'

describe('upload file tests', () => {
  const app = build()
  it('returns 200 ok after successful upload', async () => {
    // const response = await uploadFile();
    // console.log(formMethod)
    const form:any = formMethod({
      // foo: 'bar',
      file: fs.createReadStream('./test/resources/test-png.png'),
    })
    const res = await app.inject({
      method: 'post',
      url: '/api/upload',
      ...form,
    //   payload: { foo: 'bar' },
    //   // form: form,
    })
    expect(res.statusCode).toBe(200)
  })

  it.each`
    file              | fileExtension
    ${'test-png.png'} | ${'png'}
  `(
    'saves filename with extension $fileExtension in attachment object and stored object when $file is uploaded',
    async ({ fileExtension, file }) => {
      const form:any = formMethod({
        // foo: 'bar',
        file: fs.createReadStream('./test/resources/test-png.png'),
      })
      const res:any = await app.inject({
        method: 'post',
        url: '/api/upload',
        ...form,
      })
      const filePath = path.join('.', 'uploads', res.json().filename)
      expect(fs.existsSync(filePath)).toBe(true)
    },
  )
})

