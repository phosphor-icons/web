#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { exec } from "child_process";

import {
  SRC_PATH,
  WEIGHTS,
  ALIASES,
  readAssetsFromDisk,
  verifyIcons,
  type AssetMap,
} from ".";

(async function main() {
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

      console.info(
        `${chalk.inverse.green(" OK ")} Updated submodule @phosphor-icons/core`
      );

      const icons = readAssetsFromDisk();
      if (!verifyIcons(icons)) {
        process.exit(1);
      }

      await transformDuotoneStylesheet(icons);
      // await includeAliases();
    }
  );
})();

async function transformDuotoneStylesheet(icons: AssetMap) {
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
  for (const weight of WEIGHTS) {
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
