export default class InMemoryCharacter {
    id: string;

    name: string;

    level: number;

    rank: number;

    skillPoints: number;

    healthPoints: number;

    attackPoints: number;

    defensePoints: number;

    magikPoints: number;

    playerId: string;

    constructor({
        id,
        name,
        level,
        rank,
        skillPoints,
        healthPoints,
        attackPoints,
        defensePoints,
        magikPoints,
        playerId,
    }:{
        id: string,
        name: string,
        level: number,
        rank: number,
        skillPoints: number,
        healthPoints: number,
        attackPoints: number,
        defensePoints: number,
        magikPoints: number,
        playerId: string,
    }) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.rank = rank;
        this.skillPoints = skillPoints;
        this.healthPoints = healthPoints;
        this.attackPoints = attackPoints;
        this.defensePoints = defensePoints;
        this.magikPoints = magikPoints;
        this.playerId = playerId;
    }
}
