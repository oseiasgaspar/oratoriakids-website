import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  generateOratoriaChallenge,
  validateChallengeInput,
} from "./server/challengeService.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/api/challenge", async (req, res) => {
    try {
      const input = validateChallengeInput(req.body);
      const challenge = await generateOratoriaChallenge(input);
      res.json(challenge);
    } catch (error) {
      const err = error as Error & { status?: number; statusCode?: number };
      const status = err.statusCode ?? err.status ?? 400;
      console.error("[/api/challenge error]:", err.message);
      res.status(status >= 400 && status < 600 ? status : 500).json({
        error:
          err.message ||
          "Ocorreu um erro ao gerar o desafio. Tente novamente dentro de instantes.",
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Aplicação não compilada.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Oratória Kids server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
