import Player from '../../src/core/domain/models/player/player';
import Character from "../../src/core/domain/models/character/character";

export default class PlayerBuilder {
    protected id!: string;

    protected name!: string;

    protected characters!: Character[];

    withId(value: string): PlayerBuilder {
        this.id = value;

        return this;
    }

    withName(value: string): PlayerBuilder {
        this.name = value;

        return this;
    }

    withCharacters(value: Character[]): PlayerBuilder {
        this.characters = value;

        return this;
    }

    build(): Player {
        return new Player({
            id: this.id,
            name: this.name,
            characters: this.characters,
        });
    }
}
