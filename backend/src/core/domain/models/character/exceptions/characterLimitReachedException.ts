import CharacterException from './characterException';

export default class CharacterLimitReachedException extends CharacterException {
    constructor() {
        super('You\'ve reached the limit of 10 characters per player');
    }
}
