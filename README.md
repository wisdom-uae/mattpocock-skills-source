# mattpocock-skills-source

A TeamAI public-skill mirror of [mattpocock/skills](https://github.com/mattpocock/skills), used by the `wisdom-uae` team as its engineering development standard.

- Mirrors only the skills published in the upstream `.claude-plugin/plugin.json` (currently 27: 20 engineering, 7 productivity).
- Excludes upstream `in-progress/`, `misc/`, and `deprecated/`.
- `teamai.yaml` declares every mirrored skill under `publicSkills`, so TeamAI subscribers receive them automatically.
- `.github/workflows/sync-upstream.yml` mirrors upstream daily at 03:17 UTC, and on manual dispatch. It rewrites `teamai.yaml` and `UPSTREAM.md` from the upstream plugin manifest.

Subscribe from a TeamAI team repo:

```bash
teamai source add https://github.com/wisdom-uae/mattpocock-skills-source.git --name mattpocock-skills
```

Content is MIT licensed; see `THIRD_PARTY_NOTICES.md`.
