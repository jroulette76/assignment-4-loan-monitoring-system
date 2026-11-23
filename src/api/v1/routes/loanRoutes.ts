import express, { Router } from "express";
import { 
    getLoansHandler, 
    getLoanByIdHandler,
    createLoanHandler,
} from "../controllers/loanController";

const router: Router = express.Router();

router.get("/", getLoansHandler);

router.get("/:id", getLoanByIdHandler);

router.post("/", createLoanHandler);

export default router;