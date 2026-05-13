# Agent instructions — MediaCreationTool

## Mandatory semver version bump on every change

**Every** change to this repository must include a semver version bump in the **same commit**. No exceptions: not for trivial edits, documentation, chores, or refactors.

### Files that must stay in sync

These must always show the **same** version (`MAJOR.MINOR.PATCH`, no `v` prefix in files; the web footer shows `v` before the number in the UI):

- `index.html` — element `#app-footer-version`
- `package.json` — field `"version"`
- `version.txt` — single line, entire file

Other common manifests were scanned and are **not** used by this repo today: `app.json`, `Cargo.toml`, `pyproject.toml`, `setup.cfg`, `manifest.json`, `pubspec.yaml`, `Info.plist`. If you add one, update this list and `.cursor/rules/version-bump.mdc` and keep versions aligned.

### Semver rules

- **Patch** `x.y.Z+1`: bug fixes, docs, chores, deployment-only fixes, internal refactors with no user-visible behavior change.
- **Minor** `x.(Y+1).0`: new user-visible feature, option, UI, translation, etc.
- **Major** `(X+1).0.0`: breaking changes.

### Pre-commit checklist

1. Choose patch, minor, or major using the rules above.
2. Update `package.json`, `version.txt`, and `#app-footer-version` in `index.html` to the new version.
3. Search the repo for the old version string to avoid leaving a stale copy.
4. Commit code and version updates together.

Cursor-specific rule file: `.cursor/rules/version-bump.mdc` (`alwaysApply: true`).
