import Character from '../../../../core/domain/models/character/character';
import {
    CharacterRepositoryInterface
} from '../../../../core/useCases/character/interfaces/characterRepositoryInterface';
import InMemoryCharacter from './inMemoryCharacter';

export default class InMemoryCharacterRepository implements CharacterRepositoryInterface {
    #characters: InMemoryCharacter[];

    constructor(characters: InMemoryCharacter[]) {
        this.#characters = characters;
    }

    inMemoryCharacterToCharacter(inMemoryCharacter: InMemoryCharacter): Character {
        return new Character({
            id: inMemoryCharacter.id,
            name: inMemoryCharacter.name,
            skillPoints: inMemoryCharacter.skillPoints,
            healthPoints: inMemoryCharacter.healthPoints,
            attackPoints: inMemoryCharacter.attackPoints,
            defensePoints: inMemoryCharacter.defensePoints,
            magikPoints: inMemoryCharacter.magikPoints,
        });
    }

    create(character: Character, playerId: string): Character {
        const createdCharacter = new InMemoryCharacter(character, playerId);
        this.#characters.push(createdCharacter);

        return this.inMemoryCharacterToCharacter(createdCharacter);
    }

    read(characterId: string): Character {
        const filtered = this.#characters.filter((c) => c.id === characterId).pop();
        if (!filtered) {
            throw Error('Character does not exist');
        }

        return this.inMemoryCharacterToCharacter(filtered);
    }

    all(): Character[] {
        return this.#characters.map((inMemoryCharacter) => this.inMemoryCharacterToCharacter(inMemoryCharacter));
    }
}
