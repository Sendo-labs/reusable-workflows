# NPM Publish Workflow

![Version](https://img.shields.io/badge/version-1.0.0-blue)

Reusable workflow to test, build, and publish NPM packages with Bun.

## Usage

```yaml
name: Publish to NPM

on:
  release:
    types: [published]

jobs:
  publish:
    uses: sendo/reusable-workflows/.github/workflows/npm-publish.yml@npm-publish-workflow-v1.0.0
    with:
      bun-version: 'latest'
      node-version: '20'
      working-directory: '.'
      registry-url: 'https://registry.npmjs.org'
      skip-tests: false
      skip-build: false
      access: 'public'
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `node-version` | Node.js version to use | No | `'20'` |
| `bun-version` | Bun version to use | No | `'latest'` |
| `working-directory` | Working directory for the project | No | `'.'` |
| `registry-url` | NPM registry URL | No | `'https://registry.npmjs.org'` |
| `skip-tests` | Skip running tests | No | `false` |
| `skip-build` | Skip build step | No | `false` |
| `access` | NPM package access level (public or restricted) | No | `'public'` |

## Secrets

| Secret | Description | Required |
|--------|-------------|----------|
| `NPM_TOKEN` | NPM authentication token | Yes |

## NPM Token Configuration

1. Create a token on [npmjs.com](https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
2. Add the token to your GitHub repository secrets: Settings → Secrets → Actions → New repository secret
3. Name it `NPM_TOKEN`

## Examples

### Automatic publish on release

```yaml
name: Publish Package

on:
  release:
    types: [published]

jobs:
  publish:
    uses: sendo/reusable-workflows/.github/workflows/npm-publish.yml@npm-publish-workflow-v1.0.0
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Publish with custom configuration

```yaml
name: Publish Package

on:
  workflow_dispatch:

jobs:
  publish:
    uses: sendo/reusable-workflows/.github/workflows/npm-publish.yml@npm-publish-workflow-v1.0.0
    with:
      bun-version: '1.1.0'
      node-version: '22'
      working-directory: './packages/my-package'
      access: 'restricted'
      skip-tests: false
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Publish without tests or build (pre-built package)

```yaml
name: Quick Publish

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    uses: sendo/reusable-workflows/.github/workflows/npm-publish.yml@npm-publish-workflow-v1.0.0
    with:
      skip-tests: true
      skip-build: true
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Workflow Steps

1. Checkout code
2. Setup Bun with specified version
3. Install dependencies (`bun install --frozen-lockfile`)
4. Run tests (`bun test`) - unless `skip-tests: true`
5. Build package (`bun run build`) - unless `skip-build: true`
6. Setup Node.js for publishing
7. Publish to NPM with provided token

## Permissions

The workflow requires the following permissions:

- `contents: read` - To read repository code
- `id-token: write` - For NPM provenance publishing

## Notes

- The workflow uses `--frozen-lockfile` to ensure reproducible builds
- Build uses Bun but publishing uses npm for better compatibility
- Supports custom NPM registries (GitHub Packages, private registries, etc.)
