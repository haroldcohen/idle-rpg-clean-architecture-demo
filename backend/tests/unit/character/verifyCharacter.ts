import Character from '../../../src/core/domain/character/character';

export const verifyCharacter = (character: Character, expectedCharacter: Character): void => {
    expect(character.name).toEqual(expectedCharacter.name);
    expect(character.level).toEqual(expectedCharacter.level);
}
