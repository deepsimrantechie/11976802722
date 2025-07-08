import React, { useState } from "react";
import { Log } from "../utils/logger";

const UrlStats = () => {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState(null);

  const handleFetchStats = async () => {
    try {
      const res = await fetch(`http://localhost:5000/shorturls/${code}`);
      const data = await res.json();

      if (res.ok) {
        setStats(data);
        Log("UrlStats.jsx:16", "info", "Frontend", `Stats fetched for ${code}`);
      } else {
        alert(data.error);
        Log(
          "UrlStats.jsx:19",
          "warn",
          "Frontend",
          data.error || "Failed to get stats"
        );
      }
    } catch (err) {
      console.error(err);
      Log("UrlStats.jsx:23", "error", "Frontend", err.message);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-bold mt-6 p-6 text-xl">View URL Stats</h2>
      <input
        type="text"
        placeholder="Enter shortcode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border border-black rounded-xl px-10 py-2"
      />
      <button
        onClick={handleFetchStats}
        className="text-xl  border border-black mt-4 w-1/2 rounded-xl  hover:text-blue-600 bg-black text-white "
      >
        Get Stats
      </button>

      {stats && (
        <div>
          <h3 className="text-xl font-bold">Stats for: {code}</h3>
          {/**          <p className="font-semibold ">Total Clicks: {stats.totalClicks}</p> total clicks are not needed */}
          <p>Original URL: {stats.originalUrl}</p>
          <p>Created At: {stats.createdAt}</p>
          <p>Expires At: {stats.expiry}</p>
        </div>
      )}
    </div>
  );
};

export default UrlStats;
