import CharacterException from './characterException';

export default class CharacterDoesNotHaveEnoughSkillPointsException extends CharacterException {
    constructor() {
        super('Character does not have enough skill points to spend');
    }
}