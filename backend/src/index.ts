import { createConnection } from 'typeorm';
import connectionOptions from './configuration/database/config';

(async () => {
    await createConnection(connectionOptions);

    const { default: app } = await import('./configuration/primaries/app');

    const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    app.listen(port, () => {
        console.info(`Server listening on port ${port}`);
    });
})().catch((error) => {
    console.error(error);

    process.exitCode = 1;
});
