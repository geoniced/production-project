const createTemplate = require("./templates/createTemplate");

const layer = process.argv[2];
const sliceName = process.argv[3];

// process.argv.forEach((value, i) => console.log(`${i}:`, value));

const layers = ["features", "entities", "pages"];

if (!layer || !layers.includes(layer)) {
  throw new Error(`Укажите слой ${layers.join(" или ")}`);
}

if (!sliceName) {
  throw new Error("Укажите название слайса");
}

createTemplate(layer, sliceName);
