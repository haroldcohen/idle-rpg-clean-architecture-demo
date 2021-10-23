import Player from '../../../../core/domain/models/player/player';
import { PlayerRepositoryInterface } from '../../../../core/useCases/player/interfaces/playerRepositoryInterface';
import InMemoryCharacterRepository from '../character/inMemoryCharacterRepository';
import InMemoryPlayer from './inMemoryPlayer';

export default class InMemoryPlayerRepository implements PlayerRepositoryInterface {
    #players: InMemoryPlayer[];

    constructor(players: InMemoryPlayer[]) {
        this.#players = players;
    }

    inMemoryPlayerToPlayer(inMemoryPlayer: InMemoryPlayer): Player {
        return new Player({
            id: inMemoryPlayer.id,
            characters: inMemoryPlayer.characters.map((p) => InMemoryCharacterRepository.inMemoryCharacterToCharacter(p)),
        });
    }

    async create(player: Player): Promise<Player> {
        const createdPlayer = new InMemoryPlayer({
            id: player.id,
            characters: player.characters.map((c) => InMemoryCharacterRepository.characterToInMemoryCharacter(c)),
        });
        this.#players.push(createdPlayer);

        return player;
    }

    async read(playerId: string): Promise<Player> {
        const filtered = this.#players.filter((p) => p.id === playerId).pop();
        if (!filtered) {
            throw Error('Player does not exist');
        }

        return this.inMemoryPlayerToPlayer(filtered);
    }
}
