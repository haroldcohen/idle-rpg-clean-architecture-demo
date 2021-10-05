import Character from '../../domain/character/character';
import Player from '../../domain/player/player';

export default class ICreateACharacter {
    async execute(
        player: Player,
        name: string,
    ): Promise<Character> {
        return new Character({ name, level: 1 });
    }
}
