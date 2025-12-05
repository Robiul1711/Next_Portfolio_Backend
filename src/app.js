import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(("/", (req, res) => res.send("OK")));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/contact", contactRoutes);

export default app;
