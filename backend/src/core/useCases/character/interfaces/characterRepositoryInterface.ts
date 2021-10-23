import Character from '../../../domain/models/character/character';

export interface CharacterRepositoryInterface {
    create(character: Character, playerId: string): Promise<Character>;
    read(characterId: string): Promise<Character>;
    all(): Promise<Character[]>;
}
