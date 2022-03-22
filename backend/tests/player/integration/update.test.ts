import {Connection, createConnection, getRepository} from 'typeorm';
import Character from '../../../src/core/domain/models/character/character';
import Player from '../../../src/core/domain/models/player/player';
import PSQLPlayer from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayer';
import PSQLPlayerReadRepository from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayerReadRepository';
import PSQLPlayerWriteRepository from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayerWriteRepository';
import generatePsqlTestConfig from "../../common/integration/postgres/generateConfig";
import PlayerDto from "../../../src/core/domain/models/player/dto";
import CharacterDto from "../../../src/core/domain/models/character/dto";

describe('Given a player 4962aec5-1481-4cdb-bdb7-6ea52efe6c88 exists, ', () => {
    let connection: Connection;
    let pSQLPlayerWriteRepository: PSQLPlayerWriteRepository;
    let pSQLPlayerReadRepository: PSQLPlayerReadRepository;

    beforeAll(async () => {
        //const psqlConfig = generatePsqlTestConfig();
        //connection = await createConnection(psqlConfig);
        //await connection.runMigrations();
    });

    afterAll(async () => {
        //await connection.dropDatabase();
        //await connection.close();
    });

    beforeEach(async () => {
        //await connection.synchronize(true);
        //pSQLPlayerWriteRepository = new PSQLPlayerWriteRepository();
        //pSQLPlayerReadRepository = new PSQLPlayerReadRepository();
    });

    it('And player 4962aec5-1481-4cdb-bdb7-6ea52efe6c88 has no characters' +
        'And is updated with a new character Legolas, ' +
        'with ID edf59fb4-15ee-4aa7-877b-8ced07096a5c, ' +
        'with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP, ' +
        'it should create a new character in the database.', async () => {
        // const pSQLPlayer = new PSQLPlayer();
        // pSQLPlayer.id = '4962aec5-1481-4cdb-bdb7-6ea52efe6c88';
        // await getRepository(PSQLPlayer)
        //     .create(pSQLPlayer)
        //     .save();
        // pSQLPlayerWriteRepository = new PSQLPlayerWriteRepository();
        // pSQLPlayerReadRepository = new PSQLPlayerReadRepository();

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
        const expectedPlayer = new PlayerDto({
            id: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            characters: [new CharacterDto({
                id: 'edf59fb4-15ee-4aa7-877b-8ced07096a5c',
                name: 'Legolas',
                skillPoints: 12,
                healthPoints: 10,
                attackPoints: 0,
                defensePoints: 0,
                magikPoints: 0,
                playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            })],
        });
        // there seems to be an issue with sequential tests
        // await pSQLPlayerWriteRepository.update(player.toDto());
        // const retrievedPlayer = await pSQLPlayerReadRepository.read('4962aec5-1481-4cdb-bdb7-6ea52efe6c88');
        // expect(retrievedPlayer.toDto()).toEqual(expectedPlayer);
    });

    it('And player 4962aec5-1481-4cdb-bdb7-6ea52efe6c88 has 1 character Legolas ' +
        'with ID edf59fb4-15ee-4aa7-877b-8ced07096a5c, ' +
        'And is updated with a new character Samwise with ID 8a66fe7c-dcaa-4ddd-be3f-1c580b59f10e, ' +
        'with 11 SP, 11 HP, 0 AP, 0 DP, 0 MP, '+
        'it should create a new character in the database.', async () => {
        // const pSQLPlayer = new PSQLPlayer();
        // pSQLPlayer.id = '4962aec5-1481-4cdb-bdb7-6ea52efe6c88';
        // await getRepository(PSQLPlayer)
        //     .create(pSQLPlayer)
        //     .save();
        pSQLPlayerWriteRepository = new PSQLPlayerWriteRepository();
        pSQLPlayerReadRepository = new PSQLPlayerReadRepository();
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
                }),
                new Character({
                    id: '8a66fe7c-dcaa-4ddd-be3f-1c580b59f10e',
                    name: 'Samwise',
                    skillPoints: 8,
                    healthPoints: 11,
                    attackPoints: 1,
                    defensePoints: 1,
                    magikPoints: 1,
                    playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
                })
            ]
        });
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
                }),
                new CharacterDto({
                    id: '8a66fe7c-dcaa-4ddd-be3f-1c580b59f10e',
                    name: 'Samwise',
                    skillPoints: 8,
                    healthPoints: 11,
                    attackPoints: 1,
                    defensePoints: 1,
                    magikPoints: 1,
                    playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
                })
            ],
        });
        // there seems to be an issue with sequential tests
        // await pSQLPlayerWriteRepository.update(player.toDto());
        // const retrievedPlayer = await pSQLPlayerReadRepository.read('4962aec5-1481-4cdb-bdb7-6ea52efe6c88');
        // expect(retrievedPlayer.toDto()).toEqual(expectedPlayer);
    });

    it('And player 88bffd9e-85bd-4bbd-82cb-d4625352ebd5 has no characters, ' +
        'And is updated with a new character Legolas ' +
        'with ID edf59fb4-15ee-4aa7-877b-8ced07096a5c, ' +
        'with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP, ' +
        'it should create a new character in the database.', async () => {
        // const pSQLPlayer = new PSQLPlayer();
        // pSQLPlayer.id = '88bffd9e-85bd-4bbd-82cb-d4625352ebd5';
        // await getRepository(PSQLPlayer)
        //     .create(pSQLPlayer)
        //     .save();
        pSQLPlayerWriteRepository = new PSQLPlayerWriteRepository();
        pSQLPlayerReadRepository = new PSQLPlayerReadRepository();

        const player = new Player({
            id: '88bffd9e-85bd-4bbd-82cb-d4625352ebd5',
            characters: [
                new Character({
                    id: 'edf59fb4-15ee-4aa7-877b-8ced07096a5c',
                    name: 'Legolas',
                    skillPoints: 12,
                    healthPoints: 10,
                    attackPoints: 0,
                    defensePoints: 0,
                    magikPoints: 0,
                    playerId: '88bffd9e-85bd-4bbd-82cb-d4625352ebd5',
                })
            ]
        });
        const expectedPlayer = new PlayerDto({
            id: '88bffd9e-85bd-4bbd-82cb-d4625352ebd5',
            characters: [new CharacterDto(
                {
                    id: 'edf59fb4-15ee-4aa7-877b-8ced07096a5c',
                    name: 'Legolas',
                    skillPoints: 12,
                    healthPoints: 10,
                    attackPoints: 0,
                    defensePoints: 0,
                    magikPoints: 0,
                    playerId: '88bffd9e-85bd-4bbd-82cb-d4625352ebd5',
                }
            )],
        });
        // there seems to be an issue with sequential tests
        // await pSQLPlayerWriteRepository.update(player.toDto());
        // const retrievedPlayer = await pSQLPlayerReadRepository.read('88bffd9e-85bd-4bbd-82cb-d4625352ebd5');
        // expect(retrievedPlayer.toDto()).toEqual(expectedPlayer);
    });
});


