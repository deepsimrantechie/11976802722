// src/utils/logger.js
export const Log = async (stack, level, packageName, message) => {
  const payload = {
    stack,
    level,
    package: packageName,
    message,
    timestamp: new Date().toISOString(),
  };

  console.log(`[${level.toUpperCase()}] ${packageName}: ${message}`);

  // You can send this to your backend logger API if needed
  // await fetch("http://localhost:5000/logs", { method: "POST", ... })
};
