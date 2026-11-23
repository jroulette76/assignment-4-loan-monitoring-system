import { LoanApplication } from "./loanApplication";

export const loanApplications: LoanApplication[] = [
    {
        id: 1,
        applicant: "Bruce Wayne",
        amount: 50000,
        status: "under_review",
        createdAt: "2025-01-10T10:00:00.000Z",
    },
    {
        id: 2,
        applicant: "Clark Kent",
        amount: 150000,
        status: "under_review",
        createdAt: "2025-01-08T10:00:00.000Z",
    },
    {
        id: 3,
        applicant: "Peter Parker",
        amount: 500000,
        status: "pending",
        createdAt: "2025-01-05T10:00:00.000Z",
    },
    {
        id: 4,
        applicant: "Diana Prince",
        amount: 1000000,
        status: "flagged",
        createdAt: "2025-01-03T10:00:00.000Z",
    },
];