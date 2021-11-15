type ICreateACharacterCommandType = {
    name: string;
    healthPoints: number;
    attackPoints: number;
    defensePoints: number;
    magikPoints: number;
    playerId: string;
}

export default ICreateACharacterCommandType;
