import express from "express";

import {
  resetDB,
  sortUp,
  sortDown,
  priceKG,
  priceKGSortUp,
  priceKGSortDown,
  search,
  updateProduct,
} from "../controllers/db.controllers.js";

const router = express.Router();

router.get("/reset", resetDB);
router.get("/sortUp", sortUp);
router.get("/sortDown", sortDown);
router.get("/pricePerKG", priceKG);
router.get("/pricePerKGsortUp", priceKGSortUp);
router.get("/pricePerKGsortDown", priceKGSortDown);
router.get("/search", search);
router.put("/edit/:id", updateProduct);

export default router;
