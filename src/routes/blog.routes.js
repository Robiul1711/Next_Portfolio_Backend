import express from 'express';
// 1. Import the correct function names matching your controller
import { 
  getBlogs, 
  generateAndCreateBlog, 
  updateBlog, 
  deleteBlog,
  clapBlog,
} from '../controllers/blog.controller.js'; 

const router = express.Router();

// GET all blogs
router.get('/', getBlogs);

// POST a new blog (AI Generation)
// 2. Use the new function name here
router.post('/', generateAndCreateBlog);

// Clap / React to a blog
router.post('/:id/clap', clapBlog);

// PUT (Update) - Requires an ID
router.put('/:id', updateBlog);

// DELETE (Remove) - Requires an ID
router.delete('/:id', deleteBlog);

export default router;