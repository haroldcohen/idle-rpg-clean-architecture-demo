import { v4 } from 'uuid';
import { Connection, createConnection, getRepository } from 'typeorm';
import config from '../../../src/configuration/secondaries/database/config';
import Player from '../../../src/core/domain/models/player/player';
import PlayerBuilder from '../../player/playerBuilder';
import { LegolasCharacterBuilder } from '../legolasCharacterBuilder';
import PSQLPlayer from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayer';
import { CharacterWriteRepositoryInterface } from '../../../src/core/useCases/character/interfaces/characterWriteRepositoryInterface';
import PSQLCharacterWriteRepository
    from '../../../src/adapters/secondaries/PSQL/character/PSQLCharacterWriteRepository';
import { CharacterReadRepositoryInterface } from '../../../src/core/useCases/character/interfaces/characterReadRepositoryInterface';
import PSQLCharacterReadRepository from '../../../src/adapters/secondaries/PSQL/character/PSQLCharacterReadRepository';
import { PlayerReadRepositoryInterface } from '../../../src/core/useCases/player/interfaces/playerReadRepositoryInterface';
import PSQLPlayerReadRepository from '../../../src/adapters/secondaries/PSQL/player/PSQLPlayerReadRepository';
import Character from "../../../src/core/domain/models/character/character";
import CharacterSnapshot from "../../../src/core/domain/models/character/snapshot";
import PlayerSnapshot from "../../../src/core/domain/models/player/snapshot";

describe('I can create a character', () => {
    let connection: Connection;
    var player: Player;
    var playerSnapshot: PlayerSnapshot;
    var playerId: string;
    var expectedCharacter: CharacterSnapshot;
    var characterReadRepository: CharacterReadRepositoryInterface;
    var characterWriteRepository: CharacterWriteRepositoryInterface;
    var playerReadRepository: PlayerReadRepositoryInterface;

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
    });

    it('I can create a character', async () => {
        const characterToCreate = new Character({
            name: 'Legolas',
            skillPoints: 12,
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            playerId,
        });
        const characterToCreateSnapshot = characterToCreate.snapshot();
        expectedCharacter = {
            id: characterToCreateSnapshot.id,
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
        await characterWriteRepository.create(characterToCreateSnapshot);
        const retrievedCharacter = await characterReadRepository.read(characterToCreateSnapshot.id);
        expect(retrievedCharacter.snapshot()).toEqual(expectedCharacter);
    });
});