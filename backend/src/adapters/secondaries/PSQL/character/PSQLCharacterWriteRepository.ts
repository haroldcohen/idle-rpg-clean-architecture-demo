import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import CharacterSnapshot from '../../../../core/domain/models/character/snapshot';
import {
    CharacterWriteRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterWriteRepositoryInterface';
import PSQLPlayer from '../player/PSQLPlayer';
import PSQLCharacter from './PSQLCharacter';

@injectable()
export default class PSQLCharacterWriteRepository implements CharacterWriteRepositoryInterface {
    async create(characterSnapshot: CharacterSnapshot): Promise<void> {
        const PSQLCharacterToCreate = new PSQLCharacter(
            characterSnapshot.id,
            characterSnapshot.name,
            characterSnapshot.skillPoints,
            characterSnapshot.healthPoints,
            characterSnapshot.attackPoints,
            characterSnapshot.defensePoints,
            characterSnapshot.magikPoints,
            new PSQLPlayer(characterSnapshot.playerId),
        );
        await getRepository(PSQLCharacter)
            .create(PSQLCharacterToCreate)
            .save();
    }
}
