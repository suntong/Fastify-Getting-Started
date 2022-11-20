import fastify from 'fastify'
import multer from 'fastify-multer'

const storage = multer.memoryStorage()  
const upload = multer({ storage: storage })

const server = fastify()
server.register(multer.contentParser)

server.listen(8080, (err, address) => {
  if(err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

server.post('/api/profilePicture', {preHandler: upload.single('file')},  
	    this.uploadProfilePicture.bind(this))

async uploadProfilePicture(req, res): Promise<string> {  
  const binaryData = req.file.buffer
  const result = await uploadPicture(binaryData) // Watch below for details
  return result.url
}

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
})

uploadPicture(content: Buffer): Promise<object> {  
  return new Promise((resolve, reject) => {  
    cloudinary.uploader.upload_stream(  
      {  
        folder: 'profile_pictures',  
        eager : [{ width : 400, height : 400, crop : 'crop', gravity : 'face'}]  
      }, (error, result) => {  
        if (error) {  
          throw Exception('Upload failed')
        } else {  
          resolve(result)  
        }  
      }  
    ).end(content)  
  })  
}
