// @ts-ignore
import supertest, {Response} from 'supertest';
import app from '../../../src/configuration/primaries/app';
import {Connection, createConnection, getRepository} from 'typeorm';
import PSQLPlayer from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayer';
import container from "../../../src/configuration/injection/inversify.config";
import TYPES from "../../../src/configuration/injection/types";
import {PlayerReadRepositoryInterface} from "../../../src/core/useCases/player/interfaces/playerReadRepositoryInterface";
import PSQLCharacter from "../../../src/adapters/secondaries/PSQL/character/PSQLCharacter";
import generatePsqlTestConfig from "../../common/integration/postgres/generateConfig";

describe('Given a player 6c5626a2-6a0d-42df-b498-a4aa5fc2d856 exists' +
    'And player 6c5626a2-6a0d-42df-b498-a4aa5fc2d856 has no characters' +
    'And a request to create a new character' +
    'With a name Legolas,' +
    'With 10 health points,' +
    'With 0 attack, defense and magik points,' +
    'is sent to PUT /characters', () => {
    let connection: Connection;
    let playerReadRepository: PlayerReadRepositoryInterface;

    beforeAll(async () => {
        // connection = await createConnection(generatePsqlTestConfig());
        // await connection.runMigrations();
    });

    afterAll(async () => {
        // await connection.dropDatabase();
        // await connection.close()
    });

    beforeEach(async () => {
        // await connection.synchronize(true);
        // playerReadRepository = container
        //     .get<PlayerReadRepositoryInterface>(TYPES.PlayerReadRepositoryInterface);
        // const pSQLPlayer = new PSQLPlayer();
        // pSQLPlayer.id = '6c5626a2-6a0d-42df-b498-a4aa5fc2d856';
        // await getRepository(PSQLPlayer)
        //     .create(pSQLPlayer)
        //     .save();
    });

    it('Should return a presented character with' +
        'With name Legolas,' +
        'With 12 skill points, ' +
        'With 10 health points, ' +
        'With 0 attack, defense and magik points, ' +
        'With rank 1, ' +
        'And with level 1.', async () => {
            const expectedPresentedCharacter = {
                id: '',
                name: 'Legolas',
                skillPoints: 12,
                healthPoints: 10,
                attackPoints: 0,
                defensePoints: 0,
                magikPoints: 0,
                rank: 1,
                level: 1
            };
            const expectedPlayer = {
                id: '6c5626a2-6a0d-42df-b498-a4aa5fc2d856',
                characters: [
                    {
                        id: '',
                        name: 'Legolas',
                        skillPoints: 12,
                        healthPoints: 10,
                        attackPoints: 0,
                        defensePoints: 0,
                        magikPoints: 0,
                        playerId: '6c5626a2-6a0d-42df-b498-a4aa5fc2d856',
                        rank: 1,
                        level: 1
                    }
                ]
            };
            // await supertest(app)
            //     .put('/api/characters')
            //     .send({
            //             name: 'Legolas',
            //             healthPoints: 10,
            //             attackPoints: 0,
            //             defensePoints: 0,
            //             magikPoints: 0,
            //             playerId: '6c5626a2-6a0d-42df-b498-a4aa5fc2d856',
            //     })
            //     .expect(200)
            //     .then(async (res: Response) => {
            //         expectedPresentedCharacter.id = res.body.id;
            //         expectedPlayer.characters[0].id = res.body.id;
            //         const retrievedPlayer = await playerReadRepository.read('6c5626a2-6a0d-42df-b498-a4aa5fc2d856');
            //         expect(res.body).toEqual(expectedPresentedCharacter);
            //         expect(retrievedPlayer.toDto()).toEqual(expectedPlayer);
            //     });
    });
});

describe('Given a player 6c5626a2-6a0d-42df-b498-a4aa5fc2d856 exists' +
    'And player 6c5626a2-6a0d-42df-b498-a4aa5fc2d856 has no characters' +
    'And a request to create a new character' +
    'With a name Legolas, ' +
    'With 30 health points, ' +
    'With 0 attack, defense and magik points, ' +
    'is sent to PUT /characters', () => {
    let connection: Connection;

    beforeAll(async () => {
        // connection = await createConnection(generatePsqlTestConfig());
        // await connection.runMigrations();
    });

    afterAll(async () => {
        // await connection.dropDatabase();
        // await connection.close()
    });

    beforeEach(async () => {
        // await connection.synchronize(true);
        // const pSQLPlayer = new PSQLPlayer();
        // pSQLPlayer.id = '6c5626a2-6a0d-42df-b498-a4aa5fc2d856';
        // await getRepository(PSQLPlayer)
        //     .create(pSQLPlayer)
        //     .save();
    });

    it('should respond with an error message "Character does not have enough skill points to spend"', async () => {
        // await supertest(app)
        //     .put('/api/characters')
        //     .send({
        //         playerId: '6c5626a2-6a0d-42df-b498-a4aa5fc2d856',
        //         name: 'Legolas',
        //         healthPoints: 30,
        //         attackPoints: 0,
        //         defensePoints: 0,
        //         magikPoints: 0,
        //     })
        //     .expect(400)
        //     .then(async (res: Response) => {
        //         expect(res.body.errorMessage).toEqual('Character does not have enough skill points to spend');
        //     });
    });
});

describe('Given a player 6c5626a2-6a0d-42df-b498-a4aa5fc2d856 exists' +
    'And player 6c5626a2-6a0d-42df-b498-a4aa5fc2d856 has 1 character named Boromir' +
    'And a request to create a new character' +
    'With a name Boromir,' +
    'With 10 health points,' +
    'With 0 attack, defense and magik points,' +
    'is sent to PUT /characters', () => {
    let connection: Connection;
    let playerReadRepository: PlayerReadRepositoryInterface;

    beforeAll(async () => {
        // connection = await createConnection(generatePsqlTestConfig());
        // await connection.runMigrations();
    });

    afterAll(async () => {
        // await connection.dropDatabase();
        // await connection.close()
    });

    beforeEach(async () => {
        // await connection.synchronize(true);
        // playerReadRepository = container
        //     .get<PlayerReadRepositoryInterface>(TYPES.PlayerReadRepositoryInterface);
        // const pSQLPlayer = new PSQLPlayer();
        // pSQLPlayer.id = '6c5626a2-6a0d-42df-b498-a4aa5fc2d856';
        // await getRepository(PSQLPlayer)
        //     .create(pSQLPlayer)
        //     .save();
        // const pSQLCharacter = new PSQLCharacter(
        //     '1467365b-9366-4b1f-8c2c-df2a1889248f',
        //     'Boromir',
        //     12,
        //     10,
        //     0,
        //     0,
        //     0,
        //     pSQLPlayer,
        // );
        // await getRepository(PSQLCharacter)
        //     .create(pSQLCharacter)
        //     .save();
    });

    it('should respond with an error message "Cannot use twice the same character name"', async () => {
        // await supertest(app)
        //     .put('/api/characters')
        //     .send({
        //         playerId: '6c5626a2-6a0d-42df-b498-a4aa5fc2d856',
        //         name: 'Boromir',
        //         healthPoints: 10,
        //         attackPoints: 0,
        //         defensePoints: 0,
        //         magikPoints: 0,
        //     })
        //     .expect(400)
        //     .then(async (res: Response) => {
        //         expect(res.body.errorMessage).toEqual('Cannot use twice the same character name');
        //     });
    });
});