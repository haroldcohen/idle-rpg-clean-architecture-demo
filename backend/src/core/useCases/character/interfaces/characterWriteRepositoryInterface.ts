import CharacterSnapshotType from '../../../domain/models/character/types/characterSnapshot';

export interface CharacterWriteRepositoryInterface {
    create(characterSnapshot: CharacterSnapshotType): void;
}
