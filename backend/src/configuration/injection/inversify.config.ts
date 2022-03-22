import { Container } from 'inversify';
import PSQLPlayerReadRepository from '../../adapters/secondaries/PSQL/player/PSQLPlayerReadRepository';
import PSQLPlayerWriteRepository from '../../adapters/secondaries/PSQL/player/PSQLPlayerWriteRepository';
import { PlayerReadRepositoryInterface } from '../../core/useCases/player/interfaces/playerReadRepositoryInterface';
import { PlayerWriteRepositoryInterface } from '../../core/useCases/player/interfaces/playerWriteRepositoryInterface';
import TYPES from './types';

const container = new Container();
container
    .bind<PlayerReadRepositoryInterface>(TYPES.PlayerReadRepositoryInterface)
    .to(PSQLPlayerReadRepository);
container
    .bind<PlayerWriteRepositoryInterface>(TYPES.PlayerWriteRepositoryInterface)
    .to(PSQLPlayerWriteRepository);

export default container;
