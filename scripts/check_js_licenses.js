import { execSync } from "child_process";
import { init } from "license-checker";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const allowedLicenses = [
  "MIT",
  "Apache-2.0",
  "BSD-3-Clause",
  "BSD-2-Clause",
  "ISC",
  "Python-2.0",
  "CC-BY-4.0",
  "CC-BY-3.0",
  "CC0-1.0",
  "(MIT AND CC-BY-3.0)",
];

function findAllPackageJsonFiles(directory) {
  const results = [];
  const files = readdirSync(directory);

  for (const file of files) {
    const fullPath = join(directory, file);

    // Skip node_modules directory
    if (file === "node_modules") {
      continue;
    }

    if (statSync(fullPath).isDirectory()) {
      results.push(...findAllPackageJsonFiles(fullPath));
    } else if (file === "package.json") {
      results.push(fullPath);
    }
  }

  return results;
}

function checkLicenses(directory) {
  return new Promise((resolve) => {
    init({ start: directory, json: true }, (err, packages) => {
      if (err) {
        console.error(`Error checking licenses in ${directory}:`, err);
        resolve([]); // Return an empty list on error to keep processing other directories
        return;
      }

      const disallowed = Object.keys(packages).filter((pkg) => {
        const license = packages[pkg].licenses;
        const licenseList = Array.isArray(license) ? license : [license];
        const isRootProject = pkg.startsWith("client@");
        return (
          !isRootProject &&
          licenseList.some((lic) => !allowedLicenses.includes(lic))
        );
      });

      // Map disallowed packages to their directory and license information
      const results = disallowed.map((pkg) => ({
        package: pkg,
        directory,
        licenses: packages[pkg].licenses,
      }));

      resolve(results);
    });
  });
}

function runNpmInstall(directory) {
  try {
    console.log(`Running npm install in ${directory}...`);
    execSync("npm install", { cwd: directory, stdio: "inherit" });
    console.log(`npm install completed in ${directory}.`);
  } catch (error) {
    console.error(`Error running npm install in ${directory}:`, error.message);
  }
}

async function main() {
  const rootDir = ".";
  console.log("Finding all package.json files...");
  const packageJsonFiles = findAllPackageJsonFiles(rootDir);

  console.log("Running npm install in all directories...");
  for (const file of packageJsonFiles) {
    const dir = join(file, "..");
    runNpmInstall(dir);
  }

  console.log("Checking licenses...");
  const allDisallowedPackages = [];

  for (const file of packageJsonFiles) {
    const dir = join(file, "..");
    console.log(`Checking licenses in ${dir}...`);
    const disallowedPackages = await checkLicenses(dir);
    allDisallowedPackages.push(...disallowedPackages);
  }

  if (allDisallowedPackages.length > 0) {
    console.log("\nDisallowed licenses found:");
    allDisallowedPackages.forEach(({ package: pkg, directory, licenses }) => {
      console.log(`- ${pkg} (in ${directory}): ${licenses}`);
    });
    process.exit(1); // Exit with failure if disallowed licenses are found
  } else {
    console.log("All licenses are allowed across all discovered packages!");
  }
}

main();
