const fs = require("fs/promises");
const resolveRoot = require("../resolveRoot");
const createModel = require("./createModel");
const createUI = require("./createUI");
const createPublicApi = require("./createPublicApi");
const toUpper = require("../firstCharUpperCase");

module.exports = async (layer, sliceName) => {
  try {
    await fs.mkdir(resolveRoot("src", layer, toUpper(sliceName)));
  } catch (e) {
    console.log(`не удалось создать директорию для слайса${sliceName}`);
  }

  await createModel(layer, sliceName);
  await createUI(layer, sliceName);
  await createPublicApi(layer, sliceName);
};
