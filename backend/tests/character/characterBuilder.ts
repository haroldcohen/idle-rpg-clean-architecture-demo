import Character from '../../src/core/domain/models/character/character';

export default class CharacterBuilder {
    protected name!: string;

    protected skillPoints!: number;

    protected healthPoints!: number;

    protected attackPoints!: number;

    protected defensePoints!: number;

    protected magikPoints!: number;

    withName(value: string): CharacterBuilder {
        this.name = value;

        return this;
    }

    withSkillPoints(skillPoints: number): CharacterBuilder {
        this.skillPoints = skillPoints;

        return this;
    }

    withHealthPoints(value: number): CharacterBuilder {
        this.healthPoints = value;

        return this;
    }

    withAttackPoints(value: number): CharacterBuilder {
        this.attackPoints = value;

        return this;
    }

    withDefensePoints(value: number): CharacterBuilder {
        this.defensePoints = value;

        return this;
    }

    withMagikPoints(value: number): CharacterBuilder {
        this.magikPoints = value;

        return this;
    }

    build(): Character {
        return new Character({
            name: this.name,
            skillPoints: this.skillPoints,
            healthPoints: this.healthPoints,
            attackPoints: this.attackPoints,
            defensePoints: this.defensePoints,
            magikPoints: this.magikPoints,
        });
    }
}
