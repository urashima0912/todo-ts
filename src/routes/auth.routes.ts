import { Router } from "express";
import controllers from "../controllers";

const router: Router = Router();

router.post("/auth/signin", controllers.user.signIn);
router.post("/auth/signup", controllers.user.signUp);

export default router;
