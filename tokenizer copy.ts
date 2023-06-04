export enum TokenTypes {
    LEFTBRACKET,
    RIGHTBRACKET,
    PAREN,
    LETTER,
    ADDRESS,
    ASSIGNMENT,
    NUMBER,
    COMMA,
    SEMICOLON,
    COLON,
    // keywords
    CREATE,
    CONTRACT,
    TIME,
    BETWEEN,
    AND,
    USE,
    TEMPLATE,
    NEED,
    IN,
    LIMIT,
    ACTIVED,
    BY,
    WHEN,
    THEN,
}

export let Keyword = new Map<string, TokenTypes>([
    [`create`, TokenTypes.CREATE],
    [`contract`, TokenTypes.CONTRACT],
    [`time`, TokenTypes.TIME],
    [`between`, TokenTypes.BETWEEN],
    [`and`, TokenTypes.AND],
    [`use`, TokenTypes.USE],
    [`TimeLock`, TokenTypes.TEMPLATE],
    [`MultiTrans`, TokenTypes.TEMPLATE],
    [`need`, TokenTypes.NEED],
    [`in`, TokenTypes.IN],
    [`Limit`, TokenTypes.LIMIT],
    [`actived`, TokenTypes.ACTIVED],
    [`by`, TokenTypes.BY],
    [`when`, TokenTypes.WHEN],
    [`then`, TokenTypes.THEN],
]);

export interface Token {
    type: TokenTypes;
    value: string;
}

export function tokenizer(code: string) {
    const tokens: Token[] = [];
    let current = 0;
    let char = code[current];
    while (current < code.length) {
        /**
        * jump space and \n
        */
        let WHITESPACES = /[\s\n]/;
        if (WHITESPACES.test(char)) {
            char = code[++current];
            continue;
        }

        /**
         * parse Leftbracket
         */
        if (char === `[`) {
            tokens.push({
                type: TokenTypes.LEFTBRACKET,
                value: char,
            });
            char = code[++current];
            continue;
        }

        /**
         * parse Rightbracket
         */
        if (char === `]`) {
            tokens.push({
                type: TokenTypes.RIGHTBRACKET,
                value: char,
            });
            char = code[++current];
            continue;
        }

        /**
         * parse comma 
         */
        if (char === `,`) {
            tokens.push({
                type: TokenTypes.COMMA,
                value: char,
            });
            char = code[++current];
            continue;
        }

        /**
         * parse COLON 
         */
        if (char === `:`) {
            tokens.push({
                type: TokenTypes.COLON,
                value: char,
            });
            char = code[++current];
            continue;
        }

        /**
        * parse letter
        */
        let LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            let letter = "";
            while (LETTERS.test(char) && current < code.length) {
                letter += char;
                char = code[++current];
            }

            if (Keyword.get(letter) != undefined) {
                tokens.push({
                    type: Keyword.get(letter)!, // checked before, so type would never be undefined
                    value: letter,
                });
            } else {
                tokens.push({
                    type: TokenTypes.LETTER,
                    value: letter,
                });
            }
        }

        /**
        * parse address
        */
        let NUMBERS = /[0-9]/;
        if (char === '0' && code[current + 1] === "x") {
            let address = "";
            address += char;
            char = code[++current];
            address += char;
            char = code[++current];
            while (NUMBERS.test(char) && current < code.length) {
                address += char;
                char = code[++current];
            }
            tokens.push({
                type: TokenTypes.ADDRESS,
                value: address,
            });
        }

        /**
        * parse assignment 
        */
        if (char === ':' && code[current + 1] === "=") {
            let equal = "";
            equal += char;
            char = code[++current];
            equal += char;
            char = code[++current];

            tokens.push({
                type: TokenTypes.ASSIGNMENT,
                value: equal,
            })
        }

        /**
         * parse semicolon
         */
        if (char === `;`) {
            if (current < code.length) {
                char = code[++current];
            }
            tokens.push({
                type: TokenTypes.SEMICOLON,
                value: `;`,
            })
        }
    }
    console.log(tokens);
    return tokens;
}