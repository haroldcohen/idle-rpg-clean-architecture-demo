import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import PlayerDto from '../../../../core/domain/models/player/dto';
import {
    PlayerWriteRepositoryInterface,
} from '../../../../core/useCases/player/interfaces/playerWriteRepositoryInterface';
import PSQLCharacter from '../character/PSQLCharacter';
import PSQLPlayer from './PSQLPlayer';

@injectable()
export default class PSQLPlayerWriteRepository implements PlayerWriteRepositoryInterface {
    async create(player: PlayerDto): Promise<void> {
        const PSQLPlayerToCreate = new PSQLPlayer();
        PSQLPlayerToCreate.id = player.id;
        await PSQLPlayer.update(player.id, PSQLPlayerToCreate);
    }

    async update(player: PlayerDto): Promise<void> {
        const PSQLPlayerToUpdate = new PSQLPlayer();
        PSQLPlayerToUpdate.id = player.id;
        await PSQLPlayer.update(player.id, PSQLPlayerToUpdate);
        await player.characters.map(async (c) => {
            await getRepository(PSQLCharacter)
                .merge(new PSQLCharacter(
                    c.id,
                    c.name,
                    c.skillPoints,
                    c.healthPoints,
                    c.attackPoints,
                    c.defensePoints,
                    c.magikPoints,
                    PSQLPlayerToUpdate,
                ))
                .save();
        });
    }
}
