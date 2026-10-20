import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const upstream = process.argv[2] ?? "/tmp/upstream";
const repoUrl = "https://github.com/wisdom-uae/mattpocock-skills-source.git";
const pluginPath = path.join(upstream, ".claude-plugin", "plugin.json");

const plugin = JSON.parse(fs.readFileSync(pluginPath, "utf8"));
const rels = plugin.skills.map((entry) => entry.replace(/^\.\//, "")).sort();

if (rels.length === 0) throw new Error("Upstream plugin.json lists no skills");

const root = process.cwd();
fs.rmSync(path.join(root, "skills"), { recursive: true, force: true });

for (const rel of rels) {
  const source = path.join(upstream, rel);
  if (!fs.existsSync(path.join(source, "SKILL.md"))) {
    throw new Error(`Upstream skill missing SKILL.md: ${rel}`);
  }
  const dest = path.join(root, "skills", rel.replace(/^skills\//, ""));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(source, dest, { recursive: true });
}

const names = rels.map((rel) => path.basename(rel)).sort();
const teamConfig = [
  "team: mattpocock-skills",
  "description: Public TeamAI mirror of mattpocock/skills (MIT), synced from upstream",
  `repo: ${repoUrl}`,
  "provider: github",
  "publicSkills:",
  ...names.map((name) => `  - ${name}`),
  "",
].join("\n");
fs.writeFileSync(path.join(root, "teamai.yaml"), teamConfig);

const head = execFileSync("git", ["-C", upstream, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const upstreamFile = path.join(root, "UPSTREAM.md");
const previous = fs.existsSync(upstreamFile) ? fs.readFileSync(upstreamFile, "utf8") : "";
const previousHead = previous.match(/Commit: `([0-9a-f]{7,40})`/)?.[1];

if (previousHead !== head) {
  const version = plugin.version ?? "unknown";
  const date = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(
    upstreamFile,
    [
      "# Upstream",
      "",
      "- Repository: https://github.com/mattpocock/skills",
      `- Version: ${version}`,
      `- Commit: \`${head}\``,
      `- Synced: ${date}`,
      "",
      "Only the skills listed in the upstream `.claude-plugin/plugin.json` are mirrored.",
      "The sync workflow rewrites this file when the upstream commit changes.",
      "",
    ].join("\n"),
  );
}

console.log(`Synced ${names.length} skills from ${head}`);
