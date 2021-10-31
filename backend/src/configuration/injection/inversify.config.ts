import { Container } from 'inversify';
import PSQLCharacterReadRepository from '../../adapters/secondaries/PSQL/character/PSQLCharacterReadRepository';
import PSQLCharacterWriteRepository from '../../adapters/secondaries/PSQL/character/PSQLCharacterWriteRepository';
import PSQLPlayerReadRepository from '../../adapters/secondaries/PSQL/player/PSQLPlayerReadRepository';
import {
    CharacterReadRepositoryInterface,
} from '../../core/useCases/character/interfaces/characterReadRepositoryInterface';
import {
    CharacterWriteRepositoryInterface,
} from '../../core/useCases/character/interfaces/characterWriteRepositoryInterface';
import { PlayerReadRepositoryInterface } from '../../core/useCases/player/interfaces/playerReadRepositoryInterface';
import TYPES from './types';

const container = new Container();
container
    .bind<CharacterReadRepositoryInterface>(TYPES.CharacterReadRepositoryInterface)
    .to(PSQLCharacterReadRepository);
container
    .bind<CharacterWriteRepositoryInterface>(TYPES.CharacterWriteRepositoryInterface)
    .to(PSQLCharacterWriteRepository);
container
    .bind<PlayerReadRepositoryInterface>(TYPES.PlayerReadRepositoryInterface)
    .to(PSQLPlayerReadRepository);

export default container;
