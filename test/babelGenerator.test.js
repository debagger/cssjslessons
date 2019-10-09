const assert = require("assert");
const { parse } = require("@babel/parser");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

describe("Babel codegenerator usecase", function() {
  it("roundtrip", function() {
    const code = `function test(param1, param2 = false) {
  console.log(param1);
} //Its comment


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

    const output = generate(program);
    assert.equal(
      output.code,
      `//Its comment
const var1 = 123;`
    );
  });

  it("render if condition", function() {
    const cond = template.ast("f(a) && b || !(c && b)");
    const body = template.ast("var1 = false;");
    const ast = template("if(%%cond%%){%%body%%}")({
      cond: cond.expression,
      body: body
    });
    const output = generate(ast);
    assert.equal(
      output.code,
      `if (f(a) && b || !(c && b)) {
  var1 = false;
}`
    );
  });
});
