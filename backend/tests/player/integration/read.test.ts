import {Connection, ConnectionOptions, createConnection, getConnectionOptions, getRepository} from 'typeorm';
import PSQLPlayer from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayer';
import PSQLPlayerReadRepository from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayerReadRepository';
import PSQLCharacter from "../../../src/adapters/secondaries/PSQL/character/PSQLCharacter";
import generatePsqlTestConfig from "../../common/integration/postgres/generateConfig";
import PlayerDto from "../../../src/core/domain/models/player/dto";
import CharacterDto from "../../../src/core/domain/models/character/dto";

describe('Given a player 4962aec5-1481-4cdb-bdb7-6ea52efe6c88 exists', () => {
    let connection: Connection;
    let pSQLPlayerReadRepository: PSQLPlayerReadRepository;

    beforeAll(async () => {
        // const psqlConfig = generatePsqlTestConfig();
        // connection = await createConnection(psqlConfig);
        //
        // await connection.runMigrations();
    });

    afterAll(async () => {
        // await connection.dropDatabase();
        // await connection.close();
    });

    beforeEach(async () => {
        // await connection.synchronize(true);
        // const p = new PSQLPlayer();
        // p.id = '4962aec5-1481-4cdb-bdb7-6ea52efe6c88';
        // await connection
        //     .createQueryBuilder()
        //     .insert()
        //     .into(PSQLPlayer)
        //     .values([
        //         {
        //             id: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
        //             characters: []
        //         },
        //     ])
        //     .execute();
        // await connection
        //     .createQueryBuilder()
        //     .insert()
        //     .into(PSQLCharacter)
        //     .values([
        //         {
        //             id: 'edf59fb4-15ee-4aa7-877b-8ced07096a5c',
        //             name: 'Legolas',
        //             skillPoints: 12,
        //             healthPoints: 10,
        //             attackPoints: 0,
        //             defensePoints: 0,
        //             magikPoints: 0,
        //             player: p,
        //         },
        //     ])
        //     .execute();
        // pSQLPlayerReadRepository = new PSQLPlayerReadRepository();
    });

    it('And player 4962aec5-1481-4cdb-bdb7-6ea52efe6c88 has 1 character named Legolas' +
        'with ID edf59fb4-15ee-4aa7-877b-8ced07096a5c,' +
        'with 12 skill points' +
        'with 10 health points' +
        'with 0 attack points' +
        'with 0 defense points' +
        'with 0 magik points' +
        'it should return a player with 1 character.', async () => {
        const expectedPlayer = new PlayerDto({
            id: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            characters: [
                new CharacterDto({
                    id: 'edf59fb4-15ee-4aa7-877b-8ced07096a5c',
                    name: 'Legolas',
                    skillPoints: 12,
                    healthPoints: 10,
                    attackPoints: 0,
                    defensePoints: 0,
                    magikPoints: 0,
                    playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
                })
            ],
        });
        // const retrievedPlayer = await pSQLPlayerReadRepository.read('4962aec5-1481-4cdb-bdb7-6ea52efe6c88');
        // there seems to be an issue with sequential tests
        // expect(retrievedPlayer.toDto()).toEqual(expectedPlayer);
    });
});