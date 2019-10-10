const Context = require("./ContextBase");

module.exports = class RootContext extends Context {
  constructor(rootPath) {
    super();
    this.rootPath = rootPath;
    this.stylesheets = {};
  }

  readFile(filename) {
    let fullpath = path.join(this.rootPath, filename);
    const parsed = path.parse(fullpath);
    parsed.ext = "scss";
    parsed.base = parsed.name + "." + parsed.ext;
    fullpath = path.format(parsed);
    if (fs.existsSync(fullpath)) {
      console.log(fullpath);
      return fs.readFileSync(fullpath, "utf-8");
    }

    parsed.name = "_" + parsed.name;
    parsed.base = parsed.name + "." + parsed.ext;
    fullpath = path.format(parsed);
    if (fs.existsSync(fullpath)) {
      console.log(fullpath);
      return fs.readFileSync(fullpath, "utf-8");
    }
  }
};
