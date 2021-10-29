import { Request, Response, Router } from 'express';
import container from '../../../../configuration/injection/inversify.config';
import TYPES from '../../../../configuration/injection/types';
import ICreateACharacter from '../../../../core/useCases/character/ICreateACharacter';
import {
    CharacterRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterRepositoryInterface';
import ICreateACharacterCommand
    from '../../../../core/useCases/character/types/ICreateACharacterCommand';
import { PlayerRepositoryInterface } from '../../../../core/useCases/player/interfaces/playerRepositoryInterface';
import CharacterPresenter from '../../presenters/characters/characterPresenter';

const charactersRouter = Router();

charactersRouter.put('/', async (req: Request, res: Response) => {
    const { playerId, name, healthPoints, attackPoints, defensePoints, magikPoints } = req.body;
    const characterRepository = container.get<CharacterRepositoryInterface>(TYPES.CharacterRepositoryInterface);
    const playerRepository = container.get<PlayerRepositoryInterface>(TYPES.PlayerRepositoryInterface);
    const iCreateACharacterExecutionParameters: ICreateACharacterCommand = {
        name,
        healthPoints,
        attackPoints,
        defensePoints,
        magikPoints,
    };
    try {
        const createdCharacter = await new ICreateACharacter(characterRepository, playerRepository)
            .execute(playerId, iCreateACharacterExecutionParameters);
        res.status(200);

        return res.json(CharacterPresenter.present(createdCharacter));
    } catch (e) {
        res.status(500);

        return res.json({
            errorMessage: e.message,
        });
    }
});

export default charactersRouter;
