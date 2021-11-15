import ICreateACharacter from '../../../src/core/useCases/character/ICreateACharacter';
import PlayerBuilder from '../../player/playerBuilder';
import { LegolasCharacterBuilder } from '../legolasCharacterBuilder';
import Player from '../../../src/core/domain/models/player/player';
import CharacterLimitReachedException
    from '../../../src/core/domain/models/character/exceptions/characterLimitReachedException';
import CharacterBuilder from "../characterBuilder";
import CharacterNameAlreadyTakenException
    from '../../../src/core/domain/models/character/exceptions/characterNameAlreadyTakenException';
import InMemoryCharacter from '../../../src/adapters/secondaries/inMemory/character/inMemoryCharacter';
import ICreateACharacterCommandType
    from '../../../src/core/useCases/character/types/ICreateACharacterCommand';
import CharacterDoesNotHaveEnoughSkillPointsException
    from '../../../src/core/domain/models/character/exceptions/characterDoesNotHaveEnoughSkillPointsException';
import CharacterNameLengthException
    from '../../../src/core/domain/models/character/exceptions/characterNameLengthException';
import {CharacterWriteRepositoryInterface} from '../../../src/core/useCases/character/interfaces/characterWriteRepositoryInterface';
import InMemoryCharacterWriteRepository
    from '../../../src/adapters/secondaries/inMemory/character/inMemoryCharacterWriteRepository';
import {CharacterReadRepositoryInterface} from '../../../src/core/useCases/character/interfaces/characterReadRepositoryInterface';
import InMemoryCharacterReadRepository
    from '../../../src/adapters/secondaries/inMemory/character/inMemoryCharacterReadRepository';
import {PlayerReadRepositoryInterface} from '../../../src/core/useCases/player/interfaces/playerReadRepositoryInterface';
import InMemoryPlayerReadRepository
    from '../../../src/adapters/secondaries/inMemory/player/inMemoryPlayerReadRepository';
import InMemoryPlayer from '../../../src/adapters/secondaries/inMemory/player/inMemoryPlayer';
import { PlayerWriteRepositoryInterface } from '../../../src/core/useCases/player/interfaces/playerWriteRepositoryInterface';
import InMemoryPlayerWriteRepository
    from '../../../src/adapters/secondaries/inMemory/player/InMemoryPlayerWriteRepository';
import CharacterSnapshot from '../../../src/core/domain/models/character/characterSnapshot';
import PlayerSnapshot from '../../../src/core/domain/models/player/playerSnapshot';


describe('As a Player, I can create a character that starts at' +
    'level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP.', () => {
    var player: Player;
    var playerSnapShot: PlayerSnapshot;
    var playerId: string;
    var inMemoryPlayersList: InMemoryPlayer[] = [];
    var playerReadRepository: PlayerReadRepositoryInterface;
    var playerWriteRepository: PlayerWriteRepositoryInterface;
    var expectedCharacter: CharacterSnapshot;
    var inMemoryCharactersList: InMemoryCharacter[];
    var characterReadRepository: CharacterReadRepositoryInterface;
    var characterWriteRepository: CharacterWriteRepositoryInterface;
    var iCreateACharacterCommand: ICreateACharacterCommandType;

    beforeEach(() => {
        inMemoryCharactersList = [];
        inMemoryPlayersList = [];
        player = new PlayerBuilder()
            .withId('1')
            .build();
        playerSnapShot = player.snapshot();
        playerId = playerSnapShot.id;
        playerReadRepository = new InMemoryPlayerReadRepository(inMemoryPlayersList);
        playerWriteRepository = new InMemoryPlayerWriteRepository(inMemoryPlayersList);
        playerWriteRepository.create(playerSnapShot);
        characterReadRepository = new InMemoryCharacterReadRepository(inMemoryCharactersList);
        characterWriteRepository = new InMemoryCharacterWriteRepository(inMemoryCharactersList);
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            playerId,
        };
    });

    it('When I create a character, it has 10 HP and 12 SP remaining.', async () => {
        const createdCharacter: CharacterSnapshot =
            await new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
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
            playerId: playerSnapShot.id,
        };
        expect(createdCharacter).toEqual(expectedCharacter);
        const retrievedCharacter = await characterReadRepository.read(createdCharacter.id);
        expect(retrievedCharacter.snapshot()).toEqual(expectedCharacter);
    });

    it('When I create a character with 11 HP and 1 AP, 1 DP and 1 MP I have 8 SP left.', async () => {
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 11,
            attackPoints: 1,
            defensePoints: 1,
            magikPoints: 1,
            playerId,
        };
        const createdCharacter: CharacterSnapshot =
            await new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(iCreateACharacterCommand);
        expectedCharacter = {
            id: createdCharacter.id,
            name: 'Legolas',
            skillPoints: 8,
            healthPoints: 11,
            attackPoints: 1,
            defensePoints: 1,
            magikPoints: 1,
            rank: 1,
            level: 1,
            playerId: playerSnapShot.id,
        };
        expect(createdCharacter).toEqual(expectedCharacter);
        const retrievedCharacter = await characterReadRepository.read(createdCharacter.id);
        expect(retrievedCharacter.snapshot()).toEqual(expectedCharacter);
    });

    it('When I create a character with 11 HP and 8 AP, I have 1 SP left.', async () => {
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 11,
            attackPoints: 8,
            defensePoints: 0,
            magikPoints: 0,
            playerId,
        };
        const createdCharacter: CharacterSnapshot =
            await new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(iCreateACharacterCommand);
        expectedCharacter = {
            id: createdCharacter.id,
            name: 'Legolas',
            skillPoints: 1,
            healthPoints: 11,
            attackPoints: 8,
            defensePoints: 0,
            magikPoints: 0,
            rank: 1,
            level: 1,
            playerId: playerSnapShot.id,
        };
        expect(createdCharacter).toEqual(expectedCharacter);
        const retrievedCharacter = await characterReadRepository.read(createdCharacter.id);
        expect(retrievedCharacter.snapshot()).toEqual(expectedCharacter);
    });

    it('When I create a character with more than 12 SP distributed, I receive an error.', async () => {
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 50,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            playerId,
        };
        await expect(
            new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(iCreateACharacterCommand)
        ).rejects.toThrow(CharacterDoesNotHaveEnoughSkillPointsException);
    });

    it('When I try to create an eleventh character, I receive an error.', async () => {
        player = new PlayerBuilder()
            .withId('1')
            .withCharacters([
                new CharacterBuilder().withName('Frodo').withPlayerId('1').build(),
                new CharacterBuilder().withName('Samwise').withPlayerId('1').build(),
                new CharacterBuilder().withName('Pippin').withPlayerId('1').build(),
                new CharacterBuilder().withName('Merry').withPlayerId('1').build(),
                new CharacterBuilder().withName('Aragorn').withPlayerId('1').build(),
                new CharacterBuilder().withName('Legolas').withPlayerId('1').build(),
                new CharacterBuilder().withName('Gimli').withPlayerId('1').build(),
                new CharacterBuilder().withName('Aragorn').withPlayerId('1').build(),
                new CharacterBuilder().withName('Boromir').withPlayerId('1').build(),
                new CharacterBuilder().withName('Gandalf').withPlayerId('1').build(),
            ])
            .build();
        await playerWriteRepository.create(player.snapshot());
        await expect(
            new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(iCreateACharacterCommand)
        ).rejects.toThrow(CharacterLimitReachedException);
    });

    it('When I try to use the same name twice, I receive an error.', async () => {
        player = new PlayerBuilder()
            .withId('1')
            .withCharacters([
                new LegolasCharacterBuilder().withPlayerId('1').build(),
            ])
            .build();
        playerSnapShot = player.snapshot();
        await playerWriteRepository.create(playerSnapShot);
        await expect(
            new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(iCreateACharacterCommand)
        ).rejects.toThrow(CharacterNameAlreadyTakenException);
    });

    it('When I try to create a character with a name longer than 25 characters, I receive an error.', async () => {
        iCreateACharacterCommand = {
            name: 'Aragorn son of Arathorn, heir of Isildur',
            healthPoints: 11,
            attackPoints: 1,
            defensePoints: 1,
            magikPoints: 1,
            playerId,
        };
        await expect(
            new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(iCreateACharacterCommand)
        ).rejects.toThrow(CharacterNameLengthException);
    });
});
