require('ts-node').register();

module.exports = {
    ...require('./src/configuration/secondaries/database/config').default,
    migrations: ['src/configuration/secondaries/database/migrations/*.ts'],
    cli: {
        migrationsDir: 'src/configuration/secondaries/database/migrations',
    },
};
