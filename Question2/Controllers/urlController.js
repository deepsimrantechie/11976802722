import db from "../models/urlModel.js";
import { Log } from "../middleware/logger.js";

export const createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  const code = shortcode || Math.random().toString(36).substring(2, 8);
  const expiry = new Date(Date.now() + validity * 60 * 1000).toISOString();

  if (db.has(code)) {
    await Log("urlController:10", "error", "URL", "Shortcode already exists");
    return res.status(400).json({ error: "Shortcode already exists" });
  }

  db.set(code, {
    url,
    createdAt: new Date().toISOString(),
    expiry,
    clicks: [],
  });

  await Log(
    "urlController:19",
    "info",
    "URL",
    `Shortened URL created: ${code}`
  );
  res.status(201).json({
    shortLink: `https://localhost:5000/${code}`,
    expiry,
  });
};

export const getUrlStats = async (req, res) => {
  const { code } = req.params;

  if (!db.has(code)) {
    await Log("urlController:28", "warn", "URL", "Shortcode not found");
    return res.status(404).json({ error: "Short URL not found" });
  }

  const data = db.get(code);
  await Log("urlController:33", "info", "URL", `Stats fetched for: ${code}`);
  res.status(200).json({
    totalClicks: data.clicks.length,
    originalUrl: data.url,
    createdAt: data.createdAt,
    expiry: data.expiry,
    interactions: data.clicks,
  });
};
