import PlayerDto from '../../../domain/models/player/dto';

export interface PlayerWriteRepositoryInterface {
    create(player: PlayerDto): Promise<void>
    update(player: PlayerDto): Promise<void>
}
