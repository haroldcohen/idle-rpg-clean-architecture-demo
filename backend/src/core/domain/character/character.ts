import CharacterType from './characterType';
import Player from '../player/player';

export default class Character implements CharacterType {
    #name: string;

    #player: Player;

    public constructor(
        { name, player }: { name: string, player: Player},
    ) {
        this.#name = name;
        this.#player = player;
    }

    get name(): string {
        return this.#name;
    }

    get level(): number {
        return 1;
    }

    get rank(): number {
        return 1;
    }

    get skillPoints(): number {
        return 12;
    }

    get healthPoints(): number {
        return 10;
    }

    get attackPoints(): number {
        return 0;
    }

    get defensePoints(): number {
        return 0;
    }

    get magikPoints(): number {
        return 0;
    }

    get player(): Player {
        return this.#player;
    }
}
