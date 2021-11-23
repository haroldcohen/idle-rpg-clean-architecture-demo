module.exports = {
    ...require('./dist/configuration/secondaries/database/config').default,
    migrations: ['dist/configuration/secondaries/database/migrations/*.ts'],
};
