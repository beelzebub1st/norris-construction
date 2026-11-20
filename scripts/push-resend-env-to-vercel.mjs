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
    // missing
  }
  execSync(`vercel env add ${name} ${environment}`, {
    input: `${value}\n`,
    stdio: ["pipe", "inherit", "inherit"],
  });
}

const env = readEnv();
const required = ["RESEND_API_KEY", "RESEND_FROM", "LEAD_NOTIFY_EMAIL"];
for (const key of required) {
  if (!env[key]) throw new Error(`Missing ${key} in .env`);
}

for (const environment of ["production", "preview"]) {
  for (const key of required) {
    setEnv(key, env[key], environment);
  }
  console.log(`Set Resend env on ${environment}`);
}
