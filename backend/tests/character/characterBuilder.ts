import Character from '../../src/core/domain/models/character/character';

export default class CharacterBuilder {
    protected name!: string;

    protected level!: number;

    protected rank!: number;

    withName(value: string): CharacterBuilder {
        this.name = value;

        return this;
    }

    withLevel(value: number): CharacterBuilder {
        this.level = value;

        return this;
    }

    withRank(value: number): CharacterBuilder {
        this.rank = value;

        return this;
    }

    build(): Character {
        return new Character({
            name: this.name,
        });
    }
}
