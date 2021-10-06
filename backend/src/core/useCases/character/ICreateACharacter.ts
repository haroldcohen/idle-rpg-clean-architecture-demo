import Character from '../../domain/character/character';
import Player from '../../domain/player/player';

export default class ICreateACharacter {
    async execute(
        player: Player,
        { name } : { name: string },
    ): Promise<Character> {
        const createdCharacter = new Character({ name });
        player.addCharacter(createdCharacter);

        return createdCharacter;
    }
}
