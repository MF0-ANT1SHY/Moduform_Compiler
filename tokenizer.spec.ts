import { expect, test } from "vitest";
import { TokenTypes,tokenizer } from "./tokenizer";

test('paren',()=>{
    const code = "(";
    const tokens = [{
        type: TokenTypes.Paren,
        value: "(",
    }];

    expect(tokenizer(code)).toEqual(tokens);
})

test('letter',()=>{
    const code = "contract";
    const tokens = [{
        type: TokenTypes.Letter,
        value: "contract",
    }];

    expect(tokenizer(code)).toEqual(tokens);
})

test('address',()=>{
    const code = "0x123321123321123321";
    const tokens = [{
        type: TokenTypes.Address,
        value: "0x123321123321123321",
    }];

    expect(tokenizer(code)).toEqual(tokens);
})