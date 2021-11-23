import Character from '../../../../core/domain/models/character/character';
import {
    CharacterReadRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterReadRepositoryInterface';
import InMemoryCharacter from './inMemoryCharacter';

export default class InMemoryCharacterReadRepository implements CharacterReadRepositoryInterface {
    characters: InMemoryCharacter[];

    constructor(characters: InMemoryCharacter[]) {
        this.characters = characters;
    }

    static inMemoryCharacterToCharacter(inMemoryCharacter: InMemoryCharacter): Character {
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
        const filtered = this.characters.filter((c) => c.id === characterId).pop();
        if (!filtered) {
            throw Error('Character does not exist');
        }

        return InMemoryCharacterReadRepository.inMemoryCharacterToCharacter(filtered);
    }

    async all(): Promise<Character[]> {
        return this.characters.map(
            (inMemoryCharacter) => InMemoryCharacterReadRepository.inMemoryCharacterToCharacter(inMemoryCharacter),
        );
    }
}
