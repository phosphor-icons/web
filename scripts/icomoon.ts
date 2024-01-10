#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { parse } from "svgson";

import {
  CORE_PATH,
  FONTS_PATH,
  WEIGHTS,
  readAssetsFromDisk,
  verifyIcons,
} from ".";
import { version } from "../package.json";

const [MAJOR_VERSION, MINOR_VERSION] = version.split(".");

const IcoMoon = {
  uid: -1,
  IcoMoonType: "selection",
  icons: [],
  height: 256,
  metadata: {
    name: "Phosphor",
    lastOpened: 0,
    created: 1704094527975,
    url: "https://phosphoricons.com",
    designer: "Tobias Fried & Helena Zhang",
    designerURL: "https://phosphoricons.com",
    license: "MIT",
    licenseURL:
      "https://raw.githubusercontent.com/phosphor-icons/homepage/master/LICENSE",
  },
  preferences: {
    showGlyphs: true,
    showCodes: true,
    showQuickUse: true,
    showQuickUse2: true,
    showSVGs: true,
    fontPref: {
      prefix: "ph-",
      metadata: {
        fontFamily: "Phosphor",
        majorVersion: MAJOR_VERSION,
        minorVersion: MINOR_VERSION,
        fontURL: "https://phosphoricons.com",
        description: "A flexible icon family for everyone",
        copyright: "Phosphor Icons",
        designer: "Tobias Fried & Helena Zhang",
        designerURL: "https://phosphoricons.com",
        license: "MIT",
        licenseURL:
          "https://raw.githubusercontent.com/phosphor-icons/homepage/master/LICENSE",
      },
      metrics: { emSize: 256, baseline: 0, whitespace: 0 },
      embed: false,
      noie8: true,
      ie7: false,
      includeMetadata: true,
      flutter: false,
      showSelector: true,
      selector: "class",
      classSelector: ".ph",
      showMetrics: true,
      showMetadata: true,
      showVersion: true,
    },
    imagePref: {
      prefix: "icon-",
      png: true,
      useClassSelector: true,
      color: 0,
      bgColor: 16777215,
      classSelector: ".icon",
    },
    historySize: 50,
    gridSize: 16,
    showLiga: true,
  },
};

(async function main() {
  const icons = readAssetsFromDisk();
  if (!verifyIcons(icons)) {
    process.exit(1);
  }

  Object.entries(icons).forEach(([name, weights], idx) => {});

  let iconIdx = 0;
  for (const weight of WEIGHTS) {
    const icons = fs.readdirSync(path.join(CORE_PATH, weight));
    for (const file of icons) {
      const [iconName] = file.split(".");

      const svgString = fs
        .readFileSync(path.join(CORE_PATH, weight, file))
        .toString();

      // Parse SVG to JSON
      const paths = await getPaths(iconName, svgString);
      const codePoint = codePoints[`ph-${iconName}`];

      if (!codePoint) {
        console.error(
          `${chalk.inverse.red(" FAIL ")} ${iconName} has no codepoint declared`
        );
        process.exit(1);
      }

      IcoMoon.icons.push({
        icon: {
          paths,
          attrs: [{}],
          isMulticolor: false,
          isMulticolor2: false,
          grid: 0,
          tags: [iconName],
        },
        attrs: [{}],
        properties: {
          order: iconIdx + 1,
          id: iconIdx + 1,
          name: iconName,
          prevSize: 32,
          code: codePoint,
        },
        setIdx: 0,
        setId: 0,
        iconIdx,
      });

      console.log(`${chalk.inverse.green(" DONE ")} ${iconName}`);
      iconIdx++;
    }
  }

  fs.writeFileSync(
    path.join(FONTS_PATH, "Phosphor.json"),
    JSON.stringify(IcoMoon)
  );
})();

async function getPaths(iconName, svgString) {
  const { children } = await parse(svgString);

  if (children.length === 0) {
    console.error(`${chalk.inverse.red(" FAIL ")} ${iconName} has no elements`);
    process.exit(1);
  }

  if (!children.every((child) => child.name === "path")) {
    console.error(
      `${chalk.inverse.red(" FAIL ")} ${iconName} has non-path elements`
    );
    process.exit(1);
  }

  if (!children.every((child) => child.children.length === 0)) {
    console.error(
      `${chalk.inverse.red(" FAIL ")} ${iconName} has nested elements`
    );
    process.exit(1);
  }

  return children.map((child) => child.attributes.d);
}

function createIconSet(id: number, name: string) {
  return {
    id,
    metadata: {
      name,
      importSize: {
        width: 256,
        height: 256,
      },
    },
    height: 1024,
    prevSize: 16,
    colorThemes: [],
    invisible: false,
    icons: [],
    selections: [],
  };
}

function createSelection() {}
