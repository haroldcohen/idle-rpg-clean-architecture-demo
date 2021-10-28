// @ts-ignore
import supertest, { Response } from 'supertest';
import app from '../../../src/configuration/app';
import { Connection, createConnection, getRepository } from 'typeorm';
import config from '../../../src/configuration/database/config';
import ICreateACharacterCommand
    from '../../../src/core/useCases/character/types/ICreateACharacterCommand';
import PresentedCharacterInterface
    from '../../../src/adapters/primaries/presenters/characters/presentedCharacterInterface';
import PlayerBuilder from "../../player/playerBuilder";
import {v4} from "uuid";
import PSQLPlayer from "../../../src/adapters/secondaries/PSQL/player/PSQLPlayer";
import Player from "../../../src/core/domain/models/player/player";

describe('POST /characters', () => {
    let connection: Connection;
    let player: Player;
    let expectedPresentedCharacter: PresentedCharacterInterface;
    let requestContent: object;
    let iCreateACharacterExecutionParameters: ICreateACharacterCommand;

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
    });

    beforeAll(async () => {
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
        const pSQLPlayer = new PSQLPlayer(player.id);
        await getRepository(PSQLPlayer)
            .create(pSQLPlayer)
            .save();
        requestContent = {
            playerId: player.id,
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
        expectedPresentedCharacter.id = player.id;
    });

    it('responds a presented character in JSON', async () => {
        await supertest(app)
            .post('/api/characters')
            .send(requestContent)
            .expect(200)
            .then(async (res: Response) => {
                expectedPresentedCharacter.id = res.body.id;
                expect(res.body).toEqual(expectedPresentedCharacter);
            });
    });
});