import { v4 } from 'uuid';
import CharacterType from './characterType';

export default class Character implements CharacterType {
    #id: string;

    #name: string;

    public constructor(
        {
            id,
            name,
        }:{
            id?: string,
            name: string,
        },
    ) {
        this.#id = id || v4();
        this.#name = name;
    }

    get id(): string {
        return this.#id;
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
}
