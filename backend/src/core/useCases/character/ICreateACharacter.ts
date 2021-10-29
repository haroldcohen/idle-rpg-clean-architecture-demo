import Character from '../../domain/models/character/character';
import { PlayerRepositoryInterface } from '../player/interfaces/playerRepositoryInterface';
import { CharacterRepositoryInterface } from './interfaces/characterRepositoryInterface';
import ICreateACharacterCommand from './types/ICreateACharacterCommand';

export default class ICreateACharacter {
    #characterRepository: CharacterRepositoryInterface;

    #playerRepository: PlayerRepositoryInterface;

    constructor(
        characterRepository: CharacterRepositoryInterface,
        playerRepository: PlayerRepositoryInterface,
    ) {
        this.#characterRepository = characterRepository;
        this.#playerRepository = playerRepository;
    }

    async execute(
        playerId: string,
        executionParams: ICreateACharacterCommand,
    ): Promise<Character> {
        const { name, healthPoints, attackPoints, defensePoints, magikPoints } = executionParams;
        const createdCharacter = new Character({
            name,
            skillPoints: 12,
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            playerId,
        });
        createdCharacter.levelUpHealthPoints(healthPoints);
        createdCharacter.levelUpAttackPoints(attackPoints);
        createdCharacter.levelUpDefensePoints(defensePoints);
        createdCharacter.levelUpMagikPoints(magikPoints);
        const player = await this.#playerRepository.read(playerId);
        player.playerCanCreateCharacterOrDie(createdCharacter);

        return await this.#characterRepository.create(createdCharacter);
    }
}
