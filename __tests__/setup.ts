import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './integration/mocks/server';

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});
