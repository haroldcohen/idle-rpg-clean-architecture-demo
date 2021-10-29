export default class CharacterSkillMustBePositiveException extends Error {
    constructor() {
        super('A character\'s skill cannot be negative');
    }
}