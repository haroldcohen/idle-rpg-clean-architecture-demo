import { getRepository } from 'typeorm';
import Character from '../../../../core/domain/models/character/character';
import {
    CharacterRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterRepositoryInterface';
import PSQLPlayer from '../player/PSQLPlayer';
import PSQLCharacter from './PSQLCharacter';

export default class PSQLCharacterRepository implements CharacterRepositoryInterface {
    static PSQLCharacterToCharacter(pSQLCharacter: PSQLCharacter): Character {
        return new Character({
            id: pSQLCharacter.id,
            name: pSQLCharacter.name,
            skillPoints: pSQLCharacter.skillPoints,
            healthPoints: pSQLCharacter.healthPoints,
            attackPoints: pSQLCharacter.attackPoints,
            defensePoints: pSQLCharacter.defensePoints,
            magikPoints: pSQLCharacter.magikPoints,
            playerId: pSQLCharacter.player.id,
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

        return PSQLCharacterRepository.PSQLCharacterToCharacter(createdPSQLCharacter);
    }

    async read(characterId: string): Promise<Character> {
        const retrievedCharacter = await getRepository(PSQLCharacter)
            .createQueryBuilder('character')
            .leftJoinAndSelect('character.player', 'player')
            .where('character.id = :characterId', { characterId })
            .getOneOrFail();

        return PSQLCharacterRepository.PSQLCharacterToCharacter(retrievedCharacter);
    }

    async all(): Promise<Character[]> {
        const retrievedCharacters = await getRepository(PSQLCharacter)
            .createQueryBuilder().getMany();

        return retrievedCharacters.map((c) => PSQLCharacterRepository.PSQLCharacterToCharacter(c));
    }
}
