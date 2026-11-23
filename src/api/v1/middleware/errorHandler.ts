import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse } from "../models/responseModel";

/**
 * Global error handling middleware.
 */
const errorHandler = (
    err: Error | null,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    if (!err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse(
                "An unexpected error occurred",
                "UNKNOWN_ERROR",
            ),
        );

        return;
    }

    if (err instanceof AppError) {
        res.status(err.statusCode).json(
            errorResponse(
                err.message,
                err.code,
            ),
        );

        return;
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
        errorResponse(
            "An unexpected error occurred",
            "UNKNOWN_ERROR",
        ),
    );
};

export default errorHandler;