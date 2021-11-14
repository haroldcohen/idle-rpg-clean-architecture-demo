import Character from '../../../../core/domain/models/character/character';
import PresentedCharacterInterface from './presentedCharacterInterface';

export default class CharacterPresenter {
    static present(character: Character): PresentedCharacterInterface {
        return {
            id: character.id,
            name: character.name,
            skillPoints: character.skillPoints,
            healthPoints: character.healthPoints,
            attackPoints: character.attackPoints,
            defensePoints: character.defensePoints,
            magikPoints: character.magikPoints,
            rank: character.rank,
            level: character.level,
        };
    }
}
