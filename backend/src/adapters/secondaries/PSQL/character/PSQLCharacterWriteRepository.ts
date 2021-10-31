import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import Character from '../../../../core/domain/models/character/character';
import {
    CharacterWriteRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterWriteRepositoryInterface';
import PSQLPlayer from '../player/PSQLPlayer';
import PSQLCharacter from './PSQLCharacter';

@injectable()
export default class PSQLCharacterWriteRepository implements CharacterWriteRepositoryInterface {
    async create(character: Character): Promise<Character> {
        const PSQLCharacterToCreate = new PSQLCharacter(
            character.id,
            character.name,
            character.skillPoints,
            character.healthPoints,
            character.attackPoints,
            character.defensePoints,
            character.magikPoints,
            new PSQLPlayer(character.playerId),
        );
        await getRepository(PSQLCharacter)
            .create(PSQLCharacterToCreate)
            .save();

        return character;
    }
}
