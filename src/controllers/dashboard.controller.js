import Project from "../models/Project.js";
import Blog from "../models/Blog.js";
import Contact from "../models/Contact.js";
import Chat from "../models/Chat.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProjects,
      popularProjectsCount,
      totalBlogs,
      totalContacts,
      totalChats,
      recentProjects,
      recentBlogs,
      recentContacts,
      allProjectsList,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ popular: true }),
      Blog.countDocuments(),
      Contact.countDocuments(),
      Chat.countDocuments(),
      Project.find().sort({ createdAt: -1 }).limit(4),
      Blog.find().sort({ createdAt: -1 }).limit(4),
      Contact.find().sort({ createdAt: -1 }).limit(5),
      Project.find({}, "technologies stack popular"),
    ]);

    const allTechs = new Set();
    allProjectsList.forEach((proj) => {
      if (Array.isArray(proj.technologies)) {
        proj.technologies.forEach((t) => t && allTechs.add(t.trim()));
      } else if (typeof proj.technologies === "string") {
        proj.technologies.split(",").forEach((t) => t && allTechs.add(t.trim()));
      }
    });

    res.status(200).json({
      success: true,
      stats: {
        totalProjects,
        popularProjects: popularProjectsCount,
        totalBlogs,
        totalContacts,
        totalChats,
        uniqueTechnologiesCount: allTechs.size,
      },
      recent: {
        projects: recentProjects,
        blogs: recentBlogs,
        contacts: recentContacts,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};
