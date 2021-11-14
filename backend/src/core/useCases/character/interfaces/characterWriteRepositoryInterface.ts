import Character from '../../../domain/models/character/character';

export interface CharacterWriteRepositoryInterface {
    create(character: Character): Promise<Character>;
}
