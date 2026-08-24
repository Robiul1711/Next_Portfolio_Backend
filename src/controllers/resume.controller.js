import Resume from "../models/Resume.js";

const DEFAULT_RESUME = {
  title: "Robiul Islam Ashiq - Full Stack Developer CV",
  resumeUrl: "https://drive.google.com/file/d/1YB6dyTDSrI1PcucDpxJZsw7KNvL2S1m4/view?usp=sharing",
  version: "2026.1",
  isAvailableForHire: true,
};

export const getResume = async (req, res) => {
  try {
    let resume = await Resume.findOne();
    if (!resume) {
      resume = await Resume.create(DEFAULT_RESUME);
    }
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).json({
      success: true,
      message: "Resume settings updated successfully",
      data: resume,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
