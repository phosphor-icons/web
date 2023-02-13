const path = require("path");

const CORE_PATH = path.join(__dirname, "../core/assets");
const SRC_PATH = path.join(__dirname, "../src");
const CODEPOINTS_PATH = path.join(SRC_PATH, "unicodesMap.json");
const FONTS_PATH = path.join(SRC_PATH, "fonts");

module.exports = {
  CORE_PATH,
  CODEPOINTS_PATH,
  FONTS_PATH,
  SRC_PATH,
};
