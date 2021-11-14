import PlayerSnapshot from '../../../domain/models/player/playerSnapshot';

export interface PlayerWriteRepositoryInterface {
    create(player: PlayerSnapshot): Promise<void>
}
