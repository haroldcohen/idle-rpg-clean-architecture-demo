import Character from '../../domain/character/character';

export default class CharacterBuilder {
    protected name!: string;

    protected level!: number;

    withName(value: string): CharacterBuilder {
        this.name = value;

        return this;
    }

    withLevel(value: number): CharacterBuilder {
        this.level = value;

        return this;
    }

    build(): Character {
        return new Character({
            name: this.name,
            level: this.level,
        });
    }
}
