import { test, expect } from "vitest";
import { TokenTypes } from "./tokenizer";
import { NodeTypes, parser } from "./parser";

test(`A := 0x123123123;`, () => {
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
        {
            type: TokenTypes.SEMICOLON,
            value: `;`,
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

test(`[A,B] create contract IOTrade;`, () => {
    const tokens = [
        {
            type: TokenTypes.LEFTBRACKET,
            value: `[`,
        },
        {
            type: TokenTypes.LETTER,
            value: "A",
        },
        {
            type: TokenTypes.COLON,
            value: `,`,
        },
        {
            type: TokenTypes.LETTER,
            value: "B",
        },
        {
            type: TokenTypes.RIGHTBRACKET,
            value: `]`,
        },
        {
            type: TokenTypes.CREATE,
            value: "create",
        },
        {
            type: TokenTypes.CONTRACT,
            value: "contract",
        },
        {
            type: TokenTypes.LETTER,
            value: "IOTrade",
        },
        {
            type: TokenTypes.SEMICOLON,
            value: `;`,
        },
    ];
    const ast = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.CreateExpression,
                body: [
                    {
                        type: NodeTypes.UserArray,
                        body: [
                            `A`,
                            `B`,
                        ],
                    },
                    {
                        type: NodeTypes.Contract,
                        value: `IOTrade`,
                    },
                ],
            },
        ],
    };

    expect(parser(tokens)).toEqual(ast);
})

test(`
A := 0x123321123321;
B := 0x321123321123;
[A,B] create contract IOTrade;
`, () => {
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
            value: "0x123321123321",
        },
        {
            type: TokenTypes.SEMICOLON,
            value: `;`,
        },
        {
            type: TokenTypes.LETTER,
            value: "B",
        },
        {
            type: TokenTypes.ASSIGNMENT,
            value: ":=",
        },
        {
            type: TokenTypes.ADDRESS,
            value: "0x321123321123",
        },
        {
            type: TokenTypes.SEMICOLON,
            value: `;`,
        },
        {
            type: TokenTypes.LEFTBRACKET,
            value: `[`,
        },
        {
            type: TokenTypes.LETTER,
            value: "A",
        },
        {
            type: TokenTypes.COLON,
            value: `,`,
        },
        {
            type: TokenTypes.LETTER,
            value: "B",
        },
        {
            type: TokenTypes.RIGHTBRACKET,
            value: `]`,
        },
        {
            type: TokenTypes.CREATE,
            value: "create",
        },
        {
            type: TokenTypes.CONTRACT,
            value: "contract",
        },
        {
            type: TokenTypes.LETTER,
            value: "IOTrade",
        },
        {
            type: TokenTypes.SEMICOLON,
            value: `;`,
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
                        value: `0x123321123321`,
                    },
                ],
            },
            {
                type: NodeTypes.AssignmentExpression,
                body: [
                    {
                        type: NodeTypes.User,
                        value: `B`,
                    },
                    {
                        type: NodeTypes.Assignment,
                        value: `:=`,
                    },
                    {
                        type: NodeTypes.Address,
                        value: `0x321123321123`,
                    },
                ],
            },
            {
                type: NodeTypes.CreateExpression,
                body: [
                    {
                        type: NodeTypes.UserArray,
                        body: [
                            `A`,
                            `B`,
                        ],
                    },
                    {
                        type: NodeTypes.Contract,
                        value: `IOTrade`,
                    },
                ],
            },
        ],
    };

    expect(parser(tokens)).toEqual(ast);
})


test.skip(`
TimeLock: time between 600 and 900;
`, () => {
    const tokens = [
        {
            type: TokenTypes.LETTER,
            value: `TimeLock`,
        },
        {
            type: TokenTypes.COLON,
            value: `:`,
        },
        {
            type: TokenTypes.TIME,
            value: `time`
        },
        {
            type: TokenTypes.BETWEEN,
            value: `between`,
        },
        {
            type: TokenTypes.NUMBER,
            value: `600`,
        },
        {
            type: TokenTypes.AND,
            value: `and`,
        },
        {
            type: TokenTypes.NUMBER,
            value: `900`,
        },
        {
            type: TokenTypes.SEMICOLON,
            value: `;`,
        },
    ];

    const ast = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.PropertyExpression,
                body: [
                    {
                        type: NodeTypes.MINDELAY,
                        value: `600`,
                    },
                    {
                        type: NodeTypes.MAXDELAY,
                        value: `900`,
                    },
                ],
            },
        ]
    };

    expect(parser(tokens)).toEqual(ast);
})

test(`
use template TimeLock;
`, () => {
    const tokens = [
        {
            type: TokenTypes.USE,
            value: `use`,
        },
        {
            type: TokenTypes.TEMPLATE,
            value: `template`,
        },
        {
            type: TokenTypes.LETTER,
            value: `TimeLock`,
        },
        {
            type: TokenTypes.SEMICOLON,
            value: `;`,
        },
    ];

    const ast = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.Template,
                value: `TimeLock`,
            },
        ]
    };

    expect(parser(tokens)).toEqual(ast);
})

test(`
use template TimeLock;
TimeLock: time between 600 and 900;
`, () => {
    const tokens = [
        {
            type: TokenTypes.USE,
            value: `use`,
        },
        {
            type: TokenTypes.TEMPLATE,
            value: `template`,
        },
        {
            type: TokenTypes.LETTER,
            value: `TimeLock`,
        },
        {
            type: TokenTypes.SEMICOLON,
            value: `;`,
        },
        {
            type: TokenTypes.LETTER,
            value: `TimeLock`,
        },
        {
            type: TokenTypes.COLON,
            value: `:`,
        },
        {
            type: TokenTypes.TIME,
            value: `time`
        },
        {
            type: TokenTypes.BETWEEN,
            value: `between`,
        },
        {
            type: TokenTypes.NUMBER,
            value: `600`,
        },
        {
            type: TokenTypes.AND,
            value: `and`,
        },
        {
            type: TokenTypes.NUMBER,
            value: `900`,
        },
        {
            type: TokenTypes.SEMICOLON,
            value: `;`,
        },
    ];

    const ast = {
        type: NodeTypes.Root,
        body: [
            {
                type: NodeTypes.Template,
                value: `TimeLock`,
            },
            {
                type: NodeTypes.PropertyExpression,
                body: [
                    {
                        type: NodeTypes.MINDELAY,
                        value: `600`,
                    },
                    {
                        type: NodeTypes.MAXDELAY,
                        value: `900`,
                    },
                ],
            },
        ]
    };

    expect(parser(tokens)).toEqual(ast);
})