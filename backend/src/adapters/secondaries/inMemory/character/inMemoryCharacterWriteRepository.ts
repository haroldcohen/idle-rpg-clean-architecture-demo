import Character from '../../../../core/domain/models/character/character';
import {
    CharacterWriteRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterWriteRepositoryInterface';
import InMemoryCharacter from './inMemoryCharacter';

export default class InMemoryCharacterWriteRepository implements CharacterWriteRepositoryInterface {
    characters: InMemoryCharacter[];

    constructor(inMemoryCharacters: InMemoryCharacter[]) {
        this.characters = inMemoryCharacters;
    }

    async create(character: Character): Promise<Character> {
        const createdCharacter = new InMemoryCharacter(character);
        this.characters.push(createdCharacter);

        return character;
    }
}
