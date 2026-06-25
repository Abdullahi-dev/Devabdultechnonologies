import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '50mb' }));

  // API route for contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, projectType, budget, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      // If SMTP details are available, send an email
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("SMTP credentials not configured.");
        return res.status(500).json({ error: "SMTP credentials not configured." });
      }

      const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "465"),
          secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          connectionTimeout: 10000, // 10 seconds
          greetingTimeout: 10000,
          socketTimeout: 10000,
        });

        const mailOptions = {
          from: `"Devabdultechnologies" <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_RECEIVER || process.env.SMTP_USER,
          subject: `New Project Inquiry from ${name}`,
          text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Project Type: ${projectType || 'N/A'}
Budget: ${budget || 'N/A'}

Message:
${message}
          `,
          html: `
            <h3>New Project Inquiry</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
            <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `
        };

        await transporter.sendMail(mailOptions);

      res.json({ success: true, message: "Inquiry received successfully" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: error.message || "Failed to process inquiry" });
    }
  });

  const isProduction = process.env.NODE_ENV === "production" || process.cwd().endsWith('dist') || fs.existsSync(path.join(process.cwd(), 'dist', 'index.html'));

  // Vite middleware for development
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) {
          res.status(500).send("Error loading index.html: " + err.message);
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
