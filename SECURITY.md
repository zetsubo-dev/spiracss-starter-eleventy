# Dependency security verification

## Dependency audit

Full development + production dependency audit: **0 known advisories** on 2026-10-29. This is a point-in-time check, not a guarantee about unknown vulnerabilities.

## Targeted WebC security override

`@11ty/eleventy-plugin-webc@0.11.2` currently installs a vulnerable Nanoid 4.x through `@11ty/webc`. The package override is limited to `@11ty/webc > nanoid@5.1.16`, including the fix for [GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv). WebC's used named `nanoid` API remains available; both pages compile with this override. Remove the override only after a verified upstream dependency fix.

## Reproduce

Use the pinned Node 24.22.2 / npm 11.19.1 runtime, then run `npm ci`, `npm run verify:scss`, `npm run lint:scss`, `npm run build`, and `npm run audit:dependencies`. Dependencies are exact and the lockfile records integrity hashes. Install-time lifecycle scripts stay disabled via `.npmrc`; builds are separate explicit commands. No audit suppression or `--force` is used.

For React samples, [the October Next.js security update](https://nextjs.org/blog/nextjs-security-update-october-14-2026) requires patched Next and Sharp versions. The locked Next 16.4.3 / React 19.3.1 graph must retain Sharp 0.35.5 or newer. Recheck the actual lockfile and advisories whenever dependencies change.
