import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Sets custom claims for a Firebase user.
 */
export const setCustomClaims = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const { uid, claims } = req.body;

    try {
        await auth.setCustomUserClaims(
            uid,
            claims,
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                {},
                `Custom claims set for user: ${uid}`,
            ),
        );
    } catch (error) {
        next(error);
    }
};