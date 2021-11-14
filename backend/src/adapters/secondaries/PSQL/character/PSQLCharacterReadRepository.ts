import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import Character from '../../../../core/domain/models/character/character';
import PSQLCharacter from './PSQLCharacter';

@injectable()
export default class PSQLCharacterReadRepository {
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

    async read(characterId: string): Promise<Character> {
        const retrievedCharacter = await getRepository(PSQLCharacter)
            .createQueryBuilder('character')
            .leftJoinAndSelect('character.player', 'player')
            .where('character.id = :characterId', { characterId })
            .getOneOrFail();

        return PSQLCharacterReadRepository.PSQLCharacterToCharacter(retrievedCharacter);
    }

    async all(): Promise<Character[]> {
        const retrievedCharacters = await getRepository(PSQLCharacter)
            .createQueryBuilder().getMany();

        return retrievedCharacters.map((c) => PSQLCharacterReadRepository.PSQLCharacterToCharacter(c));
    }
}
