# mattpocock-skills-source

A TeamAI public-skill mirror of [mattpocock/skills](https://github.com/mattpocock/skills), used by the `wisdom-uae` team as its engineering development standard.

- Mirrors only the skills published in the upstream `.claude-plugin/plugin.json` (currently 27: 20 engineering, 7 productivity).
- Excludes upstream `in-progress/`, `misc/`, and `deprecated/`.
- `teamai.yaml` declares every mirrored skill under `publicSkills`, so TeamAI subscribers receive them automatically.
- `.github/workflows/sync-upstream.yml` runs daily at 03:17 UTC and on manual dispatch. When upstream changes, it force-updates a `sync/upstream` branch and opens (or comments on) an “Upstream update ready for review” issue containing a compare link.
- Review flow: open the compare link, create the pull request, review the diff, merge. Merging publishes the mirror to every TeamAI subscriber on their next pull.
- If an open pull request from `sync/upstream` already exists, the run updates that branch instead of opening another issue.
- A run with no upstream change exits without a commit, branch update, or issue.

`wisdom-uae` organization policy blocks GitHub Actions from creating pull requests, which is why the workflow queues a compare link instead of opening the PR itself.

Subscribe from a TeamAI team repo:

```bash
teamai source add https://github.com/wisdom-uae/mattpocock-skills-source.git --name mattpocock-skills
```

Content is MIT licensed; see `THIRD_PARTY_NOTICES.md`.
