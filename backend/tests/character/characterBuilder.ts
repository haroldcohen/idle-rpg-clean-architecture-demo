import Character from '../../src/core/domain/models/character/character';
import Uuid4Generator from '../../src/adapters/primaries/common/uuid4Generator';
import {Uuid4GeneratorInterface} from "../../src/core/useCases/common/interfaces/uuid4GeneratorInterface";

export default class CharacterBuilder {
    name!: string;

    skillPoints!: number;

    healthPoints!: number;

    attackPoints!: number;

    defensePoints!: number;

    magikPoints!: number;

    playerId!: string;

    uuid4Generator: Uuid4GeneratorInterface;

    constructor(uuid4Generator: Uuid4GeneratorInterface) {
        this.uuid4Generator = uuid4Generator;
    }

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
            id: this.uuid4Generator.generate(),
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
