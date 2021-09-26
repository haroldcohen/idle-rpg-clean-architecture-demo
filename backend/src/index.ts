import * as Sentry from '@sentry/node';
import { createConnection } from 'typeorm';
import connectionOptions from './configuration/database/config';
import version from './version';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT,
    release: version ? `idle-rpg-clean-architecture-demo-backend@${version}` : undefined,
});

(async () => {
    await createConnection(connectionOptions);

    const { default: app } = await import('./configuration/app');

    const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    app.listen(port, () => {
        console.info(`Server listening on port ${port}`);
    });
})().catch((error) => {
    console.error(error);

    process.exitCode = 1;
});
