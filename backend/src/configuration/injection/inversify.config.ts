import { Container } from 'inversify';
import PSQLCharacterRepository from '../../adapters/secondaries/PSQL/character/PSQLCharacterRepository';
import PSQLPlayerRepository from '../../adapters/secondaries/PSQL/player/PSQLPlayerRepository';
import { CharacterRepositoryInterface } from '../../core/useCases/character/interfaces/characterRepositoryInterface';
import { PlayerRepositoryInterface } from '../../core/useCases/player/interfaces/playerRepositoryInterface';
import TYPES from './types';

const container = new Container();
container.bind<CharacterRepositoryInterface>(TYPES.CharacterRepositoryInterface).to(PSQLCharacterRepository);
container.bind<PlayerRepositoryInterface>(TYPES.PlayerRepositoryInterface).to(PSQLPlayerRepository);

export default container;
