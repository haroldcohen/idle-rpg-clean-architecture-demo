import CharacterType from '../../../core/domain/models/character/characterType';

export default class InMemoryCharacter implements CharacterType {
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
    }:{
        id: string,
        name: string,
        level: number,
        rank: number,
        skillPoints: number,
        healthPoints: number,
        attackPoints: number,
        defensePoints: number,
        magikPoints: number
    }, playerId: string) {
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
