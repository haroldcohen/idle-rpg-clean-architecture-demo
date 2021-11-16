import express from 'express';
import charactersRouter from '../../adapters/primaries/REST/characters/characters';

const app = express();

app.use(express.json());
app.use('/api/characters', charactersRouter);

export default app;
