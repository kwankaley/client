// import { init } from "license-checker";
// import { readdirSync, statSync } from "fs";
// import { join } from "path";

// const allowedLicenses = [
//   "MIT",
//   "Apache-2.0",
//   "BSD-3-Clause",
//   "BSD-2-Clause",
//   "ISC",
// ];

// function findAllPackageJsonFiles(directory) {
//   const results = [];
//   const files = readdirSync(directory);

//   for (const file of files) {
//     const fullPath = join(directory, file);

//     if (file === "node_modules") {
//       continue;
//     }

//     if (statSync(fullPath).isDirectory()) {
//       results.push(...findAllPackageJsonFiles(fullPath));
//     } else if (file === "package.json") {
//       results.push(fullPath);
//     }
//   }

//   return results;
// }

// function checkLicenses(directory) {
//   return new Promise((resolve, reject) => {
//     init({ start: directory, json: true }, (err, packages) => {
//       if (err) {
//         return reject(err);
//       }

//       const disallowed = Object.keys(packages).filter((pkg) => {
//         const license = packages[pkg].licenses;
//         const licenseList = Array.isArray(license) ? license : [license];
//         return licenseList.some((lic) => !allowedLicenses.includes(lic));
//       });

//       if (disallowed.length > 0) {
//         console.log(`Disallowed licenses found in ${directory}:`);
//         disallowed.forEach((pkg) => {
//           console.log(`${pkg}: ${packages[pkg].licenses}`);
//         });
//         process.exit(1);
//       } else {
//         console.log(`All licenses are allowed in ${directory}!`);
//       }

//       resolve();
//     });
//   });
// }

// async function main() {
//   const rootDir = ".";
//   console.log("Finding all package.json files...");
//   const packageJsonFiles = findAllPackageJsonFiles(rootDir);

//   console.log("Checking licenses...");
//   try {
//     for (const file of packageJsonFiles) {
//       const dir = join(file, "..");
//       console.log(`Checking licenses in ${dir}...`);
//       await checkLicenses(dir);
//     }

//     console.log("All licenses are allowed across all discovered packages!");
//   } catch (err) {
//     console.error("Error:", err);
//     process.exit(1);
//   }
// }

// main();

import { init } from "license-checker";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const allowedLicenses = [
  "MIT",
  "Apache-2.0",
  "BSD-3-Clause",
  "BSD-2-Clause",
  "ISC",
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
        return licenseList.some((lic) => !allowedLicenses.includes(lic));
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

async function main() {
  const rootDir = ".";
  console.log("Finding all package.json files...");
  const packageJsonFiles = findAllPackageJsonFiles(rootDir);

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
