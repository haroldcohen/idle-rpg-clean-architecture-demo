import PlayerSnapShotType from '../../../../core/domain/models/player/types/playerSnapshot';
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

    async create(playerSnapshot: PlayerSnapShotType): Promise<void> {
        const playerToCreate = new InMemoryPlayer({
            id: playerSnapshot.id,
            characters: playerSnapshot.characters.map((c) => new InMemoryCharacter(c)),
        });
        this.players.push(playerToCreate);
    }
}
