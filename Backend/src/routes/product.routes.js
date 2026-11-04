import express from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import { validateCreateProduct } from "../validator/product.validator.js";
import multer  from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
})

const router = express.Router();

router.post("/",authenticateSeller,upload.array("images", 7),validateCreateProduct,createProduct);


export default router;