import Character from '../character/character';
import CharacterLimitReachedException from '../character/exceptions/characterLimitReachedException';
import CharacterNameAlreadyTakenException from '../character/exceptions/characterNameAlreadyTakenException';

export default class Player {
    #id: string;

    #characters: Character[];

    public constructor(
        { id, characters = [] }: { id: string, characters: Character[] },
    ) {
        this.#id = id;
        this.#characters = characters;
    }

    get id(): string {
        return this.#id;
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
