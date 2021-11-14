import Character from '../../domain/models/character/character';

export default class ICreateACharacter {
    async execute(): Promise<Character> {
        return new Character();
    }
}
