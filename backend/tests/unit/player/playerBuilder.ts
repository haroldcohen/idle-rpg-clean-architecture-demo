import Player from '../../../src/core/domain/player/player';
import Character from "../../../src/core/domain/character/character";

export default class PlayerBuilder {
    protected name!: string;

    protected characters!: Character[];

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
            name: this.name,
            characters: this.characters,
        });
    }
}