import express from "express";

import { resetDB } from "../controllers/db.controllers.js";

const router = express.Router();

router.get("/reset", resetDB);

export default router;
