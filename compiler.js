"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser");
var tokenizer_1 = require("./tokenizer");
var fs = require("fs");
function compiler() {
    var code = fs.readFileSync("./data.txt", "utf-8");
    var tokens = (0, tokenizer_1.tokenizer)(code);
    var ast = (0, parser_1.parser)(tokens);
    fs.writeFileSync("./data.json", JSON.stringify(ast, null, 4));
}
compiler();
