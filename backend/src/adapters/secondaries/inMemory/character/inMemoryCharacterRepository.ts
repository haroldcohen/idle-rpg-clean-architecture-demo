import Character from '../../../../core/domain/models/character/character';
import {
    CharacterRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterRepositoryInterface';
import InMemoryCharacter from './inMemoryCharacter';

export default class InMemoryCharacterRepository implements CharacterRepositoryInterface {
    #characters: InMemoryCharacter[];

    constructor(characters: InMemoryCharacter[]) {
        this.#characters = characters;
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

    static characterToInMemoryCharacter(character: Character): InMemoryCharacter {
        return new InMemoryCharacter(character);
    }

    async create(character: Character): Promise<Character> {
        const createdCharacter = new InMemoryCharacter(character);
        this.#characters.push(createdCharacter);

        return InMemoryCharacterRepository.inMemoryCharacterToCharacter(createdCharacter);
    }

    async read(characterId: string): Promise<Character> {
        const filtered = this.#characters.filter((c) => c.id === characterId).pop();
        if (!filtered) {
            throw Error('Character does not exist');
        }

        return InMemoryCharacterRepository.inMemoryCharacterToCharacter(filtered);
    }

    async all(): Promise<Character[]> {
        return this.#characters.map((inMemoryCharacter) => InMemoryCharacterRepository.inMemoryCharacterToCharacter(inMemoryCharacter));
    }
}
