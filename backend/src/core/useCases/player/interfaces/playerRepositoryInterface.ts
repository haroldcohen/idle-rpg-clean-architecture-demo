import Player from '../../../domain/models/player/player';

export interface PlayerRepositoryInterface {
    read(playerId: string): Promise<Player>;
}
