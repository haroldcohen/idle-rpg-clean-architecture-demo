import Player from '../../../../core/domain/models/player/player';
import InMemoryCharacterRepository from '../character/inMemoryCharacterRepository';
import InMemoryPlayer from './inMemoryPlayer';

export default class InMemoryPlayerWriteRepository {
    players: InMemoryPlayer[];

    constructor(players: InMemoryPlayer[]) {
        this.players = players;
    }

    async create(player: Player): Promise<Player> {
        const createdPlayer = new InMemoryPlayer({
            id: player.id,
            characters: player.characters.map((c) => InMemoryCharacterRepository.characterToInMemoryCharacter(c)),
        });
        this.players.push(createdPlayer);

        return player;
    }
}