import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API
  const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // Let the client know if the key is available
  app.get("/api/ai-status", (req, res) => {
    res.json({ configAvailable: !!ai });
  });

  // API Endpoint: AI Recommendations
  app.post("/api/recommend", async (req, res) => {
    try {
      const { occasion, stylePreference, weather, gender } = req.body;
      if (!ai) {
        return res.status(500).json({ error: "Gemini API Key is not configured. Please add it via Secrets Panel." });
      }

      const prompt = `You are KUSU's premium fashion stylist. Provide 3 highly personalized clothing styles & item suggestions for:
- Occasion: ${occasion || "Any"}
- Style Pref: ${stylePreference || "Modern & Elegant"}
- Climate/Weather: ${weather || "Moderate"}
- Target Category: ${gender || "Unisex"}

Return ONLY a JSON array of suggestions.
Provide these strict keys for each item:
"title": string,
"description": string,
"tip": string,
"matchingColors": array of string (e.g. ["Midnight Black", "Royal Blue"])

Do not include any markdown envelopes or other text. Return pure JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      res.setHeader("Content-Type", "application/json");
      res.send(response.text);
    } catch (err: any) {
      console.error("Error generating recommend:", err);
      res.status(500).json({ error: err.message || "Failed to generate suggestions" });
    }
  });

  // API Endpoint: Outfit Match Check
  app.post("/api/outfit-match", async (req, res) => {
    try {
      const { top, bottom } = req.body;
      if (!ai) {
        return res.status(500).json({ error: "Gemini API Key is not configured. Please add it via Secrets Panel." });
      }

      const prompt = `You are a high-end fashion editor at KUSU Store critique. Evaluate this combination:
Top: ${top.name} (Category: ${top.category}, Color: ${top.color}, Material: ${top.material})
Bottom: ${bottom.name} (Category: ${bottom.category}, Color: ${bottom.color}, Material: ${bottom.material})

Return ONLY a JSON object representing the critique with:
"score": number (0 to 100 representing aesthetic similarity/harmony),
"verdict": string (one word or short catchy vibe statement like 'Absolute Fire', 'Bold but Clashing', or 'Timeless Classic'),
"review": string (sophisticated styling review of 2-3 sentences),
"accessories": string[] (suggested accessory additions)

Do not include any Markdown headers or wrapper symbols. Return pure JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      res.setHeader("Content-Type", "application/json");
      res.send(response.text);
    } catch (err: any) {
      console.error("Error matching outfit:", err);
      res.status(500).json({ error: err.message || "Failed to analyze outfit match" });
    }
  });

  // Vite Integration in the Express middleware stack
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched successfully on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal server entry point crash:", err);
});
