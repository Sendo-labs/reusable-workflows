# Auto Release Workflow with Release Please

Reusable workflow pour automatiser vos releases avec **Release Please** de Google.

## Qu'est-ce que Release Please ?

Release Please automatise complètement les releases en analysant vos commits (Conventional Commits) :

1. À chaque push sur `main`, il analyse les commits
2. Calcule la nouvelle version (MAJOR.MINOR.PATCH)
3. Crée/met à jour une PR automatique avec :
   - La nouvelle version
   - Le CHANGELOG généré
   - Tous les fichiers mis à jour
4. Quand vous mergez la PR → Tag + Release créés automatiquement

## Setup dans votre Repository

### 1. Créer le workflow

Créez `.github/workflows/release.yml` dans votre repo :

```yaml
name: Auto Release

on:
  push:
    branches:
      - main  # ou master

jobs:
  release:
    uses: sendo/reusable-workflows/.github/workflows/release.yml@main
    permissions:
      contents: write
      pull-requests: write
```

### 2. Créer les fichiers de configuration

#### `release-please-config.json` (à la racine)

```json
{
  "release-type": "simple",
  "packages": {
    ".": {
      "changelog-path": "CHANGELOG.md",
      "release-type": "simple",
      "bump-minor-pre-major": true,
      "bump-patch-for-minor-pre-major": false,
      "draft": false,
      "prerelease": false
    }
  },
  "changelog-sections": [
    { "type": "feat", "section": "✨ Features", "hidden": false },
    { "type": "fix", "section": "🐛 Bug Fixes", "hidden": false },
    { "type": "perf", "section": "⚡ Performance Improvements", "hidden": false },
    { "type": "revert", "section": "⏪ Reverts", "hidden": false },
    { "type": "docs", "section": "📚 Documentation", "hidden": false },
    { "type": "style", "section": "💎 Styles", "hidden": true },
    { "type": "chore", "section": "🔧 Miscellaneous", "hidden": false },
    { "type": "refactor", "section": "♻️ Code Refactoring", "hidden": false },
    { "type": "test", "section": "✅ Tests", "hidden": true },
    { "type": "build", "section": "📦 Build System", "hidden": true },
    { "type": "ci", "section": "👷 Continuous Integration", "hidden": true }
  ]
}
```

#### `.release-please-manifest.json` (à la racine)

```json
{
  ".": "0.0.0"
}
```

### 3. Utiliser Conventional Commits

Vos commits doivent suivre le format Conventional Commits :

```bash
# Feature (MINOR bump: 1.0.0 -> 1.1.0)
feat: add user authentication
feat(api): add new endpoint for payments

# Fix (PATCH bump: 1.0.0 -> 1.0.1)
fix: correct validation error
fix(ui): fix button alignment

# Breaking Change (MAJOR bump: 1.0.0 -> 2.0.0)
feat!: redesign API structure
fix(api)!: remove deprecated endpoint

# Autres (inclus dans changelog mais pas de bump)
docs: update README
chore: update dependencies
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `release-type` | Type de release (simple, node, python, rust, etc.) | Non | `'simple'` |
| `config-file` | Chemin vers le fichier de config | Non | `'release-please-config.json'` |
| `manifest-file` | Chemin vers le fichier manifest | Non | `'.release-please-manifest.json'` |

## Secrets

| Secret | Description | Required |
|--------|-------------|----------|
| `GITHUB_TOKEN` | Token GitHub (fourni automatiquement) | Non |

## Release Types

Release Please supporte différents types de projets :

- **`simple`** - Projets génériques (recommandé pour les workflows)
- **`node`** - Projets Node.js (met à jour package.json)
- **`python`** - Projets Python (met à jour setup.py, pyproject.toml)
- **`rust`** - Projets Rust (met à jour Cargo.toml)
- **`go`** - Projets Go
- Et beaucoup d'autres...

## Exemples

### Configuration Basique (Simple)

```yaml
name: Auto Release

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

### Configuration pour Node.js

```yaml
name: Auto Release

on:
  push:
    branches:
      - main

jobs:
  release:
    uses: sendo/reusable-workflows/.github/workflows/release.yml@main
    with:
      release-type: node  # Met à jour automatiquement package.json
    permissions:
      contents: write
      pull-requests: write
```

### Configuration avec fichiers personnalisés

```yaml
name: Auto Release

on:
  push:
    branches:
      - main

jobs:
  release:
    uses: sendo/reusable-workflows/.github/workflows/release.yml@main
    with:
      config-file: .github/release-please-config.json
      manifest-file: .github/.release-please-manifest.json
    permissions:
      contents: write
      pull-requests: write
```

## Workflow Typique

1. **Développement avec Conventional Commits**
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: correct bug"
   git push origin main
   ```

2. **Release Please crée une PR automatiquement**
   - Titre : "chore(main): release 1.1.0"
   - Contient le CHANGELOG mis à jour
   - Contient la nouvelle version

3. **Review et merge de la PR**
   - Vérifiez le CHANGELOG
   - Mergez la PR quand prêt

4. **Release créée automatiquement !**
   - Tag git créé (ex: v1.1.0)
   - Release GitHub publiée
   - CHANGELOG commité dans le repo

## Configuration Avancée

### Monorepo

Pour les monorepos, configurez plusieurs packages dans `release-please-config.json` :

```json
{
  "packages": {
    "packages/frontend": {
      "release-type": "node",
      "package-name": "@myorg/frontend"
    },
    "packages/backend": {
      "release-type": "node",
      "package-name": "@myorg/backend"
    }
  }
}
```

### Personnaliser les sections du changelog

Modifiez `changelog-sections` dans `release-please-config.json` :

```json
{
  "changelog-sections": [
    { "type": "feat", "section": "🚀 New Features" },
    { "type": "fix", "section": "🐛 Bug Fixes" },
    { "type": "docs", "section": "📝 Documentation", "hidden": false }
  ]
}
```

## Avantages

- ✅ **Utilisé par Google** sur tous leurs projets open source
- ✅ **Zero maintenance** - Pas de scripts bash à maintenir
- ✅ **Contrôle total** - Vous décidez quand publier via la PR
- ✅ **CHANGELOG versionné** - Commité dans le repo
- ✅ **Support monorepo** - Gère plusieurs packages
- ✅ **Flexible** - Support de nombreux langages/frameworks

## Troubleshooting

### La PR n'est pas créée

- Vérifiez que vos commits utilisent Conventional Commits (`feat:`, `fix:`, etc.)
- Vérifiez les permissions du workflow (`contents: write`, `pull-requests: write`)
- Vérifiez que les fichiers de config existent et sont valides

### La release n'est pas créée après merge

- Assurez-vous de merger la PR (pas de squash ou rebase)
- Vérifiez les permissions `contents: write`
- Consultez les logs du workflow

## Documentation

- [Release Please GitHub](https://github.com/googleapis/release-please)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
