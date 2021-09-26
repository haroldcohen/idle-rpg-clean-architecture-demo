import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
};

export default config;
