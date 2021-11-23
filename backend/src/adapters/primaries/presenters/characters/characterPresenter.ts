import PresentedCharacterInterface from './presentedCharacterInterface';
import CharacterSnapshot from '../../../../core/domain/models/character/snapshot';

export default class CharacterPresenter {
    static present(characterSnapShot: CharacterSnapshot): PresentedCharacterInterface {
        return {
            id: characterSnapShot.id,
            name: characterSnapShot.name,
            skillPoints: characterSnapShot.skillPoints,
            healthPoints: characterSnapShot.healthPoints,
            attackPoints: characterSnapShot.attackPoints,
            defensePoints: characterSnapShot.defensePoints,
            magikPoints: characterSnapShot.magikPoints,
            rank: characterSnapShot.rank,
            level: characterSnapShot.level,
        };
    }
}
