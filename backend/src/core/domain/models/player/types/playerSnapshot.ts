import CharacterSnapshotType from '../../character/types/characterSnapshot';

type PlayerSnapShotType = {
    readonly id: string;
    readonly characters: CharacterSnapshotType[];
};

export default PlayerSnapShotType;
