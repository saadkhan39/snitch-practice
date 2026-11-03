import express from "express"
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.get("/", (req, res) => {
  res.send("Hello, World!")
})
app.use(cookieParser())

app.use(passport.initialize());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

//routes
app.use("/api/auth", authRoutes)


export default app