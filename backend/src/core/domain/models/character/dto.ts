export default class CharacterDto {
    readonly id: string;

    readonly name: string;

    readonly skillPoints: number;

    readonly healthPoints: number;

    readonly attackPoints: number;

    readonly defensePoints: number;

    readonly magikPoints: number;

    readonly level: number;

    readonly rank: number;

    readonly playerId: string;

    public constructor(
        {
            id,
            name,
            skillPoints,
            healthPoints,
            attackPoints,
            defensePoints,
            magikPoints,
            playerId,
        }: {
            id: string,
            name: string,
            skillPoints: number,
            healthPoints: number,
            attackPoints: number,
            defensePoints: number,
            magikPoints: number,
            playerId: string,
        },
    ) {
        this.id = id;
        this.name = name;
        this.skillPoints = skillPoints;
        this.healthPoints = healthPoints;
        this.attackPoints = attackPoints;
        this.defensePoints = defensePoints;
        this.magikPoints = magikPoints;
        this.playerId = playerId;
        this.rank = 1;
        this.level = 1;
    }
}