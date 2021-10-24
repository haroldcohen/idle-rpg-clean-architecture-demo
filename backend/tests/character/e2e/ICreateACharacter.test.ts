import supertest, { Response } from 'supertest';
import app from "../../../src/configuration/app";
import ICreateACharacterExecutionParametersType
    from '../../../src/core/useCases/character/types/ICreateACharacterExecutionParametersType';
import PresentedCharacterInterface
    from '../../../src/adapters/primaries/presenters/characters/presentedCharacterInterface';

describe('POST /characters', () => {
    let expectedPresentedCharacter: PresentedCharacterInterface;
    let iCreateACharacterExecutionParameters: ICreateACharacterExecutionParametersType;

    beforeAll(async () => {
        expectedPresentedCharacter = {
            id: '',
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
            level: 1,
            rank: 1,
        };
        iCreateACharacterExecutionParameters = {
            name: 'Legolas',
            healthPoints: 10,
            attackPoints: 0,
            defensePoints: 0,
            magikPoints: 0,
        };
    });

    it('responds a presented character in JSON', async () => {
        await supertest(app)
            .post('/api/characters')
            .send(iCreateACharacterExecutionParameters)
            .expect(200)
            .then(async (res: Response) => {
                //expectedPresentedCharacter.id = res.body;
                expect(res.text).toEqual(expectedPresentedCharacter);
            });
    });
});