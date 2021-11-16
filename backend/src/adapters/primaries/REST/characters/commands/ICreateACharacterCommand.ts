import { DataTransferObject, IsString, IsInt } from 'data-transfer-object';
import ICreateACharacterCommandType
    from '../../../../../core/useCases/character/types/ICreateACharacterCommand';

export default class ICreateACharacterCommand extends DataTransferObject implements ICreateACharacterCommandType {
    @IsString()
    name!: string;

    @IsInt()
    healthPoints!: number;

    @IsInt()
    attackPoints!: number;

    @IsInt()
    defensePoints!: number;

    @IsInt()
    magikPoints!: number;

    @IsString()
    playerId!: string;
}
