import Character from '../character/character';
import CharacterLimitReachedException from '../character/exceptions/characterLimitReachedException';
import CharacterNameAlreadyTakenException from '../character/exceptions/characterNameAlreadyTakenException';
import CharacterSnapshot from '../character/snapshot';
import PlayerSnapshot from './snapshot';

export default class Player {
    #id: string;

    #characters: Character[];

    public constructor(
        { id, characters = [] }: { id: string, characters: Character[] },
    ) {
        this.#id = id;
        this.#characters = characters;
    }

    canCreateCharacterOrThrow(character: CharacterSnapshot): void {
        if (this.#characters.length >= 10) {
            throw new CharacterLimitReachedException();
        }
        if (this.#characters.filter((c) => c.snapshot().name === character.name).length) {
            throw new CharacterNameAlreadyTakenException();
        }
    }

    snapshot(): PlayerSnapshot {
        return {
            id: this.#id,
            characters: this.#characters.map((c) => c.snapshot()),
        };
    }
}
