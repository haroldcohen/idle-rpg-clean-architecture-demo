import CharacterSnapshot from '../character/snapshot';

export default class PlayerSnapshot {
    readonly id: string;

    readonly characters: CharacterSnapshot[];

    public constructor(
        {
            id,
            characters,
        }: {
            id: string,
            characters: CharacterSnapshot[],
            skillPoints: number,
            healthPoints: number,
            attackPoints: number,
            defensePoints: number,
            magikPoints: number,
            playerId: string,
        },
    ) {
        this.id = id;
        this.characters = characters;
    }
}