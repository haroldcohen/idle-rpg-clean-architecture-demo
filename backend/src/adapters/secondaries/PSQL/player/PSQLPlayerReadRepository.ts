import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import Player from '../../../../core/domain/models/player/player';
import {
    PlayerReadRepositoryInterface,
} from '../../../../core/useCases/player/interfaces/playerReadRepositoryInterface';
import PSQLCharacterReadRepository from '../character/PSQLCharacterReadRepository';
import PSQLPlayer from './PSQLPlayer';

@injectable()
export default class PSQLPlayerReadRepository implements PlayerReadRepositoryInterface {
    static toPlayer(pSQLPlayer: PSQLPlayer): Player {
        return new Player({
            id: pSQLPlayer.id,
            characters: pSQLPlayer.characters.map((p) => PSQLCharacterReadRepository.toCharacter(p)),
        });
    }

    async read(playerId: string): Promise<Player> {
        const retrievedPlayer = await getRepository(PSQLPlayer)
            .createQueryBuilder('player')
            .where('player.id = :playerId', { playerId })
            .leftJoinAndSelect('player.characters', 'characters')
            .leftJoinAndSelect('characters.player', 'characterPlayer')
            .getOneOrFail();

        return PSQLPlayerReadRepository.toPlayer(retrievedPlayer);
    }
}
