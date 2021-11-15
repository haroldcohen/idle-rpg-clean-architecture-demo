import CharacterException from './characterException';

export default class CharacterSkillMustBePositiveException extends CharacterException {
    constructor() {
        super('A character\'s skill cannot be negative');
    }
}