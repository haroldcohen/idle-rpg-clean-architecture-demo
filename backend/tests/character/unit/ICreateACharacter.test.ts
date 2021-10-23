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
import { CharacterRepositoryInterface } from '../../../src/core/useCases/character/interfaces/characterRepositoryInterface';
import InMemoryCharacterRepository from '../../../src/adapters/secondaries/inMemory/character/inMemoryCharacterRepository';
import InMemoryCharacter from '../../../src/adapters/secondaries/inMemory/character/inMemoryCharacter';
import ICreateACharacterExecutionParametersType
    from '../../../src/core/useCases/character/types/ICreateACharacterExecutionParametersType';
import CharacterDoesNotHaveEnoughSkillPointsException
    from '../../../src/core/domain/models/character/exceptions/characterDoesNotHaveEnoughSkillPointsException';
import CharacterNameLengthException
    from '../../../src/core/domain/models/character/exceptions/characterNameLengthException';


describe('As a Player, I can create a character that starts at' +
    'level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP.', () => {
    var player: Player;
    var expectedCharacter: Character;
    var inMemoryCharactersList: InMemoryCharacter[];
    var characterRepository: CharacterRepositoryInterface;
    var iCreateACharacterExecutionParameters: ICreateACharacterExecutionParametersType;

    beforeEach(() => {
        player = new PlayerBuilder()
            .withId('1')
            .withName('PlayerOne')
            .build();
        expectedCharacter = new LegolasCharacterBuilder().build();
        inMemoryCharactersList = [];
        characterRepository = new InMemoryCharacterRepository(inMemoryCharactersList);
        iCreateACharacterExecutionParameters = {
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
    });

    it('When I create a character, it has 10 HP and 12 SP remaining.', async () => {
        const createdCharacter: Character = await new ICreateACharacter(characterRepository).execute(player, iCreateACharacterExecutionParameters);
        expectedCharacter = new LegolasCharacterBuilder()
            .withHealthPoints(10)
            .withSkillPoints(12)
            .build();
        expect(createdCharacter.rank).toEqual(1);
        expect(createdCharacter.level).toEqual(1);
        verifyCharacter(createdCharacter, expectedCharacter);
        verifyCharacter(createdCharacter, await characterRepository.read(createdCharacter.id));
        const allRetrievedCharacters = await characterRepository.all();
        expect(allRetrievedCharacters.map((c) => c.id)).toContain(createdCharacter.id);
    });

    it('When I create a character with 11 HP and 1 AP, 1 DP and 1 MP I have 8 SP left.', async () => {
        iCreateACharacterExecutionParameters = {
            name: 'Legolas',
            healthPoints: 11,
            attackPoints: 1,
            defensePoints: 1,
            magikPoints: 1,
        };
        const createdCharacter: Character = await new ICreateACharacter(characterRepository).execute(player, iCreateACharacterExecutionParameters);
        expectedCharacter = new LegolasCharacterBuilder()
            .withHealthPoints(11)
            .withSkillPoints(8)
            .withAttackPoints(1)
            .withDefensePoints(1)
            .withMagikPoints(1)
            .build();
        verifyCharacter(createdCharacter, expectedCharacter);
        verifyCharacter(createdCharacter, await characterRepository.read(createdCharacter.id));
    });

    it('When I create a character with 11 HP and 8 AP, I have 1 SP left.', async () => {
        iCreateACharacterExecutionParameters = {
            name: 'Legolas',
            healthPoints: 11,
            attackPoints: 8,
            defensePoints: 0,
            magikPoints: 0,
        };
        const createdCharacter: Character = await new ICreateACharacter(characterRepository).execute(player, iCreateACharacterExecutionParameters);
        expectedCharacter = new LegolasCharacterBuilder()
            .withHealthPoints(11)
            .withAttackPoints(8)
            .withSkillPoints(1)
            .build();
        verifyCharacter(createdCharacter, expectedCharacter);
        verifyCharacter(createdCharacter, await characterRepository.read(createdCharacter.id));
    });

    it('When I create a character with more than 12 SP distributed, I receive an error.', async () => {
        iCreateACharacterExecutionParameters = {
            name: 'Legolas',
            healthPoints: 50,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
        await expect(
            new ICreateACharacter(characterRepository).execute(player, iCreateACharacterExecutionParameters)
        ).rejects.toThrow(CharacterDoesNotHaveEnoughSkillPointsException);
    });

    it('When I try to create an eleventh character, I receive an error.', async () => {
        player = new PlayerBuilder()
            .withName('PlayerOne')
            .withCharacters([
                new CharacterBuilder().withName('Frodo').build(),
                new CharacterBuilder().withName('Samwise').build(),
                new CharacterBuilder().withName('Pippin').build(),
                new CharacterBuilder().withName('Merry').build(),
                new CharacterBuilder().withName('Aragorn').build(),
                new CharacterBuilder().withName('Legolas').build(),
                new CharacterBuilder().withName('Gimli').build(),
                new CharacterBuilder().withName('Aragorn').build(),
                new CharacterBuilder().withName('Boromir').build(),
                new CharacterBuilder().withName('Gandalf').build(),
            ])
            .build();
        await expect(
            new ICreateACharacter(characterRepository).execute(player, iCreateACharacterExecutionParameters)
        ).rejects.toThrow(CharacterLimitReachedException);
    });

    it('When I try to use the same name twice, I receive an error.', async () => {
        player = new PlayerBuilder()
            .withName('PlayerOne')
            .withCharacters([
                new LegolasCharacterBuilder().build(),
            ])
            .build();
        await expect(
            new ICreateACharacter(characterRepository).execute(player, iCreateACharacterExecutionParameters)
        ).rejects.toThrow(CharacterNameAlreadyTakenException);
    });

    it('When I try to create a character with a name longer than 25 characters, I receive an error.', async () => {
        iCreateACharacterExecutionParameters = {
            name: 'Aragorn son of Arathorn, heir of Isildur',
            healthPoints: 11,
            attackPoints: 1,
            defensePoints: 1,
            magikPoints: 1,
        };
        player = new PlayerBuilder()
            .withName('PlayerOne')
            .build();
        await expect(
            new ICreateACharacter(characterRepository).execute(player, iCreateACharacterExecutionParameters)
        ).rejects.toThrow(CharacterNameLengthException);
    });
});
