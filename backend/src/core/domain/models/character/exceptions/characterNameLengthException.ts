import CharacterException from './characterException';

export default class CharacterNameLengthException extends CharacterException {
    constructor() {
        super('A character\'s name maximum length is 25 characters');
    }
}
