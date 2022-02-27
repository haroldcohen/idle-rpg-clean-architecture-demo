import { getRepository } from 'typeorm';
import PlayerDto from '../../../../core/domain/models/player/dto';
import { PlayerWriteRepositoryInterface } from '../../../../core/useCases/player/interfaces/playerWriteRepositoryInterface';
import PSQLCharacter from '../character/PSQLCharacter';
import PSQLPlayer from './PSQLPlayer';

export default class PSQLPlayerWriteRepository implements PlayerWriteRepositoryInterface {
    async create(player: PlayerDto): Promise<void> {
    }

    async update(player: PlayerDto): Promise<void> {
        const PSQLPlayerToUpdate = new PSQLPlayer();
        PSQLPlayerToUpdate.id = player.id;
        await PSQLPlayer.update(player.id, PSQLPlayerToUpdate);
        await getRepository(PSQLCharacter)
            .create(new PSQLCharacter(
                'edf59fb4-15ee-4aa7-877b-8ced07096a5c',
                'Legolas',
                12,
                10,
                0,
                0,
                0,
                PSQLPlayerToUpdate,
            ))
            .save();
    }
}
