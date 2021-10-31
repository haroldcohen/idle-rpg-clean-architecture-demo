import Player from '../../../../core/domain/models/player/player';
import {
    PlayerReadRepositoryInterface,
} from '../../../../core/useCases/player/interfaces/playerReadRepositoryInterface';
import InMemoryCharacterRepository from '../character/inMemoryCharacterRepository';
import InMemoryPlayer from './inMemoryPlayer';

export default class InMemoryPlayerReadRepository implements PlayerReadRepositoryInterface {
    players: InMemoryPlayer[];

    constructor(players: InMemoryPlayer[]) {
        this.players = players;
    }

    static inMemoryPlayerToPlayer(inMemoryPlayer: InMemoryPlayer): Player {
        return new Player({
            id: inMemoryPlayer.id,
            characters: inMemoryPlayer.characters.map(
                (p) => InMemoryCharacterRepository.inMemoryCharacterToCharacter(p),
            ),
        });
    }

    async read(playerId: string): Promise<Player> {
        const filtered = this.players.filter((p) => p.id === playerId).pop();
        if (!filtered) {
            throw Error('Player does not exist');
        }

        return InMemoryPlayerReadRepository.inMemoryPlayerToPlayer(filtered);
    }
}
