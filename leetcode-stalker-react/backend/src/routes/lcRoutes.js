import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  listProfiles,
  addProfile,
  deleteProfile,
  refreshProfile,
} from "../controllers/lcController.js";

const router = express.Router();

router.use(authenticate);

router.get("/home", listProfiles);
router.post("/add/:username", addProfile);
router.delete("/delete/:username", deleteProfile);
router.post("/refresh/:username", refreshProfile);

export default router;
