# fastify-seaweedfs

SeaweedFS for Fastify

## Install

```
$ npm install @trubavuong/fastify-seaweedfs
```

## Usage

```
const fastify = require('fastify');
const plugin = require('@trubavuong/fastify-seaweedfs');

const app = fastify();
app.register(plugin, {
  endpoint: 'http://localhost:9333', // required, SeaweedFS endpoint
  name: 'swfs',                      // optional, custom property name, default 'fs'
  type: 'BLOCK_STORAGE',             // optional, storage type, default 'BLOCK_STORAGE', currently we have only one type
});

// later you can use app.swfs to interact with SeaweedFS server using corresponding storage APIs

app.get('/files/:fid', async (req, res) => {
  const stream = await app.swfs.get(req.params.fid);
  res.send(stream);
});
```

To interact with SeaweedFS, we use [@trubavuong/seaweedfs](https://www.npmjs.com/package/@trubavuong/seaweedfs) package.
Please read its documentation in order to work with `app.swfs`.
