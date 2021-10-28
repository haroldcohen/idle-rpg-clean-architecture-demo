import { v4 } from 'uuid';
import {Connection, createConnection, getRepository} from 'typeorm';
import config from '../../../src/configuration/database/config';
import Player from '../../../src/core/domain/models/player/player';
import Character from '../../../src/core/domain/models/character/character';
import ICreateACharacterCommand
    from '../../../src/core/useCases/character/types/ICreateACharacterCommand';
import PlayerBuilder from '../../player/playerBuilder';
import { LegolasCharacterBuilder } from '../legolasCharacterBuilder';
import PSQLCharacterRepository from '../../../src/adapters/secondaries/PSQL/character/PSQLCharacterRepository';
import ICreateACharacter from '../../../src/core/useCases/character/ICreateACharacter';
import { verifyCharacter } from '../verifyCharacter';
import PSQLPlayer from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayer';
import PSQLPlayerRepository from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayerRepository';

describe('As a Player, I can create a character that starts at' +
    'level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP.', () => {
    let connection: Connection;
    var player: Player;
    var expectedCharacter: Character;
    var characterRepository: PSQLCharacterRepository;
    var playerRepository: PSQLPlayerRepository;
    var iCreateACharacterCommand: ICreateACharacterCommand;

    beforeAll(async () => {
        connection = await createConnection(config);
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
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
        playerRepository = new PSQLPlayerRepository();
        expectedCharacter = new LegolasCharacterBuilder().build();
        characterRepository = new PSQLCharacterRepository();
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
    });

    it('When I create a character, it has 10 HP and 12 SP remaining.', async () => {
        const createdCharacter = await new ICreateACharacter(characterRepository, playerRepository).execute(player.id, iCreateACharacterCommand);
        expectedCharacter = new LegolasCharacterBuilder()
            .withHealthPoints(10)
            .withSkillPoints(12)
            .build();
        expect(createdCharacter.rank).toEqual(1);
        expect(createdCharacter.level).toEqual(1);
        verifyCharacter(createdCharacter, expectedCharacter);
        verifyCharacter(createdCharacter, await characterRepository.read(createdCharacter.id));
    });
});