import Project from "../models/Project.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const data = req.body;

    // Convert technologies to array
    if (data.technologies) {
      data.technologies = data.technologies.split(",").map(item => item.trim());
    }

    // Image upload result
    if (req.file && req.file.path) {
      data.image = req.file.path; // Cloudinary URL
    }

    const newProject = new Project(data);
    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      project: newProject
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// GET ALL PROJECTS WITH SEARCH, FILTER, SORT
export const getProjects = async (req, res) => {
  try {
    const { search, tech, sort } = req.query;

    let query = {};

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by technology (WORKS FOR ARRAYS)
    if (tech) {
      query.technologies = {
        $elemMatch: { $regex: tech, $options: "i" }
      };
    }

    let projects = Project.find(query);

    // Sorting
    if (sort === "latest") projects = projects.sort({ createdAt: -1 });
    if (sort === "oldest") projects = projects.sort({ createdAt: 1 });
    if (sort === "az") projects = projects.sort({ title: 1 });
    if (sort === "za") projects = projects.sort({ title: -1 });

    const results = await projects;
    res.json(results);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE PROJECT
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Project updated successfully", updatedProject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

