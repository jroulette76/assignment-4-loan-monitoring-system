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

/**
 * Creates a new loan application.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const createLoanHandler = (
    req: Request,
    res: Response,
): void => {
    const { applicant, amount } = req.body;

    const newLoan = {
        id: loanApplications.length + 1,
        applicant,
        amount,
        status: "pending",
        createdAt: new Date().toISOString(),
    };

    loanApplications.push(newLoan);

    res.status(201).json({
        message: "Loan application created",
        data: newLoan,
    });
};

/**
 * Updates an existing loan application.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const updateLoanHandler = (
    req: Request,
    res: Response,
): void => {
    const loanId: number = Number(req.params.id);
    const { status } = req.body;

    const loan = loanApplications.find(
        (application) => application.id === loanId,
    );

    if (!loan) {
        res.status(404).json({
            message: "Loan application not found",
        });

        return;
    }

    loan.status = status;

    res.status(200).json({
        message: "Loan application updated",
        data: loan,
    });
};

/**
 * Deletes a loan application.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const deleteLoanHandler = (
    req: Request,
    res: Response,
): void => {
    const loanId: number = Number(req.params.id);

    const loanIndex = loanApplications.findIndex(
        (application) => application.id === loanId,
    );

    if (loanIndex === -1) {
        res.status(404).json({
            message: "Loan application not found",
        });

        return;
    }

    loanApplications.splice(loanIndex, 1);

    res.status(200).json({
        message: "Loan application deleted",
    });
};