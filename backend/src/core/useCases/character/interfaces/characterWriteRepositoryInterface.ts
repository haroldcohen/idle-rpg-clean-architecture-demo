import CharacterSnapshot from '../../../domain/models/character/snapshot';

export interface CharacterWriteRepositoryInterface {
    create(characterSnapshot: CharacterSnapshot): void;
}
