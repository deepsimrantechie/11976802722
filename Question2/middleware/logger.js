export const Log = async (stack, level, packageName, message) => {
  const payload = {
    stack,
    level,
    package: packageName,
    message,
    timestamp: new Date().toISOString(),
  };

  console.log(
    `[${payload.level.toUpperCase()}] ${payload.package}: ${payload.message}`
  );
};
