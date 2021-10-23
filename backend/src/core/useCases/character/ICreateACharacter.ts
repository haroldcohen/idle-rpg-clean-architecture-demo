import Character from '../../domain/models/character/character';
import Player from '../../domain/models/player/player';
import { CharacterRepositoryInterface } from './interfaces/characterRepositoryInterface';
import ICreateACharacterExecutionParametersType from './types/ICreateACharacterExecutionParametersType';

export default class ICreateACharacter {
    #characterRepository: CharacterRepositoryInterface;

    constructor(characterRepository: CharacterRepositoryInterface) {
        this.#characterRepository = characterRepository;
    }

    async execute(
        player: Player,
        executionParams: ICreateACharacterExecutionParametersType,
    ): Promise<Character> {
        const { name, healthPoints, attackPoints, defensePoints, magikPoints } = executionParams;
        const createdCharacter = new Character({ name });
        createdCharacter.levelUpHealthPoints(healthPoints);
        createdCharacter.levelUpAttackPoints(attackPoints);
        createdCharacter.levelUpDefensePoints(defensePoints);
        createdCharacter.levelUpMagikPoints(magikPoints);
        player.playerCanCreateCharacterOrDie(createdCharacter);
        this.#characterRepository.create(createdCharacter, player.id);

        return createdCharacter;
    }
}
