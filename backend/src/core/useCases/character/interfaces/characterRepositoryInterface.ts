import Character from '../../../domain/models/character/character';

export interface CharacterRepositoryInterface {
    create(character: Character): Promise<Character>;
    read(characterId: string): Promise<Character>;
    all(): Promise<Character[]>;
}
