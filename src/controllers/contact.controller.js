import Contact from "../models/Contact.js";

export const createContactMessage = async (req, res) => {
  try {
    const newMessage = await Contact.create(req.body);
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
