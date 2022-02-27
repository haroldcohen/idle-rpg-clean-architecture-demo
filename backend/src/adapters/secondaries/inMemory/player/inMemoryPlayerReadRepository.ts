import Player from '../../../../core/domain/models/player/player';
import {
    PlayerReadRepositoryInterface,
} from '../../../../core/useCases/player/interfaces/playerReadRepositoryInterface';
import InMemoryCharacter from '../character/inMemoryCharacter';
import InMemoryCharacterReadRepository from '../character/inMemoryCharacterReadRepository';
import InMemoryDataBase from '../common/inMemoryDataBase';
import InMemoryPlayer from './inMemoryPlayer';

export default class InMemoryPlayerReadRepository implements PlayerReadRepositoryInterface {
    database: InMemoryDataBase;

    constructor(database: InMemoryDataBase) {
        this.database = database;
    }

    static toPlayer(inMemoryPlayer: InMemoryPlayer, inMemoryCharacters: InMemoryCharacter[]): Player {
        return new Player({
            id: inMemoryPlayer.id,
            characters: inMemoryCharacters.map(
                (c) => InMemoryCharacterReadRepository.toCharacter(c),
            ),
        });
    }

    async read(playerId: string): Promise<Player> {
        const retrievedPlayer = this.database.players.filter((p) => p.id === playerId).pop();
        if (!retrievedPlayer) {
            throw Error('Player does not exist');
        }
        const retrievedCharacters = this.database.characters.filter((c:InMemoryCharacter) => c.playerId === playerId);

        return InMemoryPlayerReadRepository.toPlayer(retrievedPlayer, retrievedCharacters);
    }
}
