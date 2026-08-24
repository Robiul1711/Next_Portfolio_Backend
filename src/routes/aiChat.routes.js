import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/Chat.js";
import { portfolioContext, portfolioKnowledgeBase } from "../dataStore/portfolioData.js";

dotenv.config();

const router = express.Router();

// Smart Local Fallback Response Engine
function generateSmartFallbackResponse(userQuestion) {
  const q = userQuestion.toLowerCase().trim();

  // 1. Greetings
  if (/^(hi|hello|hey|salam|assalamu alaikum|good morning|good evening|yo)/i.test(q)) {
    return "Hello! 👋 I'm Ashiq's AI Assistant. How can I help you today? Feel free to ask about my skills, projects, experience, or hiring availability!";
  }

  // 2. Skills / Tech Stack
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("framework") || q.includes("language") || q.includes("react") || q.includes("next")) {
    return "Ashiq specializes in the MERN Stack and Next.js ecosystem! Core skills include: React.js, Next.js 15, Node.js, Express, MongoDB, TypeScript, Supabase, Tailwind CSS, and n8n workflow automation.";
  }

  // 3. Projects
  if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("app") || q.includes("build")) {
    return "Ashiq has developed notable full-stack applications including SaaS platforms, E-commerce systems, AI chatbots, and high-performance web applications. You can explore full live demos in the Featured Projects section!";
  }

  // 4. Experience / Background
  if (q.includes("experience") || q.includes("background") || q.includes("job") || q.includes("company") || q.includes("history")) {
    return "Ashiq is currently working as a Frontend Developer at Btopia / Softvence Alpha, building scalable React/Next.js architectures. He previously completed intensive MERN stack training at Creative IT and holds an M.Sc. in Chemistry.";
  }

  // 5. Contact / Hire / Email / Phone
  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("freelance") || q.includes("call") || q.includes("reach") || q.includes("available")) {
    return "Ashiq is currently open to full-time engineering roles and freelance opportunities! You can contact him directly via email at robiulislam1711@gmail.com, or use the Contact Form on this site.";
  }

  // 6. Resume / CV
  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return "You can download Ashiq's updated resume directly using the 'Download Resume' button on the homepage banner or pressing Ctrl+K / Cmd+K!";
  }

  // 7. Keyword matching from Knowledge Base
  for (const item of portfolioKnowledgeBase) {
    if (item.tags.some((tag) => q.includes(tag.toLowerCase()))) {
      return item.answer;
    }
  }

  return "I'm here to help you learn more about Robiul Islam Ashiq! You can ask me about his technical skills, projects, work experience, or how to get in touch.";
}

router.post("/", async (req, res) => {
  try {
    const { message, chatId, userId = "default" } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    let chat = chatId ? await Chat.findById(chatId) : new Chat({ userId });
    if (!chat) {
      chat = new Chat({ userId });
    }

    // Append user message
    chat.messages.push({ role: "user", content: message });

    let aiReply = "";

    // Try Gemini API if key exists
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: portfolioContext,
        });

        // Format history
        const contents = chat.messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const result = await model.generateContent({ contents });
        aiReply = result.response.text();
      } catch (geminiError) {
        console.warn("⚠️ Gemini API error, switching to smart local fallback:", geminiError.message);
        aiReply = generateSmartFallbackResponse(message);
      }
    } else {
      aiReply = generateSmartFallbackResponse(message);
    }

    // Append assistant reply
    chat.messages.push({ role: "assistant", content: aiReply });
    await chat.save();

    res.json({
      reply: aiReply,
      chatId: chat._id,
    });
  } catch (error) {
    console.error("AI Chat Controller Error:", error);
    // Even if database or unexpected error occurs, provide a safe friendly response
    const fallback = generateSmartFallbackResponse(req.body?.message || "hi");
    res.json({
      reply: fallback,
      chatId: req.body?.chatId || null,
    });
  }
});

export default router;
