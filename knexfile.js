module.exports = {

  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: 'Concia',
      port: 5432,
      database: 'app_bancaria'
    },
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: ''
    }
  },

  production: {
    client: 'pg',
    connection: '',
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    }
  }
};