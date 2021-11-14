export default class CharacterDoesNotHaveEnoughSkillPointsException extends Error {
    constructor() {
        super('Character does not have enough skill points to spend');
    }
}