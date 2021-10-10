export default class CharacterNameAlreadyTakenException extends Error {
    constructor() {
        super('Cannot use twice the same character name');
    }
}