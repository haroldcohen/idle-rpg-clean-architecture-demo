import CharacterException from './characterException';

export default class CharacterNameAlreadyTakenException extends CharacterException {
    constructor() {
        super('Cannot use twice the same character name');
    }
}
