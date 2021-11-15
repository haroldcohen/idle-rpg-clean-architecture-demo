import { v4 } from 'uuid';
import { Connection, createConnection, getRepository } from 'typeorm';
import config from '../../../src/configuration/database/config';
import Player from '../../../src/core/domain/models/player/player';
import ICreateACharacterCommandType
    from '../../../src/core/useCases/character/types/ICreateACharacterCommand';
import PlayerBuilder from '../../player/playerBuilder';
import { LegolasCharacterBuilder } from '../legolasCharacterBuilder';
import ICreateACharacter from '../../../src/core/useCases/character/ICreateACharacter';
import PSQLPlayer from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayer';
import { CharacterWriteRepositoryInterface } from '../../../src/core/useCases/character/interfaces/characterWriteRepositoryInterface';
import PSQLCharacterWriteRepository
    from '../../../src/adapters/secondaries/PSQL/character/PSQLCharacterWriteRepository';
import { CharacterReadRepositoryInterface } from '../../../src/core/useCases/character/interfaces/characterReadRepositoryInterface';
import PSQLCharacterReadRepository from '../../../src/adapters/secondaries/PSQL/character/PSQLCharacterReadRepository';
import { PlayerReadRepositoryInterface } from '../../../src/core/useCases/player/interfaces/playerReadRepositoryInterface';
import PSQLPlayerReadRepository from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayerReadRepository';
import CharacterSnapshot from '../../../src/core/domain/models/character/characterSnapshot';
import PlayerSnapshot from '../../../src/core/domain/models/player/playerSnapshot';

describe('As a Player, I can create a character that starts at' +
    'level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP.', () => {
    let connection: Connection;
    var player: Player;
    var playerSnapshot: PlayerSnapshot;
    var playerId: string;
    var expectedCharacter: CharacterSnapshot;
    var characterReadRepository: CharacterReadRepositoryInterface;
    var characterWriteRepository: CharacterWriteRepositoryInterface;
    var playerReadRepository: PlayerReadRepositoryInterface;
    var iCreateACharacterCommand: ICreateACharacterCommandType;

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
        playerSnapshot = player.snapshot();
        const pSQLPlayer = new PSQLPlayer(playerSnapshot.id);
        await getRepository(PSQLPlayer)
            .create(pSQLPlayer)
            .save();
        playerId = playerSnapshot.id;
        playerReadRepository = new PSQLPlayerReadRepository();
        expectedCharacter = new LegolasCharacterBuilder().build().snapshot();
        characterReadRepository = new PSQLCharacterReadRepository();
        characterWriteRepository = new PSQLCharacterWriteRepository();
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            playerId
        };
    });

    it('When I create a character, it has 10 HP and 12 SP remaining.', async () => {
        const createdCharacter =
            await new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository,
            ).execute(iCreateACharacterCommand);
        expectedCharacter = {
            id: createdCharacter.id,
            name: 'Legolas',
            skillPoints: 12,
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            rank: 1,
            level: 1,
            playerId: playerSnapshot.id,
        };
        expect(createdCharacter).toEqual(expectedCharacter);
        const retrievedCharacter = await characterReadRepository.read(createdCharacter.id);
        expect(retrievedCharacter.snapshot()).toEqual(expectedCharacter);
    });
});