import Player from '../../../src/core/domain/player/player';
import Character from '../../../src/core/domain/character/character';
import ICreateACharacter from '../../../src/core/useCases/character/ICreateACharacter';
import { LegolasCharacterBuilder } from './characterBuilders';
import { verifyCharacter } from "./verifyCharacter";


describe('As a Player, I can create a character', () => {
    it('that starts at level 1, rank 1 with 12 SP, 10 HP, 0 AP, 0 DP, 0 MP', async () => {
        const player = new Player();
        const expectedCharacter = new LegolasCharacterBuilder()
            .withLevel(1)
            .withRank(1)
            .build();
        const createdCharacter: Character = await new ICreateACharacter().execute(player, 'Legolas');
        verifyCharacter(createdCharacter, expectedCharacter);
    });
});
