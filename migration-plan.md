
# 🗺️ Migration Plan: `googlecodelabs/tools` Modernization

---

### Phase 0 — Audit & Preparation (1–2 weeks)

| Task | Details |
|---|---|
| **Inventory all dependencies** | Document every Bower component (~50+ packages in `site/app/bower_components`), npm devDependencies (30+ in `site/package.json`), Bazel deps (`WORKSPACE`), and Go modules (`claat/go.mod`) |
| **Map component usage** | Trace which Polymer/Paper/Iron elements are actually used in `site/app/elements/` and `site/app/views/` |
| **Identify dead code** | Remove unused bower components and gulp tasks in `site/tasks/` |
| **Set up CI baseline** | Replace `.travis.yml` (Travis CI) with **GitHub Actions** to establish a green baseline before changes |
| **Pin Node.js version** | Update `engines` from `>=0.10.0` to a current LTS (e.g., Node 20) |

---

## Phase 1 — `claat/` (Go tool) Modernization (1–2 weeks)

> **Goal:** Update claat's build system to match the same modern toolchain used for `site/`.

| Task | Current State | Target |
|---|---|---|
| **Go version** | `go 1.16` in `go.mod` | **Go 1.22+** |
| **Go dependencies** | Stale (`golang.org/x/net` from 2021, `goldmark` 1.3.7, etc.) | `go get -u all` + audit |
| **Build system** | `Makefile` + `go build` | Keep `Makefile` (it's fine), but add a **GitHub Actions workflow** for CI/CD and cross-platform releases |
| **`claat serve`** | Depends on `bazel build :bundle` | Decouple from Bazel — use pre-built bundle or npm script |
| **Release pipeline** | Travis CI deploy to GitHub Releases | **GitHub Actions** with `goreleaser` |

```
claat/go.mod changes:
  go 1.16 → go 1.22
  Update all dependencies to latest
  
claat/Makefile changes:
  Remove `bazel build :bundle` dependency in `serve` target
```

---

## Phase 2 — `codelab-elements/` Build System (2–3 weeks)

> **Goal:** Replace Bazel + Google Closure Compiler with a modern JS build.

| Task | Current State | Target |
|---|---|---|
| **Build tool** | **Bazel 0.18** + `@bazel/bazel` npm package | **Vite** or **Rollup** (for library bundling) |
| **JS compiler** | Google Closure Compiler (2018) | **esbuild** or **terser** (via Vite/Rollup) |
| **SCSS** | `@io_bazel_rules_sass` (Bazel) | **sass** (Dart Sass) via npm |
| **Testing** | Bazel `closure_js_test` + `rules_webtesting` + Chromium | **Vitest** or **Web Test Runner** |
| **Custom Elements polyfill** | `@polyfill` from Bazel `WORKSPACE` | `@webcomponents/custom-elements` via npm |

**Steps:**

1. Create `codelab-elements/package.json` with modern deps
2. Write Vite/Rollup config to produce `codelab-elements.js`, `codelab-elements.css`, `codelab-index.js`, `codelab-index.css` (matching current Bazel outputs)
3. Verify output bundle is byte-for-byte-comparable (or functionally equivalent)
4. Delete `WORKSPACE`, `BUILD.bazel`, `codelab-elements/**/BUILD.bazel`, `third_party/`
5. Update root `package.json` scripts

---

## Phase 3 — `site/` Bower → npm Migration (3–4 weeks) ⭐ Largest phase

> **Goal:** Replace Bower/Polymer 1.x/Vulcanize with npm packages and modern web components.

### Sub-phase 3a: Package Manager Migration

| Task | Current | Target |
|---|---|---|
| **Package manager** | Bower 1.8 | **npm** (or pnpm) |
| **Polymer** | Polymer 1.x (bower, HTML Imports) | **Lit 3.x** (npm, ES modules) |
| **Paper/Iron elements** | ~30+ Bower packages (paper-button, iron-icons, etc.) | **@material/web** (Material Web Components) or Lit equivalents |
| **Vulcanize** | `gulp-vulcanize` + `gulp-crisper` | Remove entirely — ES modules don't need vulcanization |
| **webcomponentsjs** | Bower polyfill | Remove (native browser support in 2026) |

### Sub-phase 3b: Build Pipeline Migration

| Task | Current | Target |
|---|---|---|
| **Task runner** | Gulp 4 (`site/gulpfile.js`, 800+ lines) | **Vite** (dev server + build) |
| **JS transpilation** | Babel 6 (`babel-preset-es2015`) | **esbuild** (via Vite, or native ES2020+ target) |
| **CSS processing** | `gulp-sass` (node-sass) + `autoprefixer` + `cssnano` + `gulp-html-postcss` | **Vite** + PostCSS + Dart Sass |
| **HTML minification** | `gulp-htmlmin` | **vite-plugin-html** or `html-minifier-terser` |
| **Templating** | `swig-templates` (server-side) | Evaluate: keep swig for static generation, or migrate to **Vite SSG** / **11ty** |
| **Linting** | `jscs` (deprecated) + `jshint` | **ESLint** + **Prettier** |
| **Dev server** | `gulp-webserver` | **Vite dev server** (HMR built-in) |

### Sub-phase 3c: Component-by-Component Rewrite

For each element in `site/app/elements/`:

1. Convert from Polymer 1.x HTML Import → Lit 3.x ES module
2. Replace `paper-*` / `iron-*` usage with `@material/web` or plain CSS/JS
3. Update templates in `site/app/views/`

### Sub-phase 3d: Cleanup

- Delete `site/app/bower_components/` entirely (50+ directories)
- Delete `site/gulpfile.js` and `site/tasks/`
- Remove Bower-specific `.bowerrc`, `bower.json` files
- Update `site/README.md` with new build instructions

---

## Phase 4 — CI/CD Modernization (1 week)

| Task | Current | Target |
|---|---|---|
| **CI** | `.travis.yml` (Travis CI, Ubuntu Trusty!) | **GitHub Actions** |
| **Bazel install** | Manual wget of Bazel 0.18 in CI | Remove entirely |
| **Go CI** | `go 1.11.x` in Travis | Go 1.22+ in GitHub Actions |
| **Site CI** | None apparent | Add build + lint + test workflow |
| **Release** | Travis deploy to GitHub Releases | GitHub Actions + `goreleaser` for claat |

Example new workflow structure:

```
.github/workflows/
  claat-ci.yml      # Go test, lint, build
  claat-release.yml # Cross-compile + GitHub Release
  site-ci.yml       # npm install, lint, build, test
  elements-ci.yml   # Build + test codelab-elements
```

---

## Phase 5 — Final Cleanup & Documentation (1 week)

| Task |
|---|
| Delete `.travis.yml` |
| Delete `WORKSPACE`, all `BUILD.bazel` files, `third_party/` |
| Update root `README.md`, `site/README.md`, `codelab-elements/README.md` |
| Update `CONTRIBUTING.md` with new dev setup instructions |
| Consolidate to a single root `package.json` (monorepo workspace) or keep separate with npm workspaces |
| Tag a new release |

---

## Summary Timeline

| Phase | Duration | Risk Level |
|---|---|---|
| **Phase 0** — Audit & Prep | 1–2 weeks | 🟢 Low |
| **Phase 1** — claat Go modernization | 1–2 weeks | 🟢 Low |
| **Phase 2** — codelab-elements Bazel→Vite | 2–3 weeks | 🟡 Medium |
| **Phase 3** — site/ Bower→npm + Gulp→Vite | 3–4 weeks | 🔴 High (largest surface area) |
| **Phase 4** — CI/CD Travis→GitHub Actions | 1 week | 🟢 Low |
| **Phase 5** — Cleanup & docs | 1 week | 🟢 Low |
| **Total** | **~9–13 weeks** | |

---

## Key Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Polymer 1.x → Lit 3.x requires rewriting every custom element | Start with the most-used elements; keep old and new running in parallel |
| ~50 Bower components checked into git | Many are unused; audit first, only migrate what's actually imported |
| `swig-templates` is used for server-side HTML generation in gulpfile | May need to keep swig or find a 1:1 replacement (Nunjucks is compatible) |
| `claat serve` depends on Bazel bundle output | Decouple early in Phase 1 |
| This is a Google-maintained repo — external contributors may have limited merge access | Propose changes via issues first, get maintainer buy-in |
