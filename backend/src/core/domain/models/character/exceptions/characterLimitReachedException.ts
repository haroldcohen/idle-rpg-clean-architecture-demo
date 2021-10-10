export default class CharacterLimitReachedException extends Error {
    constructor() {
        super('You\'ve reached the limit of 10 characters per player');
    }
}
