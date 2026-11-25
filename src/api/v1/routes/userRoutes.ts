import express, { Router } from "express";
import { getUserDetails } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * Only admins can retrieve user details.
 */
router.get(
    "/:id",
    authenticate,
    isAuthorized({
        hasRole: ["admin"],
    }),
    getUserDetails,
);

export default router;