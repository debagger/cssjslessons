import mix from "./mix.js";

export default {
  setPaddings(value) {
    return mix({
      "padding-left": value,
      "padding-right": value,
      "padding-botttom": value,
      "padding-top": value
    });
  }
};
