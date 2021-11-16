type CharacterSnapshotType = {
    readonly id: string;
    readonly name: string;
    readonly skillPoints: number;
    readonly healthPoints: number;
    readonly attackPoints: number;
    readonly defensePoints: number;
    readonly magikPoints: number;
    readonly level: number;
    readonly rank: number;
    readonly playerId: string;
}

export default CharacterSnapshotType;
