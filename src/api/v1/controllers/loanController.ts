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

/**
 * Retrieves a loan application by ID.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const getLoanByIdHandler = (
    req: Request,
    res: Response,
): void => {
    const loanId: number = Number(req.params.id);

    const loan = loanApplications.find(
        (application) => application.id === loanId,
    );

    if (!loan) {
        res.status(404).json({
            message: "Loan application not found",
        });

        return;
    }

    res.status(200).json({
        message: "Loan application retrieved",
        data: loan,
    });
};