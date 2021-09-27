import Player from '../../domain/player/player';
import Character from '../../domain/character/character';

export default class ICreateACharacter {
    async execute(
        player: Player,
        { name }: {name: string},
    ): Promise<Character> {
        return new Character();
    }
}
