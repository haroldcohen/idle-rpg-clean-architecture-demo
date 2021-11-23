import PlayerSnapshot from '../../../domain/models/player/snapshot';

export interface PlayerWriteRepositoryInterface {
    create(player: PlayerSnapshot): Promise<void>
}
