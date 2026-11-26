import { Request, Response, NextFunction } from "express";
import errorHandler from "../src/api/v1/middleware/errorHandler";
import { AuthenticationError } from "../src/api/v1/errors/errors";

describe("Error Handler Middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {

        // Arrange
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();

        mockRequest = {};

        mockResponse = {
            status: statusMock,
            json: jsonMock,
        };

        nextFunction = jest.fn();
    });

    it("should return UNKNOWN_ERROR when no error object is provided", () => {

        // Act
        errorHandler(
            null,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction,
        );

        // Assert
        expect(statusMock)
            .toHaveBeenCalledWith(500);

        expect(jsonMock)
            .toHaveBeenCalled();
    });

    it("should return AppError status code and error details", () => {

        // Arrange
        const error = new AuthenticationError(
            "Unauthorized",
            "TOKEN_INVALID",
        );

        // Act
        errorHandler(
            error,
            mockRequest as Request,
            mockResponse as Response,
            nextFunction as NextFunction,
        );

        // Assert
        expect(statusMock)
            .toHaveBeenCalledWith(401);

        expect(jsonMock)
            .toHaveBeenCalled();
    });
});