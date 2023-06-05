const toLow = require("../firstCharLowerCase");

module.exports = (componentName) => `.${toLow(componentName)} {

}`;
