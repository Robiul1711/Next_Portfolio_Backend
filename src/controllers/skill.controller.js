import Skill from "../models/Skill.js";

const DEFAULT_SKILLS = [
  { name: "React.js", category: "Frontend", level: 95, color: "#61DAFB", iconName: "SiReact", order: 1 },
  { name: "Next.js", category: "Frontend", level: 90, color: "#FFFFFF", iconName: "SiNextdotjs", order: 2 },
  { name: "TypeScript", category: "Languages", level: 85, color: "#3178C6", iconName: "SiTypescript", order: 3 },
  { name: "Node.js", category: "Backend", level: 88, color: "#339933", iconName: "SiNodedotjs", order: 4 },
  { name: "MongoDB", category: "Database", level: 85, color: "#47A248", iconName: "SiMongodb", order: 5 },
  { name: "Supabase", category: "Database", level: 86, color: "#3ECF8E", iconName: "SiSupabase", order: 6 },
  { name: "n8n Automation", category: "DevOps/Tools", level: 84, color: "#EA4B71", iconName: "SiN8N", order: 7 },
  { name: "Tailwind CSS", category: "Frontend", level: 94, color: "#06B6D4", iconName: "SiTailwindcss", order: 8 },
];

export const getAllSkills = async (req, res) => {
  try {
    let skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    
    // Auto-seed if empty
    if (skills.length === 0) {
      await Skill.insertMany(DEFAULT_SKILLS);
      skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    }

    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const newSkill = await Skill.create(req.body);
    res.status(201).json({ success: true, message: "Skill added successfully", data: newSkill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Skill.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }
    res.status(200).json({ success: true, message: "Skill updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Skill.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }
    res.status(200).json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
