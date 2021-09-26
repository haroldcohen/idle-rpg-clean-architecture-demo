module.exports = {
    ...require('./dist/configuration/database/config').default,
    migrations: ['dist/configuration/database/migrations/*.ts'],
};
