import Character from '../../../src/core/domain/character/character';
import ICreateACharacter from '../../../src/core/useCases/character/ICreateACharacter';
import PlayerBuilder from '../player/playerBuilder';
import { LegolasCharacterBuilder } from './legolasCharacterBuilder';
import { verifyCharacter } from './verifyCharacter';
import Player from '../../../src/core/domain/player/player';
import CharacterLimitReachedException
    from '../../../src/core/domain/character/exceptions/characterLimitReachedException';
import CharacterBuilder from "./characterBuilder";
import CharacterNameAlreadyTakenException
    from '../../../src/core/domain/character/exceptions/characterNameAlreadyTakenException';


describe('As a Player, I can create a character.', () => {
    var player: Player;
    var expectedCharacter: Character;

    beforeEach(() => {
        player = new PlayerBuilder().withName('PlayerOne').build();
        expectedCharacter = new LegolasCharacterBuilder().build();
    });

    it('That starts at level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP.', async () => {
        const createdCharacter: Character = await new ICreateACharacter().execute(player, {
            name: 'Legolas',
        });
        verifyCharacter(createdCharacter, expectedCharacter);
        expect(player.characters).toContain(createdCharacter);
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
            new ICreateACharacter().execute(player, { name : 'Legolas' })
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
            new ICreateACharacter().execute(player, { name : 'Legolas' })
        ).rejects.toThrow(CharacterNameAlreadyTakenException);
    });
});
