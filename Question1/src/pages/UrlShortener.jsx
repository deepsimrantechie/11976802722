import React, { useState } from "react";
import { Log } from "../utils/logger";

const UrlShortener = ({ onShorten }) => {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/shorturls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          shortcode,
          validity: 30,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const shortCode = data.shortLink.split("/").pop();
        onShorten(shortCode);
        Log(
          "UrlShortener.jsx:18",
          "info",
          "Frontend",
          "Short URL created successfully"
        );
      } else {
        alert(data.error || "Something went wrong");
        Log(
          "UrlShortener.jsx:21",
          "error",
          "Frontend",
          data.error || "Failed to create short URL"
        );
      }
    } catch (err) {
      console.error(err);
      Log("UrlShortener.jsx:25", "error", "Frontend", err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-4 bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto"
    >
      <label className="font-semibold text-lg text-gray-700">
        Enter Your URL
      </label>
      <input
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className=" border border-blue-600 px-10 py-2 rounded-xl hover:shadow-xl"
        required
      />
      <input
        type="text"
        placeholder="Custom shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        className="border border-red-300 px-10 py-2  rounded-xl "
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-200 transition-all"
      >
        Generate Short URL
      </button>
    </form>
  );
};

export default UrlShortener;
