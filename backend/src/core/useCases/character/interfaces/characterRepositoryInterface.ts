import Character from '../../../domain/models/character/character';
import CharacterType from '../../../domain/models/character/characterType';

export interface CharacterRepositoryInterface {
    create(character: CharacterType, playerId: string): Character;
    read(characterId: string): Character;
    all(): Character[];
}
