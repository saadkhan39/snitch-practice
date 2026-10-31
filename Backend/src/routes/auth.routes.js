import express from "express";
import {register , login} from "../controllers/auth.controller.js"
import {validateRegisterUser, validateLoginUser} from "../validator/auth.validator.js"

const router = express.Router();


router.post("/register",validateRegisterUser,register)

router.post("/login",validateLoginUser,login)


export default router