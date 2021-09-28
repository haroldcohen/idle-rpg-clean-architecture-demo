import Player from '../../../src/core/domain/player/player';
import Character from '../../../src/core/domain/character/character';
import ICreateACharacter from '../../../src/core/useCases/character/ICreateACharacter';


describe('As a Player, I can create a character', () => {
    it('that starts at level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP', async () => {
        const player = new Player();
        const createdCharacter: Character = await new ICreateACharacter().execute(player, {name: 'Legolas'});
        expect(createdCharacter).toEqual({
            name: 'Legolas',
            level: 1,
            rank: 1,
            skillPoints: 12,
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            player: player,
        });
    });
});
