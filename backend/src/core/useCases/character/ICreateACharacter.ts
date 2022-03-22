import Character from '../../domain/models/character/character';
import CharacterDto from '../../domain/models/character/dto';
import { Uuid4GeneratorInterface } from '../common/interfaces/uuid4GeneratorInterface';
import { PlayerReadRepositoryInterface } from '../player/interfaces/playerReadRepositoryInterface';
import { PlayerWriteRepositoryInterface } from '../player/interfaces/playerWriteRepositoryInterface';
import ICreateACharacterCommandType from './types/ICreateACharacterCommand';

export default class ICreateACharacter {
    #playerReadRepository: PlayerReadRepositoryInterface;

    #playerWriteRepository: PlayerWriteRepositoryInterface;

    #uuid4Generator: Uuid4GeneratorInterface;

    constructor(
        playerReadRepository: PlayerReadRepositoryInterface,
        playerWriteRepository: PlayerWriteRepositoryInterface,
        uuid4Generator: Uuid4GeneratorInterface,
    ) {
        this.#playerReadRepository = playerReadRepository;
        this.#playerWriteRepository = playerWriteRepository;
        this.#uuid4Generator = uuid4Generator;
    }

    async execute(
        command: ICreateACharacterCommandType,
    ): Promise<CharacterDto> {
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
        player.addCharacter(characterToCreate);

        await this.#playerWriteRepository.update(player.toDto());

        return characterToCreate.toDto();
    }
}
