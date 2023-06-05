import { test, expect } from "vitest";
import fs from "fs";
import { tokenizer } from "./tokenizer";
import { parser } from "./parser";

test("compiler", () => {
    let code = fs.readFileSync("./data.txt", "utf8");
    let tokens = tokenizer(code);
    let ast = parser(tokens);
    //write to the data.json
    fs.writeFileSync("./data.json", JSON.stringify(ast, null, 4));
});