import CharacterSnapshot from '../../../domain/models/character/characterSnapshot';

export interface CharacterWriteRepositoryInterface {
    create(characterSnapshot: CharacterSnapshot): void;
}
