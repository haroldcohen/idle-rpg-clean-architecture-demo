import Character from '../../../src/core/domain/models/character/character';
import ICreateACharacter from '../../../src/core/useCases/character/ICreateACharacter';
import PlayerBuilder from '../../player/playerBuilder';
import { LegolasCharacterBuilder } from '../legolasCharacterBuilder';
import { verifyCharacter } from '../verifyCharacter';
import Player from '../../../src/core/domain/models/player/player';
import CharacterLimitReachedException
    from '../../../src/core/domain/models/character/exceptions/characterLimitReachedException';
import CharacterBuilder from "../characterBuilder";
import CharacterNameAlreadyTakenException
    from '../../../src/core/domain/models/character/exceptions/characterNameAlreadyTakenException';
import InMemoryCharacter from '../../../src/adapters/secondaries/inMemory/character/inMemoryCharacter';
import ICreateACharacterCommand
    from '../../../src/core/useCases/character/types/ICreateACharacterCommand';
import CharacterDoesNotHaveEnoughSkillPointsException
    from '../../../src/core/domain/models/character/exceptions/characterDoesNotHaveEnoughSkillPointsException';
import CharacterNameLengthException
    from '../../../src/core/domain/models/character/exceptions/characterNameLengthException';
import { CharacterWriteRepositoryInterface } from '../../../src/core/useCases/character/interfaces/characterWriteRepositoryInterface';
import InMemoryCharacterWriteRepository
    from '../../../src/adapters/secondaries/inMemory/character/inMemoryCharacterWriteRepository';
import { CharacterReadRepositoryInterface } from '../../../src/core/useCases/character/interfaces/characterReadRepositoryInterface';
import InMemoryCharacterReadRepository
    from '../../../src/adapters/secondaries/inMemory/character/inMemoryCharacterReadRepository';
import { PlayerReadRepositoryInterface } from '../../../src/core/useCases/player/interfaces/playerReadRepositoryInterface';
import InMemoryPlayerReadRepository
    from '../../../src/adapters/secondaries/inMemory/player/inMemoryPlayerReadRepository';
import InMemoryPlayer from '../../../src/adapters/secondaries/inMemory/player/inMemoryPlayer';
import { PlayerWriteRepositoryInterface } from '../../../src/core/useCases/player/interfaces/playerWriteRepositoryInterface';
import InMemoryPlayerWriteRepository
    from "../../../src/adapters/secondaries/inMemory/player/InMemoryPlayerWriteRepository";


describe('As a Player, I can create a character that starts at' +
    'level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP.', () => {
    var player: Player;
    var inMemoryPlayersList: InMemoryPlayer[] = [];
    var playerReadRepository: PlayerReadRepositoryInterface;
    var playerWriteRepository: PlayerWriteRepositoryInterface;
    var expectedCharacter: Character;
    var inMemoryCharactersList: InMemoryCharacter[];
    var characterReadRepository: CharacterReadRepositoryInterface;
    var characterWriteRepository: CharacterWriteRepositoryInterface;
    var iCreateACharacterCommand: ICreateACharacterCommand;

    beforeEach(() => {
        inMemoryCharactersList = [];
        inMemoryPlayersList = [];
        player = new PlayerBuilder()
            .withId('1')
            .build();
        playerReadRepository = new InMemoryPlayerReadRepository(inMemoryPlayersList);
        playerWriteRepository = new InMemoryPlayerWriteRepository(inMemoryPlayersList);
        playerWriteRepository.create(player);
        expectedCharacter = new LegolasCharacterBuilder()
            .withPlayerId('1')
            .build();
        characterReadRepository = new InMemoryCharacterReadRepository(inMemoryCharactersList);
        characterWriteRepository = new InMemoryCharacterWriteRepository(inMemoryCharactersList);
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
    });

    it('When I create a character, it has 10 HP and 12 SP remaining.', async () => {
        const createdCharacter: Character =
            await new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(player.id, iCreateACharacterCommand);
        expectedCharacter = new LegolasCharacterBuilder()
            .withHealthPoints(10)
            .withSkillPoints(12)
            .build();
        expect(createdCharacter.rank).toEqual(1);
        expect(createdCharacter.level).toEqual(1);
        verifyCharacter(createdCharacter, expectedCharacter);
        verifyCharacter(createdCharacter, await characterReadRepository.read(createdCharacter.id));
        const allRetrievedCharacters = await characterReadRepository.all();
        expect(allRetrievedCharacters.map((c) => c.id)).toContain(createdCharacter.id);
    });

    it('When I create a character with 11 HP and 1 AP, 1 DP and 1 MP I have 8 SP left.', async () => {
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 11,
            attackPoints: 1,
            defensePoints: 1,
            magikPoints: 1,
        };
        const createdCharacter: Character =
            await new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(player.id, iCreateACharacterCommand);

        expectedCharacter = new LegolasCharacterBuilder()
            .withHealthPoints(11)
            .withSkillPoints(8)
            .withAttackPoints(1)
            .withDefensePoints(1)
            .withMagikPoints(1)
            .build();
        verifyCharacter(createdCharacter, expectedCharacter);
        verifyCharacter(createdCharacter, await characterReadRepository.read(createdCharacter.id));
    });

    it('When I create a character with 11 HP and 8 AP, I have 1 SP left.', async () => {
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 11,
            attackPoints: 8,
            defensePoints: 0,
            magikPoints: 0,
        };
        const createdCharacter: Character =
            await new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(player.id, iCreateACharacterCommand);
        expectedCharacter = new LegolasCharacterBuilder()
            .withHealthPoints(11)
            .withAttackPoints(8)
            .withSkillPoints(1)
            .build();
        verifyCharacter(createdCharacter, expectedCharacter);
        verifyCharacter(createdCharacter, await characterReadRepository.read(createdCharacter.id));
    });

    it('When I create a character with more than 12 SP distributed, I receive an error.', async () => {
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 50,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
        await expect(
            new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(player.id, iCreateACharacterCommand)
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
        await playerWriteRepository.create(player);
        await expect(
            new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(player.id, iCreateACharacterCommand)
        ).rejects.toThrow(CharacterLimitReachedException);
    });

    it('When I try to use the same name twice, I receive an error.', async () => {
        player = new PlayerBuilder()
            .withId('1')
            .withCharacters([
                new LegolasCharacterBuilder().withPlayerId('1').build(),
            ])
            .build();
        await playerWriteRepository.create(player);
        await expect(
            new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(player.id, iCreateACharacterCommand)
        ).rejects.toThrow(CharacterNameAlreadyTakenException);
    });

    it('When I try to create a character with a name longer than 25 characters, I receive an error.', async () => {
        iCreateACharacterCommand = {
            name: 'Aragorn son of Arathorn, heir of Isildur',
            healthPoints: 11,
            attackPoints: 1,
            defensePoints: 1,
            magikPoints: 1,
        };
        player = new PlayerBuilder()
            .withId('1')
            .build();
        await expect(
            new ICreateACharacter(
                characterWriteRepository,
                playerReadRepository
            ).execute(player.id, iCreateACharacterCommand)
        ).rejects.toThrow(CharacterNameLengthException);
    });
});
