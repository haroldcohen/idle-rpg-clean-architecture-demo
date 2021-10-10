import Character from '../../domain/models/character/character';
import Player from '../../domain/models/player/player';
import { CharacterRepositoryInterface } from './interfaces/characterRepositoryInterface';

export default class ICreateACharacter {
    #characterRepository: CharacterRepositoryInterface;

    constructor(characterRepository: CharacterRepositoryInterface) {
        this.#characterRepository = characterRepository;
    }

    async execute(
        player: Player,
        { name } : { name: string },
    ): Promise<Character> {
        const createdCharacter = new Character({ name });
        player.createCharacter(createdCharacter);
        this.#characterRepository.create(createdCharacter, player.id);

        return createdCharacter;
    }
}
