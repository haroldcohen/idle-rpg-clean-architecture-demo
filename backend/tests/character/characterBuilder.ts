import Character from '../../src/core/domain/models/character/character';

export default class CharacterBuilder {
    protected name!: string;

    protected skillPoints!: number;

    protected healthPoints!: number;

    protected attackPoints!: number;

    protected defensePoints!: number;

    protected magikPoints!: number;

    protected playerId!: string;

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

    withPlayerId(value: string): CharacterBuilder {
        this.playerId = value;

        return this;
    }

    build(): Character {
        return new Character({
            name: this.name,
            skillPoints: this.skillPoints || 12,
            healthPoints: this.healthPoints || 10,
            attackPoints: this.attackPoints || 0,
            defensePoints: this.defensePoints || 0,
            magikPoints: this.magikPoints || 0,
            playerId: this.playerId
        });
    }
}
