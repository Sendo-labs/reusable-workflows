/**
 * Updates README files with the latest version
 * Triggered by release-please when a release PR is created/updated
 */

module.exports = async ({ github, context, core }) => {
  const fs = require('fs');
  const path = require('path');

  // Component mapping
  const COMPONENT_MAP = {
    'release-workflow': {
      dir: 'release',
      workflowFile: 'release.yml'
    },
    'npm-publish-workflow': {
      dir: 'npm-publish',
      workflowFile: 'npm-publish.yml'
    }
  };

  // Read manifest to get versions
  const manifestPath = '.release-please-manifest.json';
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Read config to get component names
  const configPath = 'release-please-config.json';
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  let filesModified = false;

  // Update each workflow README
  for (const [packagePath, version] of Object.entries(manifest)) {
    const packageConfig = config.packages[packagePath];
    if (!packageConfig) continue;

    const component = packageConfig.component;
    const componentInfo = COMPONENT_MAP[component];

    if (!componentInfo) {
      core.warning(`Unknown component: ${component}`);
      continue;
    }

    const readmePath = path.join(componentInfo.dir, 'README.md');

    if (!fs.existsSync(readmePath)) {
      core.warning(`README not found: ${readmePath}`);
      continue;
    }

    let content = fs.readFileSync(readmePath, 'utf8');
    const originalContent = content;

    // Update version badge
    const versionBadge = `![Version](https://img.shields.io/badge/version-${version}-blue)`;

    if (content.includes('![Version]')) {
      // Update existing badge
      content = content.replace(
        /!\[Version\]\(https:\/\/img\.shields\.io\/badge\/version-[^-)]+-blue\)/g,
        versionBadge
      );
    } else {
      // Add badge after the first heading
      const lines = content.split('\n');
      const firstHeadingIndex = lines.findIndex(line => line.startsWith('# '));
      if (firstHeadingIndex !== -1) {
        lines.splice(firstHeadingIndex + 1, 0, '', versionBadge);
        content = lines.join('\n');
      }
    }

    // Update usage examples from @main to versioned tags
    const tagName = `${component}-v${version}`;
    const workflowPath = `.github/workflows/${componentInfo.workflowFile}`;

    // Replace @main references
    content = content.replace(
      new RegExp(`reusable-workflows/${workflowPath}@main`, 'g'),
      `reusable-workflows/${workflowPath}@${tagName}`
    );

    // Replace old versioned references
    content = content.replace(
      new RegExp(`reusable-workflows/${workflowPath}@${component}-v[0-9]+\\.[0-9]+\\.[0-9]+`, 'g'),
      `reusable-workflows/${workflowPath}@${tagName}`
    );

    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(readmePath, content, 'utf8');
      core.info(`✅ Updated ${readmePath} to version ${version}`);
      filesModified = true;
    } else {
      core.info(`⏭️  No changes needed for ${readmePath}`);
    }
  }

  if (filesModified) {
    core.setOutput('files_modified', 'true');
    core.info('📝 README files have been updated with new versions');
  } else {
    core.setOutput('files_modified', 'false');
    core.info('ℹ️  No README files needed updates');
  }

  return filesModified;
};
