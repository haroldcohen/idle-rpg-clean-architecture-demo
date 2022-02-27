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
            skillPoints: number,
            healthPoints: number,
            attackPoints: number,
            defensePoints: number,
            magikPoints: number,
            playerId: string,
        },
    ) {
        this.id = id;
        this.characters = characters;
    }
}