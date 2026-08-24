import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import contactRoutes from "./routes/contact.routes.js"
import contactInfoRoutes from "./routes/contactInfo.routes.js";
import footerRoutes from "./routes/footer.routes.js"
import aiRoute from "./routes/aiChat.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).json({ message: "Welcome to my Portfolio API" }));
// Routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", skillRoutes);
app.use("/api", experienceRoutes);
app.use("/api", resumeRoutes);
app.use("/api", analyticsRoutes);
app.use("/api", contactRoutes);
app.use("/api", contactInfoRoutes);
app.use("/api", footerRoutes);
app.use("/api/chat", aiRoute);
app.use("/api/blogs", blogRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/contact", contactRoutes);

export default app;
