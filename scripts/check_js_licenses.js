// import { execSync } from "child_process";

// function checkJsLicenses() {
//   console.log("Installing Node.js dependencies...");
//   execSync("npm install", { stdio: "inherit" });

//   console.log("Running license-checker...");
//   execSync("npx license-checker --json --out js_licenses.json", {
//     stdio: "inherit",
//   });
// }

// try {
//   checkJsLicenses();
//   console.log("JavaScript license check completed successfully.");
// } catch (error) {
//   console.error("Error checking JavaScript licenses:", error.message);
//   process.exit(1);
// }

import { init } from "license-checker";

const allowedLicenses = [
  "MIT",
  "Apache-2.0",
  "BSD-3-Clause",
  "BSD-2-Clause",
  "ISC",
];

init({ start: ".", json: true }, function (err, packages) {
  if (err) {
    console.error("Error running license-checker:", err);
    process.exit(1);
  }

  const disallowed = Object.keys(packages).filter((pkg) => {
    const license = packages[pkg].licenses;
    return !allowedLicenses.includes(license);
  });

  if (disallowed.length > 0) {
    console.log("Disallowed licenses found:");
    disallowed.forEach((pkg) => {
      console.log(`${pkg}: ${packages[pkg].licenses}`);
    });
    process.exit(1);
  } else {
    console.log("All licenses are allowed!");
  }
});
