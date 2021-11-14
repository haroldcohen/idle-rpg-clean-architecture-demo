import Character from '../../domain/models/character/character';
import CharacterSnapshot from '../../domain/models/character/characterSnapshot';
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
        command: ICreateACharacterCommand,
    ): Promise<CharacterSnapshot> {
        const { name, healthPoints, attackPoints, defensePoints, magikPoints, playerId } = command;
        const characterToCreate = new Character({
            name,
            skillPoints: 12,
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            playerId,
        });
        characterToCreate.levelUpHealthPoints(healthPoints);
        characterToCreate.levelUpAttackPoints(attackPoints);
        characterToCreate.levelUpDefensePoints(defensePoints);
        characterToCreate.levelUpMagikPoints(magikPoints);
        const player = await this.#playerReadRepository.read(playerId);
        player.canCreateCharacterOrDie(characterToCreate.snapshot());

        await this.#characterWriteRepository.create(characterToCreate.snapshot());

        return characterToCreate.snapshot();
    }
}
