import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import CharacterDto from '../../../../core/domain/models/character/dto';
import {
    CharacterWriteRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterWriteRepositoryInterface';
import PSQLPlayer from '../player/PSQLPlayer';
import PSQLCharacter from './PSQLCharacter';

@injectable()
export default class PSQLCharacterWriteRepository implements CharacterWriteRepositoryInterface {
    async create(characterSnapshot: CharacterDto): Promise<void> {
        const PSQLCharacterToCreate = new PSQLCharacter(
            characterSnapshot.id,
            characterSnapshot.name,
            characterSnapshot.skillPoints,
            characterSnapshot.healthPoints,
            characterSnapshot.attackPoints,
            characterSnapshot.defensePoints,
            characterSnapshot.magikPoints,
        );
        await getRepository(PSQLCharacter)
            .create(PSQLCharacterToCreate)
            .save();
    }
}
