import { Router } from "express";
import controllers from "../controllers";

import passport from "passport";

const router: Router = Router();

router.post(
  "/task/create",
  passport.authenticate("jwt", { session: false }),
  controllers.task.create
);
router.get(
  "/task/all/:userId",
  passport.authenticate("jwt", { session: false }),
  controllers.task.all
);
router.get(
  "/task/get/:id",
  passport.authenticate("jwt", { session: false }),
  controllers.task.get
);
router.put(
  "/task/update/:id",
  passport.authenticate("jwt", { session: false }),
  controllers.task.update
);
router.delete(
  "/task/remove/:id",
  passport.authenticate("jwt", { session: false }),
  controllers.task.remove
);

export default router;
