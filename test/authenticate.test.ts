import { Request, Response, NextFunction } from "express";
jest.mock("../src/config/firebaseConfig", () => ({ auth: { verifyIdToken: jest.fn() } }));
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../src/config/firebaseConfig";
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

    it("should pass AuthenticationError to next when token is invalid", async () => {

        // Arrange
        mockRequest.headers = {
            authorization: "Bearer invalid-token",
        };

        (auth.verifyIdToken as jest.Mock)
            .mockRejectedValueOnce(
                new Error("Invalid token"),
            );

        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction,
        );

        // Assert
        expect(auth.verifyIdToken)
            .toHaveBeenCalledWith(
                "invalid-token",
            );

        const error =
            nextFunction.mock.calls[0][0];

        expect(error)
            .toBeInstanceOf(AuthenticationError);
    });
});