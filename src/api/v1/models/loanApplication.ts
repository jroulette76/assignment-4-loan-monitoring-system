/**
 * Represents a loan application in the monitoring system.
 */
export interface LoanApplication {
    id: number;
    applicant: string;
    amount: number;
    status: string;
    createdAt: string;
}