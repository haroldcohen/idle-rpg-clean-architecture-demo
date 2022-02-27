import { v4 } from 'uuid';
import { Uuid4GeneratorInterface } from '../../../core/useCases/common/interfaces/uuid4GeneratorInterface';

export default class Uuid4Generator implements Uuid4GeneratorInterface {
    generate(): string {
        return v4();
    }
}
