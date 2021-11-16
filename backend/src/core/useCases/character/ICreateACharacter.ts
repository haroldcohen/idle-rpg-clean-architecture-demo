import Character from '../../domain/models/character/character';
import CharacterSnapshotType from '../../domain/models/character/types/characterSnapshot';
import { PlayerReadRepositoryInterface } from '../player/interfaces/playerReadRepositoryInterface';
import { CharacterWriteRepositoryInterface } from './interfaces/characterWriteRepositoryInterface';
import ICreateACharacterCommandType from './types/ICreateACharacterCommand';

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
        command: ICreateACharacterCommandType,
    ): Promise<CharacterSnapshotType> {
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
        characterToCreate.levelUpSkills(
            healthPoints,
            attackPoints,
            defensePoints,
            magikPoints,
        );
        const player = await this.#playerReadRepository.read(playerId);
        player.canCreateCharacterOrThrow(characterToCreate.snapshot());

        await this.#characterWriteRepository.create(characterToCreate.snapshot());

        return characterToCreate.snapshot();
    }
}
