// src/App.jsx
import React, { useState } from "react";
import UrlShortener from "./pages/UrlShortener";
import UrlStats from "./pages/UrlStats";
const App = () => {
  const [shortLink, setShortLink] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="font-bold p-6">HTTP URL SHORTNER</h1>
      <UrlShortener onShorten={setShortLink} />
      {shortLink && (
        <p>
          Short URL:{" "}
          <a href={shortLink} target="_blank" rel="noopener noreferrer">
            {shortLink}
          </a>
        </p>
      )}
      <hr />
      <UrlStats />
    </div>
  );
};

export default App;
