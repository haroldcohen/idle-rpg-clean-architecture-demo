import Player from '../../../domain/models/player/player';

export interface PlayerWriteRepositoryInterface {
    create(player: Player): Promise<Player>
}