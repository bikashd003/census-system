import { SaveCensus, GetCensus,getVaccinatedData,getGenderData } from "../Controllers/Census.controller.js"
import { Router } from "express";
const router = Router();

router.post("/save-census", SaveCensus);
router.get("/get-census", GetCensus);
router.get("/count", getVaccinatedData);
router.get("/gender", getGenderData);
export default router;