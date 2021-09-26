require('ts-node').register();

module.exports = {
    ...require('./src/configuration/database/config').default,
    migrations: ['src/configuration/database/migrations/*.ts'],
    cli: {
        migrationsDir: 'src/configuration/database/migrations',
    },
};
