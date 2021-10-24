import { Request, Response, Router } from 'express';
import ICreateACharacter from '../../../../core/useCases/character/ICreateACharacter';

const charactersRouter = Router();

charactersRouter.post('/', async (req: Request, res: Response) => {
    res.status(200);
    const { name, healthPoints, attackPoints, defensePoints, magikPoints } = req.body;
    const iCreateACharacter = new ICreateACharacter();

    return res.json({});
});

export default charactersRouter;
