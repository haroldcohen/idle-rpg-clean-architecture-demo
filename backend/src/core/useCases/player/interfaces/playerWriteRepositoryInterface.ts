import PlayerSnapShotType from '../../../domain/models/player/types/playerSnapshot';

export interface PlayerWriteRepositoryInterface {
    create(player: PlayerSnapShotType): Promise<void>
}
