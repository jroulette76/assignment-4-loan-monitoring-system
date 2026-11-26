import { Request, Response, NextFunction } from "express";
import isAuthorized from "../src/api/v1/middleware/authorize";

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
            uid: "user123",
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
});