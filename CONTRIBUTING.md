# Contributing Guide

Thank you for contributing to Reusable Workflows! This guide will help you follow the project's best practices.

## Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to automatically generate versions and changelogs.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: New feature (bumps MINOR)
- **fix**: Bug fix (bumps PATCH)
- **docs**: Documentation only changes
- **style**: Formatting, missing semicolons, etc.
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding tests
- **chore**: Maintenance, dependency updates
- **ci**: CI/CD workflow changes
- **revert**: Reverts a previous commit

### Scopes (optional)

- `npm`: npm-publish workflow
- `release`: release workflow
- `docs`: Documentation
- `ci`: CI/CD configuration

### Breaking Changes

To indicate a breaking change (bumps MAJOR):

```bash
# With !
feat!: redesign workflow API

# Or with footer
feat: add new feature

BREAKING CHANGE: this changes the API signature
```

### Examples

```bash
# Feature
feat(npm): add support for custom registry authentication
feat: add Docker build workflow

# Fix
fix(release): handle missing changelog file
fix: correct timeout in npm-publish workflow

# Breaking change
feat(npm)!: redesign input parameters
refactor!: remove deprecated workflow options

# Documentation
docs: update README with new examples
docs(release): add troubleshooting section

# Maintenance
chore: update GitHub Actions to v4
chore(deps): bump softprops/action-gh-release to v2
```

## Development Workflow

1. **Create a branch** for your feature/fix
   ```bash
   git checkout -b feat/my-new-feature
   # or
   git checkout -b fix/bug-description
   ```

2. **Make commits** following Conventional Commits
   ```bash
   git commit -m "feat(npm): add custom registry support"
   ```

3. **Push and create a PR**
   ```bash
   git push origin feat/my-new-feature
   ```

4. **Merge to main** → Release Please creates an automated PR
   - A PR "chore(main): release X.X.X" will be created/updated
   - It contains the CHANGELOG and new version
   - Review and merge this PR to publish the release

## Automated Versioning with Release Please

### How It Works

This project uses Google's [Release Please](https://github.com/googleapis/release-please):

**On every push to `main`:**

1. Release Please analyzes commits since the last release
2. Calculates the new version (MAJOR.MINOR.PATCH)
3. Creates/updates an automated PR with:
   - The new version
   - Generated CHANGELOG
   - All updated files

**When you merge the release PR:**

1. Git tag is created automatically
2. GitHub release is published
3. CHANGELOG is committed to the repo

### Versioning Rules

| Commit Type | Example | Result |
|-------------|---------|--------|
| Breaking change | `feat!:` or `BREAKING CHANGE:` | 1.0.0 → **2.0.0** |
| Feature | `feat:` | 1.0.0 → **1.1.0** |
| Fix | `fix:` | 1.0.0 → **1.0.1** |
| Others | `docs:`, `chore:`, etc. | No release |

### Example Scenarios

#### Scenario 1: Multiple features

```bash
git commit -m "feat: add Docker workflow"
git commit -m "feat(npm): support monorepos"
git commit -m "docs: update README"
git push origin main
# Result: PR "chore(main): release 1.1.0" created automatically
```

#### Scenario 2: Fix only

```bash
git commit -m "fix: correct tag validation"
git push origin main
# Result: PR "chore(main): release 1.0.1" created automatically
```

#### Scenario 3: Breaking change

```bash
git commit -m "feat!: redesign all workflow inputs"
git push origin main
# Result: PR "chore(main): release 2.0.0" created automatically
```

#### Scenario 4: Publishing the release

```bash
# Merge the PR created by Release Please
# → Tag v1.1.0 created
# → GitHub release published
# → CHANGELOG updated in the repo
```

## Tests

Before submitting a PR, ensure that:

- [ ] Your commits follow Conventional Commits
- [ ] Documentation is up to date
- [ ] Workflows are tested (if applicable)
- [ ] README contains usage examples

## Questions?

Feel free to open an issue for any questions!
