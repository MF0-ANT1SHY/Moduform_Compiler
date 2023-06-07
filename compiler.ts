import { parser } from "./parser";
import { tokenizer } from "./tokenizer";
import * as fs from "fs";

function compiler() {
  let code = fs.readFileSync("./data.txt", "utf-8");
  let tokens = tokenizer(code);
  let ast = parser(tokens);
  fs.writeFileSync("./data.json", JSON.stringify(ast, null, 4));
}

compiler();
