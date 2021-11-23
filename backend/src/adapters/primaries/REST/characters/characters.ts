import { ValidationException } from 'data-transfer-object';
import { Request, Response, Router } from 'express';
import container from '../../../../configuration/injection/inversify.config';
import TYPES from '../../../../configuration/injection/types';
import CharacterException from '../../../../core/domain/models/character/exceptions/characterException';
import ICreateACharacter from '../../../../core/useCases/character/ICreateACharacter';
import {
    CharacterWriteRepositoryInterface,
} from '../../../../core/useCases/character/interfaces/characterWriteRepositoryInterface';
import {
    PlayerReadRepositoryInterface,
} from '../../../../core/useCases/player/interfaces/playerReadRepositoryInterface';
import CharacterPresenter from '../../presenters/characters/characterPresenter';
import ICreateACharacterCommand from './commands/ICreateACharacterCommand';

const charactersRouter = Router();

charactersRouter.put('/', async (req: Request, res: Response) => {
    const characterWriteRepository = container
        .get<CharacterWriteRepositoryInterface>(TYPES.CharacterWriteRepositoryInterface);
    const playerReadRepository = container
        .get<PlayerReadRepositoryInterface>(TYPES.PlayerReadRepositoryInterface);
    const command = new ICreateACharacterCommand(req.body);
    try {
        command.validate();
        const createdCharacter = await new ICreateACharacter(characterWriteRepository, playerReadRepository)
            .execute(command);
        res.status(200);

        return res.json(CharacterPresenter.present(createdCharacter));
    } catch (e) {
        if (e instanceof ValidationException) {
            res.status(400);

            const validationErrors = Object.keys(e.validationErrors).map(
                (v: string) => e.validationErrors[v].map((errors: string) => ` ${errors}`),
            );

            return res.json({
                errorMessage: `Invalid request:${validationErrors}`,
            });
        }
        if (e instanceof CharacterException) {
            res.status(400);

            return res.json({
                errorMessage: e.message,
            });
        }
        res.status(500);

        return res.json({
            errorMessage: 'An error occurred',
        });
    }
});

export default charactersRouter;
