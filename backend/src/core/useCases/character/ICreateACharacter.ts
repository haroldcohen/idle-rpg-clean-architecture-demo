import Character from '../../domain/models/character/character';
import { PlayerReadRepositoryInterface } from '../player/interfaces/playerReadRepositoryInterface';
import { CharacterWriteRepositoryInterface } from './interfaces/characterWriteRepositoryInterface';
import ICreateACharacterCommand from './types/ICreateACharacterCommand';

export default class ICreateACharacter {
    #characterWriteRepository: CharacterWriteRepositoryInterface;

    #playerReadRepository: PlayerReadRepositoryInterface;

    constructor(
        characterWriteRepository: CharacterWriteRepositoryInterface,
        playerReadRepository: PlayerReadRepositoryInterface,
    ) {
        this.#characterWriteRepository = characterWriteRepository;
        this.#playerReadRepository = playerReadRepository;
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
        const player = await this.#playerReadRepository.read(playerId);
        player.playerCanCreateCharacterOrDie(createdCharacter);

        return await this.#characterWriteRepository.create(createdCharacter);
    }
}
