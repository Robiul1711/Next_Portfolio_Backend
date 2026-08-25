import Contact from "../models/Contact.js";
import { sendContactEmails } from "../utils/sendEmail.js";

export const createContactMessage = async (req, res) => {
  try {
    const newMessage = await Contact.create(req.body);

    // Asynchronously send notification and auto-reply without blocking response
    sendContactEmails(req.body).catch((err) =>
      console.error("Email send error:", err.message)
    );

    // Asynchronously trigger n8n automation webhook (Telegram, Sheets, CRM)
    const n8nWebhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...req.body,
          createdAt: newMessage.createdAt || new Date(),
        }),
      }).catch((err) =>
        console.error("n8n Webhook send error:", err.message)
      );
    }

    res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Contact message not found" });
    }
    res.status(200).json({ success: true, message: "Contact message deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
