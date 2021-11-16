import CharacterSnapshotType from '../../../../core/domain/models/character/types/characterSnapshot';
import {
    CharacterWriteRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterWriteRepositoryInterface';
import InMemoryCharacter from './inMemoryCharacter';

export default class InMemoryCharacterWriteRepository implements CharacterWriteRepositoryInterface {
    characters: InMemoryCharacter[];

    constructor(inMemoryCharacters: InMemoryCharacter[]) {
        this.characters = inMemoryCharacters;
    }

    async create(characterSnapshot: CharacterSnapshotType): Promise<void> {
        const createdCharacter = new InMemoryCharacter(characterSnapshot);
        this.characters.push(createdCharacter);
    }
}
