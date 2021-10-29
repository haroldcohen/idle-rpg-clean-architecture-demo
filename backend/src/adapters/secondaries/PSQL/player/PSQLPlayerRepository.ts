import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import Player from '../../../../core/domain/models/player/player';
import { PlayerRepositoryInterface } from '../../../../core/useCases/player/interfaces/playerRepositoryInterface';
import PSQLCharacterRepository from '../character/PSQLCharacterRepository';
import PSQLPlayer from './PSQLPlayer';

@injectable()
export default class PSQLPlayerRepository implements PlayerRepositoryInterface {
    static PSQLPlayerToPlayer(pSQLPlayer: PSQLPlayer): Player {
        return new Player({
            id: pSQLPlayer.id,
            characters: pSQLPlayer.characters.map((p) => PSQLCharacterRepository.PSQLCharacterToCharacter(p)),
        });
    }

    async read(playerId: string): Promise<Player> {
        const retrievedPlayer = await getRepository(PSQLPlayer)
            .createQueryBuilder('player')
            .where('player.id = :playerId', { playerId })
            .leftJoinAndSelect('player.characters', 'characters')
            .leftJoinAndSelect('characters.player', 'characterPlayer')
            .getOneOrFail();

        return PSQLPlayerRepository.PSQLPlayerToPlayer(retrievedPlayer);
    }
}
