import express from "express"
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import morgan from "morgan"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.get("/", (req, res) => {
  res.send("Hello, World!")
})
app.use(cookieParser())

//routes
app.use("/api/auth", authRoutes)


export default app