import { Request, Response, NextFunction } from "express";
jest.mock("../src/config/firebaseConfig", () => ({ auth: { verifyIdToken: jest.fn() } }));
import authenticate from "../src/api/v1/middleware/authenticate";
import { AuthenticationError } from "../src/api/v1/errors/errors";

describe("Authentication Middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {

        // Arrange
        // Create mock request, response, and next function.

        mockRequest = {
            headers: {},
        };

        mockResponse = {
            locals: {},
        };

        nextFunction = jest.fn();
    });

    it("should pass AuthenticationError to next when no token is provided", async () => {

        // Arrange
        // No authorization header is provided.

        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction,
        );

        // Assert
        const error =
            nextFunction.mock.calls[0][0];

        expect(error)
            .toBeInstanceOf(AuthenticationError);

        expect(error.code)
            .toBe("TOKEN_NOT_FOUND");
    });
});