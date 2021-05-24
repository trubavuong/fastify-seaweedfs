const fastify = require('fastify');

const plugin = require('../lib/index');

describe('index.js', () => {
  describe('plugin', () => {
    const defaultEndpoint = process.env.SEAWEEDFS_ENDPOINT;
    const notfoundEndpoint = 'http://localhost:6666';

    test('should fail when storage type is invalid', async () => {
      const app = fastify();
      app.register(plugin, {
        type: 'unknown',
      });
      await expect(app.ready).rejects.toThrow('Invalid storage type unknown');
    });

    test('should fail when name already registered', async () => {
      const app = fastify();
      app.register(plugin, {
        name: 'register',
        endpoint: defaultEndpoint,
      });
      await expect(app.ready).rejects.toThrow('fastify.register already registered');
    });

    test('should fail when endpoint is not specify', async () => {
      const app = fastify();
      app.register(plugin, {});
      await expect(app.ready).rejects.toThrow('Cannot read property \'replace\' of undefined');
    });

    test('should fail when endpoint is not reached out', async () => {
      const app = fastify();
      app.register(plugin, {
        endpoint: notfoundEndpoint,
      });
      await expect(app.ready).rejects.toThrow('ECONNREFUSED');
    });

    test('should success with default name fs', async () => {
      const app = fastify();
      app.register(plugin, {
        endpoint: defaultEndpoint,
      });
      await app.ready();
      expect(app.fs).toHaveProperty('get');
    });

    test('should success with custom name', async () => {
      const app = fastify();
      app.register(plugin, {
        name: 'hello',
        endpoint: defaultEndpoint,
      });
      await app.ready();
      expect(app.fs).toBeUndefined();
      expect(app.hello).toHaveProperty('get');
    });
  });
});
