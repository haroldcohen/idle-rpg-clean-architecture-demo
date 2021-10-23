import Character from '../character/character';
import CharacterLimitReachedException from '../character/exceptions/characterLimitReachedException';
import CharacterNameAlreadyTakenException from '../character/exceptions/characterNameAlreadyTakenException';
import PlayerType from './playerType';

export default class Player implements PlayerType {
    #id: string;

    #name: string;

    #characters: Character[];

    public constructor(
        { id, name, characters = [] }: { id: string, name: string, characters: Character[] },
    ) {
        this.#id = id;
        this.#name = name;
        this.#characters = characters;
    }

    get id(): string {
        return this.#id;
    }

    get name(): string {
        return this.#name;
    }

    get characters(): Character[] {
        return this.#characters;
    }

    playerCanCreateCharacterOrDie(character: Character): void {
        if (this.#characters.length >= 10) {
            throw new CharacterLimitReachedException();
        }
        if (this.#characters.filter((c) => c.name === character.name).length) {
            throw new CharacterNameAlreadyTakenException();
        }
    }
}
