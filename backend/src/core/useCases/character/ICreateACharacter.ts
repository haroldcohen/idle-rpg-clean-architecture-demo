import Character from '../../domain/models/character/character';
import CharacterSnapshot from '../../domain/models/character/snapshot';
import { Uuid4GeneratorInterface } from '../common/interfaces/uuid4GeneratorInterface';
import { PlayerReadRepositoryInterface } from '../player/interfaces/playerReadRepositoryInterface';
import { CharacterWriteRepositoryInterface } from './interfaces/characterWriteRepositoryInterface';
import ICreateACharacterCommandType from './types/ICreateACharacterCommand';

export default class ICreateACharacter {
    #characterWriteRepository: CharacterWriteRepositoryInterface;

    #playerReadRepository: PlayerReadRepositoryInterface;

    #uuid4Generator: Uuid4GeneratorInterface;

    constructor(
        characterWriteRepository: CharacterWriteRepositoryInterface,
        playerReadRepository: PlayerReadRepositoryInterface,
        uuid4Generator: Uuid4GeneratorInterface,
    ) {
        this.#characterWriteRepository = characterWriteRepository;
        this.#playerReadRepository = playerReadRepository;
        this.#uuid4Generator = uuid4Generator;
    }

    async execute(
        command: ICreateACharacterCommandType,
    ): Promise<CharacterSnapshot> {
        const { name, healthPoints, attackPoints, defensePoints, magikPoints, playerId } = command;
        const characterToCreate = new Character({
            id: this.#uuid4Generator.generate(),
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
