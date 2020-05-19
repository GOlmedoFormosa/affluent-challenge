const clear = async function ( selector) {
  await this.evaluate(selector => {
    document.querySelector(selector).value = "";
  }, selector);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  clear,
  capitalizeFirstLetter
}