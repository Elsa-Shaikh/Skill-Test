import express from "express";
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
} from "../controllers/userController.js";
import upload from "../middleware/multerMiddleware.js";

const router = new express.Router();

router.post("/create", upload.single("picture"), createUser);
router.put("/edit/:id", upload.single("picture"), editUser);
router.get("/getUser", getUser);
router.delete("/delete/:id", deleteUser);

export default router;
