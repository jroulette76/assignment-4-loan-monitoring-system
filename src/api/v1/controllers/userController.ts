// External library imports
import { Request, Response, NextFunction } from "express";
import { UserRecord } from "firebase-admin/auth";

// Internal module imports
import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Retrieves user details from Firebase Authentication.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export const getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const id: string = req.params.id as string;

    try {
        const user: UserRecord =
            await auth.getUser(id);

        res.status(HTTP_STATUS.OK)
            .json(successResponse(user));
    } catch (error) {
        next(error);
    }
};