import mixins from "./mixins.js";
export default {
  body: mixins.setPaddings("0px")({
    padding: "0px",
    color: "blue",
    background: "yellow"
  }),
  h1: mixins.setPaddings("100px")({
    "font-size": "100px"
  })
};
