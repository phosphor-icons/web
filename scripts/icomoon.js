#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { parse } = require("svgson");

const { version } = require("../package.json");
const { CORE_PATH, CODEPOINTS_PATH, FONTS_PATH } = require("./index");
const codePoints = require(CODEPOINTS_PATH);

const [majorVersion, minorVersion] = version.split(".");

const WEIGHTS = new Set(["thin", "light", "regular", "bold", "fill"]);

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
        majorVersion,
        minorVersion,
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
  if (!codePoints) {
    console.error(`${chalk.inverse.red(" FAIL ")} codepoints not found`);
    process.exit(1);
  }

  const weights = fs.readdirSync(CORE_PATH, "utf-8");
  if (![...WEIGHTS].every((w) => weights.includes(w))) {
    console.error(
      `${chalk.inverse.red(
        " FAIL "
      )} assets path does not contain expected structure`
    );
    process.exit(1);
  }

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
