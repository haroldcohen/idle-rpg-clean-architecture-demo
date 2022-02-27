import { Uuid4GeneratorInterface } from "../../../src/core/useCases/common/interfaces/uuid4GeneratorInterface";

export default class StubUuid4Generator implements Uuid4GeneratorInterface {
    generate(): string {
        return "6c5626a2-6a0d-42df-b498-a4aa5fc2d856"
    }
}