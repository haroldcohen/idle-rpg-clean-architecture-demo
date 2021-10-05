import PlayerType from './playerType';

export default class Player implements PlayerType {
    #name: string;

    public constructor(
        { name }: { name: string},
    ) {
        this.#name = name;
    }

    get name(): string {
        return this.#name;
    }
}
