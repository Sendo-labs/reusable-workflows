# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 (2025-10-19)


### Features

* **workflows:** setup wanted workflow and release management. ([c90d37d](https://github.com/Sendo-labs/reusable-workflows/commit/c90d37dea0fd85db2eb51f37dd2a589869b7971b))


### Bug Fixes

* **workflows:** trigger workflows ([25e0f82](https://github.com/Sendo-labs/reusable-workflows/commit/25e0f822c8aaa328fd887f26f8030de9d42029d6))

## [Unreleased]

### Added

- NPM Publish workflow (formerly bun-test-build-publish)
- Auto Release workflow using Google's Release Please
- Comprehensive documentation for each workflow
- Organized folder structure with dedicated READMEs
- Release Please integration for automated versioning
- Contributing guide with Conventional Commits

### Changed

- Renamed `bun-test-build-publish.yml` to `npm-publish.yml`
- Transformed `release.yml` to use Release Please instead of manual releases
- Improved README structure and organization
- All documentation translated to English

### Removed

- Removed `.versionrc.json` (replaced by Release Please)
- Removed `.github/commitlint.config.js` (not needed with Release Please)

## [1.0.0] - 2025-10-18

### Added

- Initial release with NPM Publish workflow
- Support for Bun-based projects
- Automated testing, building, and publishing to NPM
