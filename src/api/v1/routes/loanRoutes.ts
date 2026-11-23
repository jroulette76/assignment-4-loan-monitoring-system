import express, { Router } from "express";
import { getLoansHandler, getLoanByIdHandler } from "../controllers/loanController";

const router: Router = express.Router();

router.get("/", getLoansHandler);

router.get("/:id", getLoanByIdHandler);

export default router;