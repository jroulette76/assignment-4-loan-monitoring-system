import { Request, Response } from "express";
import { loanApplications } from "../models/loanData";

/**
 * Retrieves all loan applications.
 *
 * @param _req - Express request object.
 * @param res - Express response object.
 */
export const getLoansHandler = (
    _req: Request,
    res: Response,
): void => {
    res.status(200).json({
        message: "Loan applications retrieved",
        count: loanApplications.length,
        data: loanApplications,
    });
};