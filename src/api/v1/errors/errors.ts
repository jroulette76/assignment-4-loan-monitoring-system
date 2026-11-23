import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Base error class for application errors.
 */
export class AppError extends Error {
    constructor(
        public message: string,
        public code: string,
        public statusCode: number,
    ) {
        super(message);

        this.name = this.constructor.name;

        Object.setPrototypeOf(this, new.target.prototype);

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Repository/database errors.
 */
export class RepositoryError extends AppError {
    constructor(
        message: string,
        code: string,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ) {
        super(message, code, statusCode);
    }
}

/**
 * Business logic errors.
 */
export class ServiceError extends AppError {
    constructor(
        message: string,
        code: string = "SERVICE_ERROR",
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ) {
        super(message, code, statusCode);
    }
}

/**
 * Authentication errors.
 */
export class AuthenticationError extends AppError {
    constructor(
        message: string,
        code: string = "AUTHENTICATION_ERROR",
        statusCode: number = HTTP_STATUS.UNAUTHORIZED,
    ) {
        super(message, code, statusCode);
    }
}

/**
 * Authorization errors.
 */
export class AuthorizationError extends AppError {
    constructor(
        message: string,
        code: string = "AUTHORIZATION_ERROR",
        statusCode: number = HTTP_STATUS.FORBIDDEN,
    ) {
        super(message, code, statusCode);
    }
}