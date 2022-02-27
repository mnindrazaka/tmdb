import "@testing-library/jest-dom";
import "whatwg-fetch";
import "regenerator-runtime/runtime";
import { server } from "./src/client/mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
