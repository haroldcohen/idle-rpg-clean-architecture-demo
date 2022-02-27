import CharacterDto from '../../../../core/domain/models/character/dto';
import {
    CharacterWriteRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterWriteRepositoryInterface';
import InMemoryDataBase from '../common/inMemoryDataBase';
import InMemoryCharacter from './inMemoryCharacter';

export default class InMemoryCharacterWriteRepository implements CharacterWriteRepositoryInterface {
    database: InMemoryDataBase;

    constructor(database: InMemoryDataBase) {
        this.database = database;
    }

    async create(characterDto: CharacterDto): Promise<void> {
        const createdCharacter = new InMemoryCharacter(characterDto);
        this.database.characters.push(createdCharacter);
    }
}
