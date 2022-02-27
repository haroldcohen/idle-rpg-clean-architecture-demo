import PresentedCharacterInterface from './presentedCharacterInterface';
import CharacterDto from '../../../../core/domain/models/character/dto';

export default class CharacterPresenter {
    static present(characterSnapShot: CharacterDto): PresentedCharacterInterface {
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
