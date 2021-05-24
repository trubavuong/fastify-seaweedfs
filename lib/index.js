const fp = require('fastify-plugin');
const { BlockStorage } = require('@trubavuong/seaweedfs');

const Storage = {
  BLOCK: 'BLOCK_STORAGE',
};

const plugin = fp(async (fastify, {
  name = 'fs',
  type = Storage.BLOCK,
  endpoint,
}) => {
  let storage = null;

  switch (type) {
    case Storage.BLOCK:
      storage = new BlockStorage(endpoint);
      break;

    default:
      break;
  }

  if (!storage) {
    throw new Error(`Invalid storage type ${type}`);
  }

  if (fastify[name]) {
    throw new Error(`fastify.${name} already registered`);
  }

  fastify.decorate(name, storage);

  await storage.ping();
});

module.exports = plugin;
