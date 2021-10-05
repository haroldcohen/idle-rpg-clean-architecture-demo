import Character from '../../../src/core/domain/character/character';

export const verifyNewCharacter = (character: Character): void => {
    expect(character.level).toEqual(1);
    expect(character.rank).toEqual(1);
    expect(character.skillPoints).toEqual(12);
    expect(character.healthPoints).toEqual(10);
    expect(character.attackPoints).toEqual(0);
    expect(character.defensePoints).toEqual(0);
    expect(character.magikPoints).toEqual(0);
}

export const verifyCharacter = (character: Character, expectedCharacter: Character): void => {
    expect(character.name).toEqual(expectedCharacter.name);
    expect(character.level).toEqual(expectedCharacter.level);
    expect(character.rank).toEqual(expectedCharacter.rank);
}
