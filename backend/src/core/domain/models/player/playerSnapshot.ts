import CharacterSnapshot from '../character/characterSnapshot';

export default class PlayerSnapshot {
    readonly id: string;

    readonly characters: CharacterSnapshot[];

    public constructor(
        { id, characters = [] }: { id: string, characters: CharacterSnapshot[] },
    ) {
        this.id = id;
        this.characters = characters;
    }
}
