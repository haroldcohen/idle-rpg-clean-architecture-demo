import Player from '../../../domain/models/player/player';

export interface PlayerReadRepositoryInterface {
    read(playerId: string): Promise<Player>;
}
