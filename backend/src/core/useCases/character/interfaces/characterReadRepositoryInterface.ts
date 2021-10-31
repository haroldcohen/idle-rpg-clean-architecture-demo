import Character from '../../../domain/models/character/character';

export interface CharacterReadRepositoryInterface {
    read(characterId: string): Promise<Character>;
    all(): Promise<Character[]>;
}
