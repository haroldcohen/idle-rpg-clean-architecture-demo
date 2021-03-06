// @ts-ignore
import supertest, {Response} from 'supertest';
import app from '../../../src/configuration/primaries/app';
import {Connection, createConnection, getRepository} from 'typeorm';
import config from '../../../src/configuration/secondaries/database/config';
import PresentedCharacterInterface
    from '../../../src/adapters/primaries/presenters/characters/presentedCharacterInterface';
import PlayerBuilder from '../../player/playerBuilder';
import { v4 } from 'uuid';
import PSQLPlayer from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayer';
import Player from '../../../src/core/domain/models/player/player';
import {LegolasCharacterBuilder} from '../legolasCharacterBuilder';
import CharacterBuilder from '../characterBuilder';
import Character from '../../../src/core/domain/models/character/character';
import PSQLCharacterWriteRepository
    from '../../../src/adapters/secondaries/PSQL/character/PSQLCharacterWriteRepository';
import PlayerSnapshot from '../../../src/core/domain/models/player/snapshot';

describe('PUT /characters', () => {
    let connection: Connection;
    let player: Player;
    let playerSnapshot: PlayerSnapshot;
    let characterWriteRepository: PSQLCharacterWriteRepository;
    let expectedPresentedCharacter: PresentedCharacterInterface;
    let requestContent: object;

    beforeAll(async () => {
        expectedPresentedCharacter = {
            id: '',
            name: 'Legolas',
            skillPoints: 12,
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            level: 1,
            rank: 1,
        };
        connection = await createConnection(config);
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close()
    });

    beforeEach(async () => {
        await connection.synchronize(true);
        player = new PlayerBuilder()
            .withId(v4())
            .build();
        playerSnapshot = player.snapshot();
        const pSQLPlayer = new PSQLPlayer(playerSnapshot.id);
        await getRepository(PSQLPlayer)
            .create(pSQLPlayer)
            .save();
        requestContent = {
            playerId: playerSnapshot.id,
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
        expectedPresentedCharacter.id = playerSnapshot.id;
        characterWriteRepository = new PSQLCharacterWriteRepository();
    });

    it('responds a presented character in JSON', async () => {
        await supertest(app)
            .put('/api/characters')
            .send(requestContent)
            .expect(200)
            .then(async (res: Response) => {
                expectedPresentedCharacter.id = res.body.id;
                expect(res.body).toEqual(expectedPresentedCharacter);
            });
    });

    it('responds with an error message "Character does not have enough skill points to spend"', async () => {
        requestContent = {
            playerId: playerSnapshot.id,
            name: 'Legolas',
            healthPoints: 30,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
        await supertest(app)
            .put('/api/characters')
            .send(requestContent)
            .expect(400)
            .then(async (res: Response) => {
                expect(res.body.errorMessage).toEqual('Character does not have enough skill points to spend');
            });
    });

    it('responds with an error message "Cannot use twice the same character name"', async () => {
        const legolasCharacter = new LegolasCharacterBuilder()
            .withPlayerId(playerSnapshot.id)
            .build();
        await characterWriteRepository.create(legolasCharacter.snapshot());
        requestContent = {
            playerId: playerSnapshot.id,
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
        await supertest(app)
            .put('/api/characters')
            .send(requestContent)
            .expect(400)
            .then(async (res: Response) => {
                expect(res.body.errorMessage).toEqual('Cannot use twice the same character name');
            });
    });

    it('responds with an error message "You\'ve reached the limit of 10 characters per player"', async () => {
        const charactersToCreate = (): Character[] => {
            return [
                new CharacterBuilder().withName('Frodo').withPlayerId(playerSnapshot.id).build(),
                new CharacterBuilder().withName('Samwise').withPlayerId(playerSnapshot.id).build(),
                new CharacterBuilder().withName('Pippin').withPlayerId(playerSnapshot.id).build(),
                new CharacterBuilder().withName('Merry').withPlayerId(playerSnapshot.id).build(),
                new CharacterBuilder().withName('Aragorn').withPlayerId(playerSnapshot.id).build(),
                new CharacterBuilder().withName('Legolas').withPlayerId(playerSnapshot.id).build(),
                new CharacterBuilder().withName('Gimli').withPlayerId(playerSnapshot.id).build(),
                new CharacterBuilder().withName('Aragorn').withPlayerId(playerSnapshot.id).build(),
                new CharacterBuilder().withName('Boromir').withPlayerId(playerSnapshot.id).build(),
                new CharacterBuilder().withName('Gandalf').withPlayerId(playerSnapshot.id).build(),
            ];
        }
        const createCharacters = async (charactersToCreate: Character[]) => {
            await Promise.all(charactersToCreate.map(async (c) => await characterWriteRepository.create(c.snapshot())));
        }
        await createCharacters(charactersToCreate());
        requestContent = {
            playerId: playerSnapshot.id,
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
        await supertest(app)
            .put('/api/characters')
            .send(requestContent)
            .expect(400)
            .then(async (res: Response) => {
                expect(res.body.errorMessage).toEqual('You\'ve reached the limit of 10 characters per player');
            });
    });

    it('responds with an error message ' +
        '"Invalid request: name must be a string"', async () => {
        requestContent = {
            playerId: playerSnapshot.id,
            name: 1,
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
        await supertest(app)
            .put('/api/characters')
            .send(requestContent)
            .expect(400)
            .then(async (res: Response) => {
                expect(res.body.errorMessage).toEqual(
                    'Invalid request: ' +
                    'name must be a string'
                );
            });
    });

    it('responds with an error message ' +
        '"Invalid request: name must be a string, healthPoints must be an integer number"', async () => {
        requestContent = {
            playerId: playerSnapshot.id,
            name: 1,
            healthPoints: '10',
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
        await supertest(app)
            .put('/api/characters')
            .send(requestContent)
            .expect(400)
            .then(async (res: Response) => {
                expect(res.body.errorMessage).toEqual(
                    'Invalid request: ' +
                    'name must be a string, ' +
                    'healthPoints must be an integer number'
                );
            });
    });
});