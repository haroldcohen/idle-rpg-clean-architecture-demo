import InMemoryCharacter from '../character/inMemoryCharacter';

export default class InMemoryPlayer {
    id: string;

    characters: InMemoryCharacter[];

    constructor({
        id,
        characters,
    }:{
        id: string,
        characters: InMemoryCharacter[]
    }) {
        this.id = id;
        this.characters = characters;
    }
}