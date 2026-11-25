import express, { Router } from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * Only admins can assign roles.
 */
router.post(
    "/setCustomClaims",
    authenticate,
    isAuthorized({
        hasRole: ["admin"],
    }),
    setCustomClaims,
);

export default router;
