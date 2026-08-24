import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "DevOps/Tools", "Languages", "Other"],
      default: "Frontend",
    },
    level: { type: Number, min: 0, max: 100, default: 85 }, // Proficiency percentage
    color: { type: String, default: "#06B6D4" }, // Hex color code for badges/orbits
    iconName: { type: String, default: "Code" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
