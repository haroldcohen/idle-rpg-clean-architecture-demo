import PlayerSnapshot from '../../../../core/domain/models/player/playerSnapshot';
import {
    PlayerWriteRepositoryInterface,
} from '../../../../core/useCases/player/interfaces/playerWriteRepositoryInterface';
import InMemoryCharacter from '../character/inMemoryCharacter';
import InMemoryPlayer from './inMemoryPlayer';

export default class InMemoryPlayerWriteRepository implements PlayerWriteRepositoryInterface {
    players: InMemoryPlayer[];

    constructor(players: InMemoryPlayer[]) {
        this.players = players;
    }

    async create(playerSnapshot: PlayerSnapshot): Promise<void> {
        const playerToCreate = new InMemoryPlayer({
            id: playerSnapshot.id,
            characters: playerSnapshot.characters.map((c) => new InMemoryCharacter(c)),
        });
        this.players.push(playerToCreate);
    }
}
