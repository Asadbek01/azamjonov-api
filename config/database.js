const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres'); // Change the default client to 'postgres'

  const connections = {    
    // Keep the MySQL configuration as is
    
    postgres: {
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'), // Set the hostname or IP address of your PostgreSQL server
        port: env.int('DATABASE_PORT', 5432), // Set the port your PostgreSQL server is running on (5432 is the default)
        database: env('DATABASE_NAME', 'blogs'), // Set your PostgreSQL database name
        user: env('DATABASE_USERNAME', 'postgres'), // Set your PostgreSQL username
        password: env('DATABASE_PASSWORD', 'Enjoy_l1fe'), // Set your PostgreSQL password
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
