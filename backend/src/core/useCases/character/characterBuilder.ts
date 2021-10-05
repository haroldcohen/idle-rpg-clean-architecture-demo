import Character from '../../domain/character/character';

export default class CharacterBuilder {
    protected name!: string;

    withName(value: string): CharacterBuilder {
        this.name = value;

        return this;
    }

    build(): Character {
        return new Character({
            name: this.name,
        });
    }
}
