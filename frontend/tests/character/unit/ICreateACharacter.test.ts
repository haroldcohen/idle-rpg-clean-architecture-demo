import Player from '../../../src/core/domain/models/player/player';
import Character from '../../../src/core/domain/models/character/character';
import ICreateACharacter from '../../../src/core/useCases/character/ICreateACharacter';

describe('As a player, I can create a character', () => {
    var player: Player;
    var expectedCharacter: Character;

    beforeEach(() => {
        player = new Player();
        expectedCharacter = new Character();
    });

    it('That starts at level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP.', async () => {
        const createdCharacter = await new ICreateACharacter().execute();
        expect(createdCharacter).toBeInstanceOf(Character);
    });
});
