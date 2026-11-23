import express, { Router } from "express";
import { 
    getLoansHandler, 
    getLoanByIdHandler,
    createLoanHandler,
    updateLoanHandler,
} from "../controllers/loanController";

const router: Router = express.Router();

router.get("/", getLoansHandler);

router.get("/:id", getLoanByIdHandler);

router.post("/", createLoanHandler);

router.put("/:id", updateLoanHandler);

export default router;