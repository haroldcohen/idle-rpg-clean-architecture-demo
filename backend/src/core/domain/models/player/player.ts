import Character from '../character/character';
import CharacterDto from '../character/dto';
import CharacterLimitReachedException from '../character/exceptions/characterLimitReachedException';
import CharacterNameAlreadyTakenException from '../character/exceptions/characterNameAlreadyTakenException';
import PlayerDto from './dto';

export default class Player {
    #id: string;

    #characters: Character[];

    public constructor(
        { id, characters = [] }: { id: string, characters: Character[] },
    ) {
        this.#id = id;
        this.#characters = characters;
    }

    addCharacter(character: Character): void {
        this.mayAddCharacter(character.toDto());
        this.#characters.push(character);
    }

    private mayAddCharacter(character: CharacterDto): void {
        if (this.#characters.length >= 10) {
            throw new CharacterLimitReachedException();
        }
        if (this.#characters.filter((c) => c.toDto().name === character.name).length) {
            throw new CharacterNameAlreadyTakenException();
        }
    }

    toDto(): PlayerDto {
        return new PlayerDto({
            id: this.#id,
            characters: this.#characters.map((c) => c.toDto()),
        });
    }
}
