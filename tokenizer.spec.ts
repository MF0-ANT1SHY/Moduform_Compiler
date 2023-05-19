import { expect, test } from "vitest";
import { TokenTypes,tokenizer } from "./tokenizer";

test('paren',()=>{
    const code = "(";
    const tokens = [{
        type: TokenTypes,
        value: "(",
    }];

    expect(tokenizer(code)).toEqual(tokens);
})
