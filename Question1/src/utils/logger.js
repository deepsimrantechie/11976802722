export const Log = async (stack, level, packageName, message) => {
  const payload = {
    stack,
    level,
    package: packageName,
    message,
    timestamp: new Date().toISOString(),
  };

  console.log(`[${level.toUpperCase()}] ${packageName}: ${message}`);
};
