import { Request, Response, Router } from 'express';
import container from '../../../../configuration/injection/inversify.config';
import TYPES from '../../../../configuration/injection/types';
import ICreateACharacter from '../../../../core/useCases/character/ICreateACharacter';
import {
    CharacterWriteRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterWriteRepositoryInterface';
import ICreateACharacterCommand
    from '../../../../core/useCases/character/types/ICreateACharacterCommand';
import {
    PlayerReadRepositoryInterface,
} from '../../../../core/useCases/player/interfaces/playerReadRepositoryInterface';
import CharacterPresenter from '../../presenters/characters/characterPresenter';

const charactersRouter = Router();

charactersRouter.put('/', async (req: Request, res: Response) => {
    const { playerId, name, healthPoints, attackPoints, defensePoints, magikPoints } = req.body;
    const characterWriteRepository = container
        .get<CharacterWriteRepositoryInterface>(TYPES.CharacterWriteRepositoryInterface);
    const playerReadRepository = container
        .get<PlayerReadRepositoryInterface>(TYPES.PlayerReadRepositoryInterface);
    const command: ICreateACharacterCommand = {
        name,
        healthPoints,
        attackPoints,
        defensePoints,
        magikPoints,
        playerId,
    };
    try {
        const createdCharacter = await new ICreateACharacter(characterWriteRepository, playerReadRepository)
            .execute(command);
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
