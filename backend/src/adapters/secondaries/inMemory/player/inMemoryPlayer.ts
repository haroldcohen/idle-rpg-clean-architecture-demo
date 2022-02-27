export default class InMemoryPlayer {
    id: string;

    charactersIds: string[];

    constructor({
        id,
        charactersIds,
    }:{
        id: string,
        charactersIds: string[]
    }) {
        this.id = id;
        this.charactersIds = charactersIds;
    }
}