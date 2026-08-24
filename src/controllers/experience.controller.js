import Experience from "../models/Experience.js";

const DEFAULT_EXPERIENCES = [
  {
    type: "Experience",
    year: "2024 - Present",
    title: "Frontend Developer",
    company: "Btopia, Softvence Alpha (Mohakhali)",
    location: "Mohakhali, Dhaka",
    description:
      "Architecting responsive web applications with React.js and Next.js. Leading the integration of secure JWT authentication and complex state management using Redux and Context API within MERN stack environments.",
    skills: ["React.js", "Next.js", "JWT", "Redux", "MERN Stack"],
    status: "Current",
    order: 1,
  },
  {
    type: "Experience",
    year: "2023 - 2024",
    title: "MERN Stack Specialist (Training)",
    company: "Creative IT Institute",
    location: "Dhaka",
    description:
      "Completed a comprehensive one-year professional training program. Mastered full-stack architecture, focusing on building scalable MongoDB schemas and robust Node/Express backends.",
    skills: ["MongoDB", "Express.js", "Node.js", "Rest API"],
    status: "Completed",
    order: 2,
  },
  {
    type: "Experience",
    year: "2022 - 2024",
    title: "Guest Teacher (Science)",
    company: "Government Polytechnic Institute (Faridpur)",
    location: "Faridpur",
    description:
      "Taught Chemistry and Physics to diploma-level students. Improved academic outcomes by translating complex theoretical concepts into practical, real-world engineering applications.",
    skills: ["Physics", "Chemistry", "Analytical Thinking", "Mentorship"],
    status: "Completed",
    order: 3,
  },
  {
    type: "Education",
    year: "2023",
    title: "M.Sc. in Chemistry",
    company: "National University Govt. Rajendra College",
    location: "Faridpur",
    description:
      "Graduated with a Master of Science, developing strong analytical research skills and a methodical approach to problem-solving that now informs my software debugging and architecture.",
    skills: ["Analytical Chemistry", "Research", "Scientific Method"],
    status: "Completed",
    order: 4,
  },
];

export const getAllExperiences = async (req, res) => {
  try {
    let list = await Experience.find().sort({ order: 1, createdAt: -1 });

    if (list.length === 0) {
      await Experience.insertMany(DEFAULT_EXPERIENCES);
      list = await Experience.find().sort({ order: 1, createdAt: -1 });
    }

    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const newExp = await Experience.create(req.body);
    res.status(201).json({ success: true, message: "Experience added successfully", data: newExp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Experience.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }
    res.status(200).json({ success: true, message: "Experience updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Experience.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }
    res.status(200).json({ success: true, message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
