# Reusable Workflows

Collection of reusable GitHub Actions workflows to automate your CI/CD tasks.

## Available Workflows

### 📦 NPM Publish

Workflow to test, build, and publish NPM packages with Bun.

**Location:** [.github/workflows/npm-publish.yml](.github/workflows/npm-publish.yml)

**Full documentation:** [npm-publish/README.md](npm-publish/README.md)

#### Quick Start

```yaml
on:
  release:
    types: [published]

jobs:
  publish:
    uses: sendo/reusable-workflows/.github/workflows/npm-publish.yml@main
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 🚀 Auto Release (Release Please)

Workflow to automate your releases with Google's Release Please. Analyzes your commits and automatically creates release PRs.

**Location:** [.github/workflows/release.yml](.github/workflows/release.yml)

**Full documentation:** [release/README.md](release/README.md)

#### Quick Start

```yaml
on:
  push:
    branches:
      - main

jobs:
  release:
    uses: sendo/reusable-workflows/.github/workflows/release.yml@main
    permissions:
      contents: write
      pull-requests: write
```

**Required configuration in your repo:** Create `release-please-config.json` and `.release-please-manifest.json`. See the [full documentation](release/README.md) for details.

---

## Versioning This Repository

This repository uses [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/).

### Automated Release with Release Please

This project uses Google's [Release Please](https://github.com/googleapis/release-please) to automate releases.

#### Commit Format

```bash
# Feature (bumps MINOR: 1.0.0 -> 1.1.0)
feat: add new workflow for Docker builds
feat(npm): support custom registry authentication

# Fix (bumps PATCH: 1.0.0 -> 1.0.1)
fix: correct timeout handling in release workflow
fix(release): handle missing changelog file

# Breaking Change (bumps MAJOR: 1.0.0 -> 2.0.0)
feat!: redesign npm-publish workflow API
feat(release)!: remove deprecated artifact-path option

# Other types (included in changelog but no version bump)
docs: update README with new examples
chore: update dependencies
refactor: simplify version normalization
```

#### How It Works

On every push to `main`, Release Please:

1. **Analyzes commits** since the last release (via Conventional Commits)
2. **Creates/updates an automated PR** with:
   - The calculated new version
   - Generated CHANGELOG
   - All updated files
3. **When you merge the PR** → Release is automatically created with:
   - Git tag
   - GitHub release
   - Published CHANGELOG

#### Typical Workflow

```bash
# 1. Development with conventional commits
git commit -m "feat: add Docker build workflow"
git commit -m "fix: correct npm token validation"
git push origin main

# 2. Release Please automatically creates a PR "chore(main): release X.X.X"

# 3. Review and merge the PR

# 4. Release is created automatically! 🎉
```

#### Release Please Benefits

- ✅ **Used by Google** on all their open source projects
- ✅ **Zero configuration** - Works out of the box
- ✅ **Review PR** - You control when the release happens
- ✅ **Automatic CHANGELOG** - Generated and committed to repo
- ✅ **Maintainable** - No custom bash scripts

### Using a Specific Version

```yaml
jobs:
  publish:
    # Specific version (recommended for stability)
    uses: sendo/reusable-workflows/.github/workflows/npm-publish.yml@v1.0.0

    # Latest version (to always use the latest features)
    # uses: sendo/reusable-workflows/.github/workflows/npm-publish.yml@main
```

---

## Usage

Each workflow has its own detailed documentation with:

- Input and secret configuration
- Various usage examples
- Best practices
- Setup guide

Check the README files in each folder for more information.

## Project Structure

```text
reusable-workflows/
├── .github/
│   └── workflows/
│       ├── npm-publish.yml    # NPM publish workflow
│       └── release.yml         # GitHub release workflow
├── npm-publish/
│   └── README.md              # NPM Publish documentation
├── release/
│   └── README.md              # Release documentation
└── README.md                  # This file
```

## Actions Used

All workflows use only official and verified actions:

- [actions/checkout@v4](https://github.com/actions/checkout) - Official GitHub action
- [oven-sh/setup-bun@v2](https://github.com/oven-sh/setup-bun) - Official Bun action
- [actions/setup-node@v4](https://github.com/actions/setup-node) - Official GitHub action
- [googleapis/release-please-action@v4](https://github.com/googleapis/release-please-action) - Google's Release Please action

## License

MIT