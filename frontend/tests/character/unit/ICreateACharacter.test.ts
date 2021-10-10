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
        expect(createdCharacter.level).toEqual(1);
        expect(createdCharacter.rank).toEqual(1);
        expect(createdCharacter.skillPoints).toEqual(12);
        expect(createdCharacter.healthPoints).toEqual(10);
        expect(createdCharacter.attackPoints).toEqual(0);
        expect(createdCharacter.defensePoints).toEqual(0);
        expect(createdCharacter.magikPoints).toEqual(0);
    });
});
