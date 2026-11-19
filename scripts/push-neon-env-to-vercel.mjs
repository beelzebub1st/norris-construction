import { execSync } from "node:child_process";
import fs from "node:fs";

function readEnv(path = ".env") {
  const out = {};
  for (const line of fs.readFileSync(path, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    out[line.slice(0, i)] = line.slice(i + 1).replace(/^"|"$/g, "");
  }
  return out;
}

function setEnv(name, value, environment) {
  try {
    execSync(`vercel env rm ${name} ${environment} -y`, { stdio: "ignore" });
  } catch {
    // not present
  }
  execSync(`vercel env add ${name} ${environment}`, {
    input: `${value}\n`,
    stdio: ["pipe", "inherit", "inherit"],
  });
}

const env = readEnv();
if (!env.DATABASE_URL || !env.DATABASE_URL_UNPOOLED) {
  throw new Error("Missing DATABASE_URL or DATABASE_URL_UNPOOLED in .env");
}

for (const environment of ["production", "preview"]) {
  setEnv("DATABASE_URL", env.DATABASE_URL, environment);
  setEnv("DATABASE_URL_UNPOOLED", env.DATABASE_URL_UNPOOLED, environment);
  console.log(`Set Neon DB env on ${environment}`);
}
