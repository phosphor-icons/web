#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import chalk from "chalk";
import { parse } from "svgson";

import { SRC_PATH, readAssetsFromDisk, verifyIcons } from ".";
import { icons } from "../core/src";
import { version } from "../package.json";

const [MAJOR_VERSION, MINOR_VERSION] = version.split(".").map(parseInt);

const BASE_ATTRS = [{}];
const DUOTONE_ATTRS = [
  {
    fill: "rgb(68, 68, 68)",
    opacity: 0.2,
  },
  {
    fill: "rgb(68, 68, 68)",
  },
];
const DUOTONE_COLOR_THEMES = [
  [
    [0, 0, 0, 1],
    [68, 68, 68, 1],
  ],
];
const DUOTONE_COLOR_PERMUTATIONS = {
  "16868681": [
    {
      f: 1,
    },
    {
      f: 1,
    },
  ],
};

type IcoMoonGlyphEntry = {
  id: number;
  order: number;
  name: string;
  prevSize?: number;
  code?: number;
  tempChar?: string;
  ligatures?: string;
};

type IcoMoonIcon = {
  id: number;
  paths: string[];
  attrs: Record<string, any>[];
  isMulticolor: boolean;
  isMulticolor2: boolean;
  colorPermutations?: Record<string, any>;
  grid: number;
  tags: string[];
};

type IcoMoonSet = {
  id: number;
  metadata: {
    name: string;
    importSize: {
      width: number;
      height: number;
    };
  };
  height: number;
  prevSize: number;
  colorThemes?: unknown[];
  colorThemeIdx?: number;
  invisible: boolean;
  icons: IcoMoonIcon[];
  selection: IcoMoonGlyphEntry[];
};

type IcoMoonProject = {
  uid: number;
  IcoMoonType?: string; // TODO
  metadata: {
    name: string;
    created: number;
    lastOpened: number;
    url?: string;
    designer?: string;
    designerURL?: string;
    license?: string;
    licenseURL?: string;
  };
  preferences: {
    showGlyphs: boolean;
    showCodes: boolean;
    showQuickUse: boolean;
    showQuickUse2: boolean;
    showSVGs: boolean;
    fontPref: {
      prefix: string;
      metadata: {
        fontFamily: string;
        majorVersion: number;
        minorVersion: number;
        fontURL: string;
        description: string;
        copyright: string;
        designer: string;
        designerURL: string;
        license: string;
        licenseURL: string;
      };
      metrics: { emSize: number; baseline: number; whitespace: number };
      embed: boolean;
      noie8: boolean;
      ie7: boolean;
      includeMetadata: boolean;
      flutter: boolean;
      selector: "class" | "i";
      classSelector: string;
      showSelector: boolean;
      showMetrics: boolean;
      showMetadata: boolean;
      showVersion: boolean;
    };
    imagePref: {
      prefix: string;
      png: boolean;
      useClassSelector: boolean;
      color: number;
      bgColor: number;
      classSelector: string;
    };
    height: number;
    historySize: number;
    gridSize: number;
    showLiga: true;
  };
  iconSets: IcoMoonSet[];
};

const project: IcoMoonProject = {
  uid: -1,
  IcoMoonType: "selection",
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
      metrics: { emSize: 1024, baseline: 6.25, whitespace: 50 },
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
    height: 1024,
    historySize: 50,
    gridSize: 16,
    showLiga: true,
  },
  iconSets: [],
};

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

      const assets = readAssetsFromDisk();
      if (!verifyIcons(assets)) {
        process.exit(1);
      }

      let sets: Record<string, IcoMoonSet> = {
        regular: createIconSet(0, "Regular"),
        thin: createIconSet(1, "Thin"),
        light: createIconSet(2, "Light"),
        bold: createIconSet(3, "Bold"),
        fill: createIconSet(4, "Fill"),
        duotone: createIconSet(5, "Duotone"),
      };

      let idx = 0;
      let errors: string[] = [];

      for (const entry of icons) {
        let weights =
          assets[entry.name] ??
          ((entry as any).alias ? assets[(entry as any).alias!.name] : null);
        if (!weights) {
          console.error(
            `${chalk.inverse.red(" FAIL ")} ${entry.name} not found in assets`
          );
          process.exit(1);
        }

        for (const [weight, svgString] of Object.entries(weights)) {
          const canonicalName =
            weight === "regular" ? entry.name : `${entry.name}-${weight}`;
          const canonicalAlias = (entry as any).alias
            ? weight === "regular"
              ? (entry as any).alias.name
              : `${(entry as any).alias.name}-${weight}`
            : null;
          try {
            const paths = await getPaths(canonicalName, svgString);
            const isMulticolor = weight === "duotone";

            const icon: IcoMoonIcon = {
              id: idx,
              paths,
              grid: 0,
              attrs: isMulticolor ? DUOTONE_ATTRS : BASE_ATTRS,
              isMulticolor,
              isMulticolor2: isMulticolor,
              tags: [canonicalName],
              colorPermutations: isMulticolor
                ? DUOTONE_COLOR_PERMUTATIONS
                : undefined,
            };
            sets[weight].icons.push(icon);

            const selection: IcoMoonGlyphEntry = {
              id: idx,
              order: idx,
              name:
                canonicalName + (canonicalAlias ? `,${canonicalAlias}` : ""),
              code: entry.codepoint,
              tempChar: String.fromCharCode(entry.codepoint),
              ligatures: weight === "duotone" ? undefined : canonicalName,
            };
            sets[weight].selection.push(selection);
          } catch (e) {
            errors.push(e.message);
          }
        }

        idx++;
        console.info(`${chalk.inverse.green(" DONE ")} ${entry.name}`);
      }

      project.iconSets.push(...Object.values(sets));

      if (errors.length > 0) {
        console.error(
          `${chalk.inverse.red(" FAIL ")} ${errors.length} errors encountered`
        );

        console.group();
        for (const msg of errors) {
          console.error(msg);
        }
        console.groupEnd();
        process.exit(1);
      } else {
        console.info(
          `${chalk.inverse.green(" DONE ")} ${icons.length} icons processed`
        );
      }

      fs.writeFileSync(
        path.join(SRC_PATH, "Phosphor.json"),
        JSON.stringify(project)
      );
    }
  );
})();

async function getPaths(iconName: string, svgString: string) {
  const { children } = await parse(svgString);

  if (children.length === 0) {
    const error = `${chalk.inverse.red(" FAIL ")} ${iconName} has no elements`;
    console.error(error);
    throw new Error(error);
  }

  if (!children.every((child) => child.name === "path")) {
    const error = `${chalk.inverse.red(
      " FAIL "
    )} ${iconName} has non-path elements`;
    console.error(error);
    throw new Error(error);
  }

  if (!children.every((child) => child.children.length === 0)) {
    const error = `${chalk.inverse.red(
      " FAIL "
    )} ${iconName} has nested elements`;
    console.error(error);
    throw new Error(error);
  }

  return children.map((child) => child.attributes.d);
}

function createIconSet(
  id: number,
  name: string,
  color: boolean = false
): IcoMoonSet {
  return {
    id,
    metadata: {
      name,
      importSize: {
        width: 256,
        height: 256,
      },
    },
    height: 256,
    prevSize: 16,
    colorThemes: [],
    invisible: false,
    icons: [],
    selection: [],
    ...(color ? { colorThemes: DUOTONE_COLOR_THEMES, colorThemeIdx: 0 } : {}),
  };
}
