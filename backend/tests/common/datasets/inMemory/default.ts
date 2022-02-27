import InMemoryDataBase from '../../../../src/adapters/secondaries/inMemory/common/inMemoryDataBase';
import InMemoryPlayer from '../../../../src/adapters/secondaries/inMemory/player/inMemoryPlayer';

export default function defaultInMemoryDataBase(): InMemoryDataBase {
    return new InMemoryDataBase({
        players: [
            new InMemoryPlayer({
                id: '4962aec5-1481-4cdb-bdb7-6ea52efe6c88',
                charactersIds: [],
            })
        ],
        characters: [],
    });
}

