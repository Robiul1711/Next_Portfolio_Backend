import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Experience", "Education"],
      default: "Experience",
    },
    title: { type: String, required: true }, // e.g. Frontend Developer or M.Sc. in Chemistry
    company: { type: String, required: true }, // Company name or University
    location: { type: String, default: "" },
    year: { type: String, required: true }, // e.g. "2024 - Present" or "2023"
    description: { type: String, required: true },
    skills: [{ type: String }], // Array of tech tags
    status: { type: String, default: "Completed" }, // "Current" or "Completed"
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
