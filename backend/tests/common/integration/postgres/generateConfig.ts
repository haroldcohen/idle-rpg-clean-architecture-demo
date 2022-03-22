import {ConnectionOptions} from 'typeorm';
import * as schemas from '../../../../src/configuration/secondaries/database/schemas';

export default function generatePsqlTestConfig(): ConnectionOptions {
    return {
        type: 'postgres',
        url: 'postgresql://user:password@postgres/idle_rpg',
        entities: Object.values(schemas),
        // synchronize: true
    }
}