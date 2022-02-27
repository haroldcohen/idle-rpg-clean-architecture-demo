import InMemoryPlayer from '../player/inMemoryPlayer';
import InMemoryCharacter from '../character/inMemoryCharacter';

export default class InMemoryDataBase {
    players: InMemoryPlayer[] = [];

    characters: InMemoryCharacter[] = [];

    constructor({ players, characters }: {
        players: InMemoryPlayer[],
        characters: InMemoryCharacter[],
    }) {
        this.players = players;
        this.characters = characters;
    }
}
