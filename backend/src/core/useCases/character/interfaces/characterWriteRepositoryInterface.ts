import CharacterDto from '../../../domain/models/character/dto';

export interface CharacterWriteRepositoryInterface {
    create(characterSnapshot: CharacterDto): void;
}
