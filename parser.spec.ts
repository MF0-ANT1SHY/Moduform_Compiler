import { test, expect } from "vitest";
import { TokenTypes } from "./tokenizer";
import { NodeTypes, parser } from "./parser";

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

test(`
use template MultiTrans; 
MultiTrans: need 2 in [A,B,C];
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
            value: `MultiTrans`,
        },
        {
            type: TokenTypes.SEMICOLON,
            value: `;`,
        },
        {
            type: TokenTypes.LETTER,
            value: `MultiTrans`,
        },
        {
            type: TokenTypes.COLON,
            value: `:`,
        },
        {
            type: TokenTypes.NEED,
            value: `need`,
        },
        {
            type: TokenTypes.NUMBER,
            value: `3`,
        },
        {
            type: TokenTypes.IN,
            value: `in`,
        },
        {
            type: TokenTypes.LEFTBRACKET,
            value: `[`,
        },
        {
            type: TokenTypes.LETTER,
            value: `A`,
        },
        {
            type: TokenTypes.COMMA,
            value: `,`,
        },
        {
            type: TokenTypes.LETTER,
            value: `B`,
        },
        {
            type: TokenTypes.COMMA,
            value: `,`,
        },
        {
            type: TokenTypes.LETTER,
            value: `C`,
        },
        {
            type: TokenTypes.RIGHTBRACKET,
            value: `]`,
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
                value: `MultiTrans`,
            },
            {
                type: NodeTypes.PropertyExpression,
                body: [
                    {
                        type: NodeTypes.MINneed,
                        value: `3`,
                    },
                    {
                        type: NodeTypes.UserArray,
                        body: [
                            `A`,
                            `B`,
                            `C`,
                        ],
                    },
                ],
            },
        ],
    };
    expect(parser(tokens)).toEqual(ast);
})

test(`
Limit Upload actived by User when [s1,s2,s3] then s4;
`,()=>{
    const tokens = [
        {
            type: TokenTypes.LIMIT,
            value: `Limit`,
        },
        {
            type: TokenTypes.LETTER,
            value: `Upload`,
        },
        {
            type: TokenTypes.ACTIVED,
            value: `actived`,
        },
        {
            type: TokenTypes.BY,
            value: `by`,
        },
        {
            type: TokenTypes.LETTER,
            value: `User`,
        },
        {
            type: TokenTypes.WHEN,
            value: `when`,
        },
        {
            type: TokenTypes.LEFTBRACKET,
            value: `[`,
        },
        {
            type: TokenTypes.LETTER,
            value: `s1`,
        },
        {
            type: TokenTypes.COMMA,
            value: `,`,
        },
        {
            type: TokenTypes.LETTER,
            value: `s2`,
        },
        {
            type: TokenTypes.COMMA,
            value: `,`,
        },
        {
            type: TokenTypes.LETTER,
            value: `s3`,
        },
        {
            type: TokenTypes.RIGHTBRACKET,
            value: `]`,
        },
        {
            type: TokenTypes.THEN,
            value: `then`,
        },
        {
            type: TokenTypes.LETTER,
            value: `s4`,
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
                type: NodeTypes.LimitExpression,
                body: [
                    {
                        type: NodeTypes.Limit,
                        value: `Upload`,
                    },
                    {
                        type: NodeTypes.Access,
                        value: `User`,
                    },
                    {
                        type: NodeTypes.PreSignal,
                        body: [
                            `s1`,
                            `s2`,
                            `s3`,
                        ],
                    },
                    {
                        type: NodeTypes.Signal,
                        value: `s4`,
                    }
                ],
            }
        ],
    };

    expect(parser(tokens)).toEqual(ast);
})