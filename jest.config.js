const nextJest = require("next/jest");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env.development" });

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app to load next.config.js and .
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>/"],
});

module.exports = jestConfig;
