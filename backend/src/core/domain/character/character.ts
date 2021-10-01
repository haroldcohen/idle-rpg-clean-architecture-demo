import CharacterType from './characterType';

export default class Character implements CharacterType {
    #name: string;

    #level: number;

    public constructor(
        { name, level }: { name: string, level: number},
    ) {
        this.#name = name;
        this.#level = level;
    }

    get name(): string {
        return this.#name;
    }

    get level(): number {
        return this.#level;
    }
}
