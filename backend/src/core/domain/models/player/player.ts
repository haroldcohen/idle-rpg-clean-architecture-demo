import Character from '../character/character';
import CharacterSnapshot from '../character/characterSnapshot';
import CharacterLimitReachedException from '../character/exceptions/characterLimitReachedException';
import CharacterNameAlreadyTakenException from '../character/exceptions/characterNameAlreadyTakenException';
import PlayerSnapshot from './playerSnapshot';

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

    canCreateCharacterOrDie(character: CharacterSnapshot): void {
        if (this.#characters.length >= 10) {
            throw new CharacterLimitReachedException();
        }
        if (this.#characters.filter((c) => c.snapshot().name === character.name).length) {
            throw new CharacterNameAlreadyTakenException();
        }
    }

    snapshot(): PlayerSnapshot {
        return new PlayerSnapshot({
            id: this.#id,
            characters: this.#characters.map((c) => c.snapshot()),
        });
    }
}
