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
  name: 'swfs', // optional, custom property name, default 'fs'
  type: 'BLOCK_STORAGE', // optional, storage type, default 'BLOCK_STORAGE', currently we have only one type
  endpoint: 'http://localhost:9333', // required, SeaweedFS endpoint
});

// later you can use app.swfs to interact with SeaweedFS server using corresponding storage APIs
```

To interact with SeaweedFS, we use [@trubavuong/seaweedfs](https://www.npmjs.com/package/@trubavuong/seaweedfs) package.
