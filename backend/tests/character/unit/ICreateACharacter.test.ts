import ICreateACharacter from '../../../src/core/useCases/character/ICreateACharacter';
import CharacterLimitReachedException
    from '../../../src/core/domain/models/character/exceptions/characterLimitReachedException';
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
import {PlayerWriteRepositoryInterface} from '../../../src/core/useCases/player/interfaces/playerWriteRepositoryInterface';
import InMemoryPlayerWriteRepository
    from '../../../src/adapters/secondaries/inMemory/player/InMemoryPlayerWriteRepository';
import {Uuid4GeneratorInterface} from '../../../src/core/useCases/common/interfaces/uuid4GeneratorInterface';
import Uuid4Generator from '../../../src/adapters/primaries/common/uuid4Generator';
import StubUuid4Generator from '../../common/stubs/stubUuid4Generator';
import InMemoryDataBase from '../../../src/adapters/secondaries/inMemory/common/inMemoryDataBase';
import defaultInMemoryDataBase from '../../common/datasets/inMemory/default';
import fellowshipOfTheRing from '../../common/datasets/inMemory/fellowshipOfTheRing';


describe('As a Player, I can create a character that starts at' +
    'level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP.', () => {
    var uuid4Generator: Uuid4GeneratorInterface = new Uuid4Generator();
    var inMemoryDataBase: InMemoryDataBase;
    var playerReadRepository: PlayerReadRepositoryInterface;
    var playerWriteRepository: PlayerWriteRepositoryInterface;
    var characterReadRepository: CharacterReadRepositoryInterface;
    var characterWriteRepository: CharacterWriteRepositoryInterface;
    var iCreateACharacterCommand: ICreateACharacterCommandType;

    beforeEach(() => {
        inMemoryDataBase = defaultInMemoryDataBase();
        playerReadRepository = new InMemoryPlayerReadRepository(inMemoryDataBase);
        playerWriteRepository = new InMemoryPlayerWriteRepository(inMemoryDataBase);
        characterReadRepository = new InMemoryCharacterReadRepository(inMemoryDataBase);
        characterWriteRepository = new InMemoryCharacterWriteRepository(inMemoryDataBase);
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
        };
    });

    it('When I create a character, it has 10 HP and 12 SP remaining.', async () => {
        const createdCharacter =
            await new ICreateACharacter(
                playerReadRepository,
                playerWriteRepository,
                new StubUuid4Generator(),
            ).execute(iCreateACharacterCommand);
        const expectedPlayer = {
            id: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            characters: [{
                id: '6c5626a2-6a0d-42df-b498-a4aa5fc2d856',
                name: 'Legolas',
                skillPoints: 12,
                healthPoints: 10,
                attackPoints: 0,
                defensePoints: 0,
                magikPoints: 0,
                rank: 1,
                level: 1,
                playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            }]
        };
        const expectedCharacter = {
            id: '6c5626a2-6a0d-42df-b498-a4aa5fc2d856',
            name: 'Legolas',
            skillPoints: 12,
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            rank: 1,
            level: 1,
            playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
        };
        const retrievedPlayer = await playerReadRepository.read('4962aec5-1481-4cdb-bdb7-6ea52efe6c88');
        expect(createdCharacter).toEqual(expectedCharacter);
        expect(retrievedPlayer.toDto()).toEqual(expectedPlayer);
    });

    it('When I create a character with 11 HP and 1 AP, 1 DP and 1 MP I have 8 SP left.', async () => {
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 11,
            attackPoints: 1,
            defensePoints: 1,
            magikPoints: 1,
            playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
        };
        const createdCharacter =
            await new ICreateACharacter(
                playerReadRepository,
                playerWriteRepository,
                new StubUuid4Generator(),
            ).execute(iCreateACharacterCommand);
        const expectedPlayer = {
            id: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            characters: [{
                id: '6c5626a2-6a0d-42df-b498-a4aa5fc2d856',
                name: 'Legolas',
                skillPoints: 8,
                healthPoints: 11,
                attackPoints: 1,
                defensePoints: 1,
                magikPoints: 1,
                rank: 1,
                level: 1,
                playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            }]
        };
        const expectedCharacter = {
            id: '6c5626a2-6a0d-42df-b498-a4aa5fc2d856',
            name: 'Legolas',
            skillPoints: 8,
            healthPoints: 11,
            attackPoints: 1,
            defensePoints: 1,
            magikPoints: 1,
            rank: 1,
            level: 1,
            playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
        };
        const retrievedPlayer = await playerReadRepository.read('4962aec5-1481-4cdb-bdb7-6ea52efe6c88');
        expect(createdCharacter).toEqual(expectedCharacter);
        expect(retrievedPlayer.toDto()).toEqual(expectedPlayer);
    });

    it('When I create a character with 11 HP and 8 AP, I have 1 SP left.', async () => {
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 11,
            attackPoints: 8,
            defensePoints: 0,
            magikPoints: 0,
            playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
        };
        const createdCharacter =
            await new ICreateACharacter(
                playerReadRepository,
                playerWriteRepository,
                new StubUuid4Generator(),
            ).execute(iCreateACharacterCommand);
        const expectedPlayer = {
            id: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            characters: [{
                id: createdCharacter.id,
                name: 'Legolas',
                skillPoints: 1,
                healthPoints: 11,
                attackPoints: 8,
                defensePoints: 0,
                magikPoints: 0,
                rank: 1,
                level: 1,
                playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
            }]
        };
        const expectedCharacter = {
            id: createdCharacter.id,
            name: 'Legolas',
            skillPoints: 1,
            healthPoints: 11,
            attackPoints: 8,
            defensePoints: 0,
            magikPoints: 0,
            rank: 1,
            level: 1,
            playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
        };
        const retrievedPlayer = await playerReadRepository.read('4962aec5-1481-4cdb-bdb7-6ea52efe6c88');
        expect(createdCharacter).toEqual(expectedCharacter);
        expect(retrievedPlayer.toDto()).toEqual(expectedPlayer);
    });

    it('When I create a character with more than 12 SP distributed, I receive an error.', async () => {
        iCreateACharacterCommand = {
            name: 'Legolas',
            healthPoints: 50,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
        };
        await expect(
            new ICreateACharacter(
                playerReadRepository,
                playerWriteRepository,
                uuid4Generator,
            ).execute(iCreateACharacterCommand)
        ).rejects.toThrow(CharacterDoesNotHaveEnoughSkillPointsException);
    });

    it('When I try to create an eleventh character, I receive an error.', async () => {
        inMemoryDataBase = fellowshipOfTheRing();
        characterWriteRepository = new InMemoryCharacterWriteRepository(inMemoryDataBase);
        playerReadRepository = new InMemoryPlayerReadRepository(inMemoryDataBase);
        playerWriteRepository = new InMemoryPlayerWriteRepository(inMemoryDataBase);
        await expect(
            new ICreateACharacter(
                playerReadRepository,
                playerWriteRepository,
                uuid4Generator,
            ).execute(iCreateACharacterCommand)
        ).rejects.toThrow(CharacterLimitReachedException);
    });

    it('When I try to use the same name twice, I receive an error.', async () => {
        inMemoryDataBase = new InMemoryDataBase({
            players: [
                new InMemoryPlayer({
                    id: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
                    charactersIds: [
                        'edf59fb4-15ee-4aa7-877b-8ced07096a5c'
                    ],
                })
            ],
            characters: [
                new InMemoryCharacter({
                    id: 'edf59fb4-15ee-4aa7-877b-8ced07096a5c',
                    name: 'Legolas',
                    skillPoints: 12,
                    healthPoints: 10,
                    attackPoints: 0,
                    defensePoints: 0,
                    magikPoints: 0,
                    playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
                })
            ],
        });
        characterWriteRepository = new InMemoryCharacterWriteRepository(inMemoryDataBase);
        playerReadRepository = new InMemoryPlayerReadRepository(inMemoryDataBase);
        playerWriteRepository = new InMemoryPlayerWriteRepository(inMemoryDataBase);
        await expect(
            new ICreateACharacter(
                playerReadRepository,
                playerWriteRepository,
                uuid4Generator,
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
            playerId: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
        };
        await expect(
            new ICreateACharacter(
                playerReadRepository,
                playerWriteRepository,
                uuid4Generator,
            ).execute(iCreateACharacterCommand)
        ).rejects.toThrow(CharacterNameLengthException);
    });
});
