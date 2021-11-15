import Player from '../../src/core/domain/models/player/player';
import Character from '../../src/core/domain/models/character/character';

export default class PlayerBuilder {
    protected id!: string;

    protected characters!: Character[];

    withId(value: string): PlayerBuilder {
        this.id = value;

        return this;
    }

    withCharacters(value: Character[]): PlayerBuilder {
        this.characters = value;

        return this;
    }

    build(): Player {
        return new Player({
            id: this.id,
            characters: this.characters,
        });
    }
}
