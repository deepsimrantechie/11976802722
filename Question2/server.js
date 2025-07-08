// server.js
import express from "express";
import cors from "cors";
import { Log } from "./middleware/logger.js"; // Make sure logger.js exists

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new Map();

// POST /shorturls - Create a short URL
app.post("/shorturls", async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  const code = shortcode || Math.random().toString(36).substring(2, 8);
  const expiry = new Date(Date.now() + validity * 60 * 1000).toISOString();

  if (db.has(code)) {
    await Log("POST /shorturls", "error", "URL", "Shortcode already exists");
    return res.status(400).json({ error: "Shortcode already exists" });
  }

  db.set(code, {
    url,
    createdAt: new Date().toISOString(),
    expiry,
    clicks: [],
  });

  await Log("POST /shorturls", "info", "URL", `Short URL created: ${code}`);
  res.status(201).json({
    shortLink: `http://localhost:5000/${code}`, // HTTP for local use
    expiry,
  });
});

// GET /shorturls/:code - Get stats for a short URL
app.get("/shorturls/:code", async (req, res) => {
  const { code } = req.params;

  if (!db.has(code)) {
    await Log("GET /shorturls/:code", "warn", "URL", "Shortcode not found");
    return res.status(404).json({ error: "Shortcode not found" });
  }

  const data = db.get(code);
  await Log(
    "GET /shorturls/:code",
    "info",
    "URL",
    `Stats retrieved for ${code}`
  );

  res.json({
    totalClicks: data.clicks.length,
    originalUrl: data.url,
    createdAt: data.createdAt,
    expiry: data.expiry,
    interactions: data.clicks,
  });
});

// GET /:code - Redirect to the original long URL
app.get("/:code", async (req, res) => {
  const { code } = req.params;

  if (!db.has(code)) {
    await Log("GET /:code", "warn", "Redirect", `Shortcode ${code} not found`);
    return res.status(404).send("Short URL not found");
  }

  const data = db.get(code);

  // Optional: Log the click
  data.clicks.push({
    timestamp: new Date().toISOString(),
    referrer: req.get("Referrer") || "Direct",
    ip: req.ip,
  });

  await Log("GET /:code", "info", "Redirect", `Redirected to ${data.url}`);
  res.redirect(data.url);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
