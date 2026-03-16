import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./utils/connectDb.js";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/genrate.route.js";
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";

import { stripeWebhook } from "./controllers/credits.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------------------
CORS Middleware
---------------------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://notes-ai-kappa-gules.vercel.app",
  "https://notes-alwkbrigm-chaithanyareddy322s-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {

      // allow requests with no origin (mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      // allow whitelisted domains
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // allow any vercel preview deployment
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

/* ---------------------------
Stripe Webhook
MUST come before express.json()
---------------------------- */

app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

/* ---------------------------
Middleware
---------------------------- */

app.use(express.json());
app.use(cookieParser());

/* ---------------------------
Health Check Route
---------------------------- */

app.get("/", (req, res) => {
  res.json({ message: "ExamNotes AI Backend Running 🚀" });
});

/* ---------------------------
API Routes
---------------------------- */

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit", creditRouter);

/* ---------------------------
Start Server
---------------------------- */

app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  await connectDb();
});