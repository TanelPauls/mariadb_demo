import express from "express";

import { resetDB, sortUp, sortDown } from "../controllers/db.controllers.js";

const router = express.Router();

router.get("/reset", resetDB);
router.get("/sortUp", sortUp);
router.get("/sortDown", sortDown);

export default router;
