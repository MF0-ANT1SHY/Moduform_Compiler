import { test, expect } from "vitest";
import { TokenTypes } from "./tokenizer";
import { NodeTypes, parser } from "./parser";

test.skip(`User`, () => {
    const tokens = [
        {
            type: TokenTypes.LETTER,
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

test(`AssignmentExpression`, () => {
    const tokens = [
        {
            type: TokenTypes.LETTER,
            value: "A",
        },
        {
            type: TokenTypes.ASSIGNMENT,
            value: ":=",
        },
        {
            type: TokenTypes.ADDRESS,
            value: "0x123123123",
        },
    ];


    const ast = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.AssignmentExpression,
                body: [
                    {
                        type: NodeTypes.User,
                        value: `A`,
                    },
                    {
                        type: NodeTypes.Assignment,
                        value: `:=`,
                    },
                    {
                        type: NodeTypes.Address,
                        value: `0x123123123`,
                    },
                ],
            },
        ],
    };

    expect(parser(tokens)).toEqual(ast);
})