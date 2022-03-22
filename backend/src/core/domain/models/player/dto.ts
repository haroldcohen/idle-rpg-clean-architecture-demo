import CharacterDto from '../character/dto';

export default class PlayerDto {
    readonly id: string;

    readonly characters: CharacterDto[];

    public constructor(
        {
            id,
            characters,
        }: {
            id: string,
            characters: CharacterDto[],
        },
    ) {
        this.id = id;
        this.characters = characters;
    }
}