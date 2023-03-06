#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { exec } = require("child_process");

const { CORE_PATH, SRC_PATH } = require("./index");
const { ALIASES } = require("../core/bin");

const icons = {};
const weights = ["thin", "light", "regular", "bold", "fill", "duotone"];

main();

async function main() {
  exec(
    "git submodule update --remote --init --force --recursive",
    async (err, _stdout, stderr) => {
      if (err) {
        console.error(`${chalk.inverse.red(" ERR ")} ${err.message}`);
        process.exit(1);
      }

      if (stderr) {
        console.error(`${chalk.inverse.red(" ERR ")} ${stderr}`);
        process.exit(1);
      }

      console.log(
        `${chalk.inverse.green(" OK ")} Updated submodule @phosphor-icons/core`
      );

      loadWeights();
      await transformDuotoneStylesheet();
      await includeAliases();
    }
  );
}

function readFile(pathname, name, weight) {
  const file = fs.readFileSync(pathname);
  icons[name][weight] = file.toString("utf-8");
}

function checkFiles(icon) {
  const weightsPresent = Object.keys(icon);
  return (
    weightsPresent.length === 6 &&
    weightsPresent.every((w) => weights.includes(w))
  );
}

function loadWeights() {
  const weightFolder = fs.readdirSync(CORE_PATH, "utf-8");

  weightFolder.forEach((weightFolder) => {
    if (!fs.lstatSync(path.join(CORE_PATH, weightFolder)).isDirectory()) return;

    if (!weights.includes(weightFolder)) {
      console.error(
        `${chalk.inverse.red(" ERR ")} Bad folder name ${weightFolder}`
      );
      process.exit(1);
    }

    const files = fs.readdirSync(path.join(CORE_PATH, weightFolder));
    files.forEach((filename) => {
      let name;
      const nameParts = filename.split(".svg")[0].split("-");
      if (nameParts[nameParts.length - 1] === weightFolder) {
        name = nameParts.slice(0, -1).join("-");
      } else {
        name = nameParts.join("-");
      }

      if (!icons[name]) {
        icons[name] = {};
      }
      const filepath = path.join(CORE_PATH, weightFolder, filename);
      readFile(filepath, name, weightFolder);
    });
  });
}

async function transformDuotoneStylesheet() {
  let passes = 0;
  let fails = 0;

  for (let name in icons) {
    const icon = icons[name];

    if (!checkFiles(icon)) {
      fails += 1;
      console.error(
        `${chalk.inverse.red(" FAIL ")} ${name} is missing weights`
      );
      console.group();
      console.error(weights.filter((w) => !Object.keys(icon).includes(w)));
      console.groupEnd();
      continue;
    }

    passes += 1;
  }

  const duotoneCSSPath = path.join(SRC_PATH, "./duotone/style.css");
  const css = fs.readFileSync(duotoneCSSPath).toString("utf-8");
  const remappedCSS = css
    .replace(/ \.path1:before/g, ":before")
    .replace(/ \.path2:before/g, ":after")
    .replace(/color: rgb.*;\n/g, "");

  if (remappedCSS.includes("path3")) {
    console.error(
      `${chalk.inverse.red(" FAIL ")} Some duotone icons have mutiple paths`
    );
    process.exit(1);
  }

  fs.writeFileSync(duotoneCSSPath, remappedCSS);
}

async function includeAliases() {
  for (const weight of weights) {
    const stylesheetPath = path.join(SRC_PATH, `./${weight}/style.css`);
    let css = fs.readFileSync(stylesheetPath).toString("utf-8");

    Object.entries(ALIASES).forEach(([name, alias]) => {
      const expr = new RegExp(
        `\.ph${
          weight === "regular" ? "" : `-${weight}`
        }.ph-${name}:(before|after)`,
        "g"
      );

      css = css.replace(
        expr,
        (match) => `${match}, ${match.replace(name, alias)}`
      );
    });

    fs.writeFileSync(stylesheetPath, css);
  }
}
