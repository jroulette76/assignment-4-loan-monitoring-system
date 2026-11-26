import { Request, Response, NextFunction } from "express";
import isAuthorized from "../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../src/api/v1/errors/errors";

describe("Authorization Middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {

        // Arrange
        // Create mock request, response, and next function.

        mockRequest = {
            params: {},
        };

        mockResponse = {
            locals: {},
        };

        nextFunction = jest.fn();
    });

    it("should call next when user has required role", () => {

        // Arrange
        mockResponse.locals = {
            uid: "batman204",
            role: "admin",
        };

        const middleware = isAuthorized({
            hasRole: ["admin", "manager"],
        });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction,
        );

        // Assert
        expect(nextFunction)
            .toHaveBeenCalledWith();
    });

    it("should pass AuthorizationError to next when role is missing", () => {

        // Arrange
        mockResponse.locals = {
            uid: "superman204",
        };

        const middleware = isAuthorized({
            hasRole: ["admin"],
        });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction,
        );

        // Assert
        const error =
            nextFunction.mock.calls[0][0];

        expect(error)
            .toBeInstanceOf(AuthorizationError);

        expect(error.code)
            .toBe("ROLE_NOT_FOUND");
    });
});