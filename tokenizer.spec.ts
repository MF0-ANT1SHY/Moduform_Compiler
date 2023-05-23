import { expect, test } from "vitest";
import { TokenTypes,tokenizer } from "./tokenizer";

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

test('assignment',()=>{
    const code = ':=';
    const tokens = [{
        type: TokenTypes.Assignment,
        value: ":=",
    }]
    
    expect(tokenizer(code)).toEqual(tokens);
})

test('test space',()=>{
    const code = 'A := 0x123123123';
    const tokens = [
        {
            type: TokenTypes.Letter,
            value: "A",
        },
        {
            type: TokenTypes.Assignment,
            value: ":=",
        },
        {
            type: TokenTypes.Address,
            value: "0x123123123",
        },
    ]
    expect(tokenizer(code)).toEqual(tokens);
})