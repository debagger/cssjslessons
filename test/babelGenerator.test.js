const assert = require("assert");
const { parse } = require("@babel/parser");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

describe.only("Babel codegenerator usecase", function() {
  it("roundtrip", function() {
    const code = `function test(param1, param2 = false) {
  console.log(param1);
} 

//Its comment

const p = "Hello, world!";
test(p);`;
    let ast = parse(code);

    const del = node => {
      delete node.start;
      delete node.end;
      delete node.loc;
      for (const key in node) {
        if (node.hasOwnProperty(key)) {
          const element = node[key];
          if (element instanceof Object) del(element);
        }
      }
    };

    del(ast);
    ast = ast.program;
    const json = JSON.stringify(ast, null, " ");
    //console.log(json);
    ast = JSON.parse(json);
    const output = generate(ast);
    console.log(output.code);
    assert.equal(output.code, code);
  });
  it("render comment", function() {
    const program = t.program([], [], "script");
    t.addComment(program, "inner", "Its comment", true);
    program.body.push(
      t.variableDeclaration("const", [
        t.variableDeclarator(t.identifier("var1"), t.numericLiteral(123))
      ])
    );

    const ast = template(`const %%var%% = %%val%%;`)({
      var: t.identifier("var1"),
      val: t.numericLiteral(123)
    });

    console.log(generate(ast));

    const output = generate(program);
    assert.equal(output.code, "//Its comment");
  });
});
