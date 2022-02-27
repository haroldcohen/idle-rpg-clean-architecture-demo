import {Connection, createConnection, getRepository} from 'typeorm';
import config from '../../../src/configuration/secondaries/database/config';
import Character from '../../../src/core/domain/models/character/character';
import Player from '../../../src/core/domain/models/player/player';
import PSQLPlayer from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayer';
import PSQLPlayerReadRepository from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayerReadRepository';
import PSQLPlayerWriteRepository from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayerWriteRepository';
import PSQLCharacter from "../../../src/adapters/secondaries/PSQL/character/PSQLCharacter";

describe('Given a player exists with ID 4962aec5-1481-4cdb-bdb7-6ea52efe6c88 with no characters', () => {
    let connection: Connection;
    let pSQLPlayerWriteRepository: PSQLPlayerWriteRepository;
    let pSQLPlayerReadRepository: PSQLPlayerReadRepository;

    beforeAll(async () => {
        connection = await createConnection(config);
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    beforeEach(async () => {
        await connection.synchronize();
        const pSQLPlayer = new PSQLPlayer();
        pSQLPlayer.id = '4962aec5-1481-4cdb-bdb7-6ea52efe6c88';
        await getRepository(PSQLPlayer)
            .create(pSQLPlayer)
            .save();
        pSQLPlayerWriteRepository = new PSQLPlayerWriteRepository();
        pSQLPlayerReadRepository = new PSQLPlayerReadRepository();
    });

    it('And is updated with a new character Legolas with ID edf59fb4-15ee-4aa7-877b-8ced07096a5c, ' +
        'it should create a new character in the database.', async function () {
        const player = new Player({
            id: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            characters: [
                new Character({
                    id: 'edf59fb4-15ee-4aa7-877b-8ced07096a5c',
                    name: 'Legolas',
                    skillPoints: 12,
                    healthPoints: 10,
                    attackPoints: 0,
                    defensePoints: 0,
                    magikPoints: 0,
                    playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
                })
            ]
        });
        const expectedPlayer = {
            id: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            characters: [{
                id: 'edf59fb4-15ee-4aa7-877b-8ced07096a5c',
                name: 'Legolas',
                skillPoints: 12,
                healthPoints: 10,
                attackPoints: 0,
                defensePoints: 0,
                magikPoints: 0,
                playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
                rank: 1,
                level: 1,
            }],
        };
        await pSQLPlayerWriteRepository.update(player.toDto());
        const retrievedPlayer = await pSQLPlayerReadRepository.read('4962aec5-1481-4cdb-bdb7-6ea52efe6c88');
        expect(retrievedPlayer.toDto()).toEqual(expectedPlayer);
    });
});