import { build } from '../helper'
import formMethod from 'form-auto-content'
import fs from 'fs'

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
})

