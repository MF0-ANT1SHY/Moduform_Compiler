import { test, expect } from "vitest";
import { TokenTypes } from "./tokenizer";
import { NodeTypes, parser } from "./parser";

test(`number`, () => {
    const tokens = [
        {
            type: TokenTypes.Letter,
            value: "A",
        }
    ];

    const ast = {
        type: NodeTypes.Root, 
        body: [
            {
                type: NodeTypes.User,
                value: `A`,
            },
        ],
    };

    expect(parser(tokens)).toEqual(ast);
})