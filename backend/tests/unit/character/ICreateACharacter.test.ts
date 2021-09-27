import Player from '../../../src/core/domain/player/player';
import Character from '../../../src/core/domain/character/character';
import ICreateACharacter from '../../../src/core/useCases/character/ICreateACharacter';


describe('As a Player, I can create a character', () => {
    it('that starts at level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP', async () => {
        const player = new Player();
        const createdCharacter: Character = await new ICreateACharacter().execute(player, {name: 'Legolas'});
        
    });
});
