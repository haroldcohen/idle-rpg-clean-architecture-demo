import Character from '../../../../core/domain/models/character/character';
import {
    CharacterReadRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterReadRepositoryInterface';
import InMemoryDataBase from '../common/inMemoryDataBase';
import InMemoryCharacter from './inMemoryCharacter';

export default class InMemoryCharacterReadRepository implements CharacterReadRepositoryInterface {
    database: InMemoryDataBase;

    constructor(database: InMemoryDataBase) {
        this.database = database;
    }

    static toCharacter(inMemoryCharacter: InMemoryCharacter): Character {
        return new Character({
            id: inMemoryCharacter.id,
            name: inMemoryCharacter.name,
            skillPoints: inMemoryCharacter.skillPoints,
            healthPoints: inMemoryCharacter.healthPoints,
            attackPoints: inMemoryCharacter.attackPoints,
            defensePoints: inMemoryCharacter.defensePoints,
            magikPoints: inMemoryCharacter.magikPoints,
            playerId: inMemoryCharacter.playerId,
        });
    }

    async read(characterId: string): Promise<Character> {
        const filtered = this.database.characters.filter((c) => c.id === characterId).pop();
        if (!filtered) {
            throw Error('Character does not exist');
        }

        return InMemoryCharacterReadRepository.toCharacter(filtered);
    }

    async all(): Promise<Character[]> {
        return this.database.characters.map(
            (inMemoryCharacter) => InMemoryCharacterReadRepository.toCharacter(inMemoryCharacter),
        );
    }
}
