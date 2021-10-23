import { getRepository } from 'typeorm';
import Character from '../../../../core/domain/models/character/character';
import {
    CharacterRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterRepositoryInterface';
import PSQLPlayer from '../player/PSQLPlayer';
import PSQLCharacter from './PSQLCharacter';

export default class PSQLCharacterRepository implements CharacterRepositoryInterface {
    PSQLCharacterToCharacter(pSQLCharacter: PSQLCharacter): Character {
        return new Character({
            id: pSQLCharacter.id,
            name: pSQLCharacter.name,
            skillPoints: pSQLCharacter.skillPoints,
            healthPoints: pSQLCharacter.healthPoints,
            attackPoints: pSQLCharacter.attackPoints,
            defensePoints: pSQLCharacter.defensePoints,
            magikPoints: pSQLCharacter.magikPoints,
        });
    }

    async create(character: Character, playerId: string): Promise<Character> {
        const PSQLCharacterToCreate = new PSQLCharacter(
            character.id,
            character.name,
            character.skillPoints,
            character.healthPoints,
            character.attackPoints,
            character.defensePoints,
            character.magikPoints,
            new PSQLPlayer(playerId),
        );
        const createdPSQLCharacter = await getRepository(PSQLCharacter)
            .create(PSQLCharacterToCreate)
            .save();

        return this.PSQLCharacterToCharacter(createdPSQLCharacter);
    }

    async read(characterId: string): Promise<Character> {
        const retrievedCharacter = await getRepository(PSQLCharacter).findOneOrFail(characterId);

        return this.PSQLCharacterToCharacter(retrievedCharacter);
    }

    async all(): Promise<Character[]> {
        const retrievedCharacters = await getRepository(PSQLCharacter)
            .createQueryBuilder().getMany();

        return retrievedCharacters.map((c) => this.PSQLCharacterToCharacter(c));
    }
}
