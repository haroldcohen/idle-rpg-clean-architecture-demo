import CharacterType from './characterType';

export default class Character implements CharacterType {
    #name: string;

    public constructor(
        { name }: { name: string},
    ) {
        this.#name = name;
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
