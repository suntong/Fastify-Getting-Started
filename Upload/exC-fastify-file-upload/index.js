'use strict'

const fastify = require('fastify')({logger: true})
const fileUpload = require('fastify-file-upload')

fastify.register(fileUpload, {
  limits: { fileSize: 50 * 1024 * 1024 },
})

fastify.post('/upload', function (req, reply) {
  // some code to handle file
  const files = req.raw.files
  console.log(files)
  let fileArr = []
  for(let key in files){
    fileArr.push({
      name: files[key].name,
      mimetype: files[key].mimetype
    })
  }
  reply.send(fileArr)
})

fastify.listen(3399, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
