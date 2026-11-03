import express from "express";
import {register , login, getMe, googleCallback} from "../controllers/auth.controller.js"
import {validateRegisterUser, validateLoginUser} from "../validator/auth.validator.js"
import passport from "passport";
import { config } from "../config/config.js";

const router = express.Router();


router.post("/register",validateRegisterUser,register)

router.post("/login",validateLoginUser,login)

router.get("/get-me",getMe)

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: config.NODE_ENV === 'production' ? 'http://localhost:5173/login' : '/login',
   }),
   googleCallback
);




export default router