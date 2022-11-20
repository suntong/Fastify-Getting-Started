'use strict';

const fastify = require('fastify')({logger: true})
const fs = require('fs');
const util = require('util');
const path = require('path');
const { pipeline } = require('stream');
const pump = util.promisify(pipeline);
const form = path.join(__dirname, '/', 'index.html');

//fastify.register(require('..'));

fastify.get('/', function (req, reply) {
  reply.type('text/html').send(fs.createReadStream(form));
});
fastify.post('/upload/files', async function (req, reply) {
  const parts = req.files();
  fastify.log.info(parts)
  const expandCommand =
    os.platform() === 'win32'
      ? `powershell -command "& {&'Expand-Archive' ${parts} -DestinationPath ../}}"`
      : `unzip ${parts} -d ../`;

  const { stdout, stderr } = await exec(expandCommand);
  return stderr ? Promise.reject(stderr) : stdout;
});

fastify.listen({ port: 3399, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
});
