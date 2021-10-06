import Character from '../../../src/core/domain/character/character';

export const verifyCharacter = (character: Character, expectedCharacter: Character): void => {
    expect(character.name).toEqual(expectedCharacter.name);
    expect(character.level).toEqual(expectedCharacter.level);
    expect(character.rank).toEqual(expectedCharacter.rank);
    expect(character.skillPoints).toEqual(expectedCharacter.skillPoints);
    expect(character.healthPoints).toEqual(expectedCharacter.healthPoints);
    expect(character.attackPoints).toEqual(expectedCharacter.attackPoints);
    expect(character.defensePoints).toEqual(expectedCharacter.defensePoints);
    expect(character.magikPoints).toEqual(expectedCharacter.magikPoints);
}
