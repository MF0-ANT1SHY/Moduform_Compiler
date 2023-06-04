import { expect, test } from "vitest";
import { TokenTypes, tokenizer } from "./tokenizer";

test.skip('[]', () => {
    const code = `[ ]`;
    const tokens = [{
        type: TokenTypes.LEFTBRACKET,
        value: `[`,
    },
    {
        type: TokenTypes.RIGHTBRACKET,
        value: `]`,
    }];

    expect(tokenizer(code)).toEqual(tokens);
})

test.skip('letter', () => {
    const code = "contract";
    const tokens = [{
        type: TokenTypes.CONTRACT,
        value: "contract",
    }];

    expect(tokenizer(code)).toEqual(tokens);
})

test.skip('address', () => {
    const code = "0x123321123321123321";
    const tokens = [{
        type: TokenTypes.ADDRESS,
        value: "0x123321123321123321",
    }];

    expect(tokenizer(code)).toEqual(tokens);
})

test.skip('assignment', () => {
    const code = ':=';
    const tokens = [{
        type: TokenTypes.ASSIGNMENT,
        value: ":=",
    }]

    expect(tokenizer(code)).toEqual(tokens);
})

test('create contract', () => {
    const code = `A := 0x123123123;
                  B := 0x321123321;
                  [A, B] create contract IOTrade;`;
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
        {
            type: TokenTypes.LETTER,
            value: `B`,
        },
        {
            type: TokenTypes.ASSIGNMENT,
            value: ":=",
        },
        {
            type: TokenTypes.ADDRESS,
            value: "0x321123321",
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
            type: TokenTypes.COMMA,
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
    ]
    expect(tokenizer(code)).toEqual(tokens);
})

test(`
use template TimeLock;
TimeLock: time between 600 and 900;
`, () => {
    const code = `
use template TimeLock;
TimeLock: time between 600 and 900;
    `;
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

    expect(tokenizer(code)).toEqual(tokens);
})

test(`
use template MultiTrans;
MultiTrans: need 3 in [A,B,C];
`, () => {
    const code = `
use template MultiTrans;
MultiTrans: need 3 in [A,B,C];
    `;
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

    expect(tokenizer(code)).toEqual(tokens);
})

test(`
Limit Upload actived by User when [s1,s2,s3] then s4;
`, () => {
    const code = `
Limit Upload actived by User when [s1,s2,s3] then s4;
    `;
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

    expect(tokenizer(code)).toEqual(tokens);
})