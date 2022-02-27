import PlayerDto from '../../../../core/domain/models/player/dto';
import {
    PlayerWriteRepositoryInterface,
} from '../../../../core/useCases/player/interfaces/playerWriteRepositoryInterface';
import InMemoryCharacter from '../character/inMemoryCharacter';
import InMemoryDataBase from '../common/inMemoryDataBase';
import InMemoryPlayer from './inMemoryPlayer';

export default class InMemoryPlayerWriteRepository implements PlayerWriteRepositoryInterface {
    database: InMemoryDataBase;

    constructor(database: InMemoryDataBase) {
        this.database = database;
    }

    async create(playerDto: PlayerDto): Promise<void> {
        const playerToCreate = new InMemoryPlayer({
            id: playerDto.id,
            charactersIds: playerDto.characters.map((c) => c.id),
        });
        this.database.players.push(playerToCreate);
    }

    async update(playerDto: PlayerDto): Promise<void> {
        const retrievedPlayer = this.database.players.filter((p) => p.id === playerDto.id)[0];
        retrievedPlayer.charactersIds = playerDto.characters.map((c) => c.id);
        playerDto.characters.map((c) => this.database.characters.push(new InMemoryCharacter(c)));
    }
}
