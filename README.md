# spiracss-starter-eleventy

A SpiraCSS 0.5.0 sample using native CSS `@scope`, not framework-generated scoping.

## Runtime and setup

Use Node.js **24.22.2 (24 LTS)** and npm **11.19.1** (`.node-version` / `.nvmrc`). Versions are exact and dependencies are locked.

```sh
npm ci
npm run verify:scss
npm run lint:scss
npm run build
npm run audit:dependencies
```

Run `npm run dev` to browse `/` and `/about/`. The home page is styled; About intentionally remains HTML-first for generation practice.

## Portable SCSS contract

The 33 files under `src/components/`, `src/styles/`, and `src/assets/css/` are identical across all seven samples. Framework markup is not shared and does not own style isolation.

```scss
@use "styles/partials/global" as *;
@use "sass:meta";

@scope (.hero-section) {
  :scope {
    @include meta.load-css("scss");
    > .hero-title { /* parent-owned placement */ }
  }
}
```

Only component root files use `@scope`. Meta-loaded child Blocks under `scss/` retain class selectors; do not scope them or move the root include outside `:scope`. Neither CSS Modules nor Vue/Astro-generated selector attributes are needed. This requires browsers that support CSS `@scope`. Global resets/tokens and page placement remain separate from component ownership.

Sass compiles external entries; WebC templates use unchanged literal classes.

Sass resolves the same bare imports from `src`; framework-specific aliases remain only for markup integration. `generator.scssRootStyle` is explicitly `scope-explicit`. `npm run verify:scss` checks the shared source manifest, root/child policy, and absence of framework-scoped source. Changes to shared SCSS must be synchronized across samples and the manifest updated deliberately.

## HTML-first practice and AI

Select the `<main class="about-flow">...</main>` fragment on the About page and run **Generate SpiraCSS SCSS from Root** or the HTML CLI. Add the generated component with `@use` to `src/assets/css/about.scss`. Keep child files class-based. Read `spiracss-ai-agent-doc.md` first; the full reference is optional. Both are synchronized from the official site at v0.5.0.

## Dependency security

Install-time lifecycle scripts are disabled in `.npmrc`; do not disable that protection globally to fix a build. Builds are explicit `npm run build` operations. If a future native dependency needs an install step, inspect that exact package and approve a targeted rebuild.

Use `npm ci` for the committed lockfile and run `npm run audit:dependencies` for development and production dependencies. Do not use `npm audit fix --force`, suppress advisories, or add speculative overrides. A clean audit is evidence about known advisories at check time, not a guarantee against unknown or supply-chain compromise.

The Next.js samples use Next **16.4.3** / React **19.3.1**, including the October 2026 fixes. See [official Next.js security guidance](https://nextjs.org/blog/nextjs-security-update-october-14-2026). Recheck advisories before publishing. These changes do not publish npm packages or deploy the sample.

See [SECURITY.md](SECURITY.md) for the verification date, exact remaining findings, and security overrides.

## Visual parity verification

The six runnable samples intentionally share the same Home/About content and rendered component placement. SCSS hashes and lint alone do not prove equal rendering.

On 2026-10-29, full-page PNG captures matched byte-for-byte across all six production builds in Chromium at desktop 1366×900 DPR1 and mobile 390×844 DPR1 (mobile UA). Fonts were loaded and animations finished before capture. No image masks or pixel-difference tolerance were used.

Repeat that comparison after changing markup, copy, style loading or SCSS. Check both routes at the same viewport, browser and stable animation state. This result does not establish parity in other browser engines or for every viewport.
