import express, { Router } from "express";
import { getLoansHandler } from "../controllers/loanController";

const router: Router = express.Router();

router.get("/", getLoansHandler);

export default router;