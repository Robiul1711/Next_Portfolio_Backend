import nodemailer from "nodemailer";

const getTransporter = () => {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // true for port 465
    auth: { user, pass },
  });
};

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = getTransporter();
    const user = process.env.SMTP_USER || process.env.EMAIL_USER;

    if (!transporter || !user) {
      console.log(`ℹ️ Email skipped to ${to}: SMTP credentials not configured`);
      return;
    }

    await transporter.sendMail({
      from: `"Portfolio Support" <${user}>`,
      to,
      subject,
      html: html || text,
    });
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
  }
};

export const sendContactEmails = async ({ name, email, message, subject = "Portfolio Inquiry" }) => {
  try {
    const transporter = getTransporter();
    const user = process.env.SMTP_USER || process.env.EMAIL_USER;

    if (!transporter || !user) {
      console.log("ℹ️ Contact emails skipped: SMTP credentials not configured");
      return;
    }

    // 1. Send Alert to Robiul Islam Ashiq (Admin)
    const adminMailOptions = {
      from: `"Portfolio Contact Alert" <${user}>`,
      to: user,
      subject: `🚨 New Contact Message from ${name} - "${subject}"`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px;">
          <h2 style="color: #38bdf8; border-bottom: 1px solid #334155; padding-bottom: 12px; margin-top: 0;">New Portfolio Contact Message</h2>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; border-left: 4px solid #38bdf8; margin-top: 16px;">
            <p style="white-space: pre-wrap; margin: 0; color: #e2e8f0;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Sent from your Portfolio Website</p>
        </div>
      `,
    };

    // 2. Send Auto-Reply to Client / Visitor
    const clientMailOptions = {
      from: `"Robiul Islam Ashiq" <${user}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}! 👋`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; max-width: 600px; margin: auto;">
          <h2 style="color: #38bdf8; margin-top: 0;">Hi ${name},</h2>
          <p style="color: #cbd5e1; line-height: 1.6;">
            Thank you for contacting me through my portfolio. I have received your message regarding <strong>"${subject}"</strong>.
          </p>
          <p style="color: #cbd5e1; line-height: 1.6;">
            I usually review all inquiries and respond within <strong>24 hours</strong>. If your request is urgent, you can also reach me directly at <a href="mailto:robiulislam1711@gmail.com" style="color: #38bdf8;">robiulislam1711@gmail.com</a>.
          </p>
          <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #334155;">
            <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8;">Copy of your message:</p>
            <p style="margin: 0; font-style: italic; color: #94a3b8;">"${message}"</p>
          </div>
          <p style="color: #cbd5e1; margin-bottom: 4px;">Best regards,</p>
          <p style="color: #38bdf8; font-weight: bold; margin: 0;">Robiul Islam Ashiq</p>
          <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Full Stack Developer | MERN & Next.js Specialist</p>
          <p style="font-size: 12px; color: #475569; margin-top: 24px; border-top: 1px solid #334155; padding-top: 12px;">
            Portfolio: <a href="https://robiul-islam-ashiq.netlify.app/" style="color: #38bdf8;">robiul-islam-ashiq.netlify.app</a>
          </p>
        </div>
      `,
    };

    const results = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    results.forEach((r, idx) => {
      if (r.status === "fulfilled") {
        console.log(`✅ Contact email [${idx === 0 ? "Admin Alert" : "Client Auto-reply"}] sent successfully`);
      } else {
        console.error(`❌ Contact email [${idx === 0 ? "Admin Alert" : "Client Auto-reply"}] failed:`, r.reason?.message);
      }
    });
  } catch (err) {
    console.error("❌ Failed to process contact emails:", err.message);
  }
};
