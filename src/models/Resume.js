import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Robiul Islam Ashiq - Full Stack Developer CV" },
    resumeUrl: {
      type: String,
      default: "https://drive.google.com/file/d/1YB6dyTDSrI1PcucDpxJZsw7KNvL2S1m4/view?usp=sharing",
    },
    version: { type: String, default: "2026.1" },
    isAvailableForHire: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
