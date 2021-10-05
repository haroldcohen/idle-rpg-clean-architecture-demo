import Player from '../player/player';

type CharacterType = {
    name: string;
    level: number;
    rank: number;
    skillPoints: number;
    healthPoints: number;
    attackPoints: number;
    defensePoints: number;
    magikPoints: number;
    player: Player;
}

export default CharacterType;
