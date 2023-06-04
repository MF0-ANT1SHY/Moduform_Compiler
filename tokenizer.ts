export enum TokenTypes {
    LEFTBRACKET,
    RIGHTBRACKET,
    PAREN,
    LETTER,
    ADDRESS,
    ASSIGNMENT,
    NUMBER,
    SEMICOLON,
    COLON,
    COMMA,
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
    [`template`,TokenTypes.TEMPLATE],
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
         * parse semicolon
         */
        if (char === `;`) {
            tokens.push({
                type: TokenTypes.SEMICOLON,
                value: `;`,
            })
            char = code[++current];
            continue;
        }

        /**
        * parse letter
        */
        let LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            LETTERS = /[a-z0-9]/i;
            let letter = "";
            while (LETTERS.test(char) && current < code.length) {
                letter += char;
                char = code[++current];
            }

            if (Keyword.get(letter) != undefined) {
                tokens.push({
                    type: Keyword.get(letter)!,
                    value: letter,
                });
            } else {
                tokens.push({
                    type: TokenTypes.LETTER,
                    value: letter,
                });
            }
            continue;
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
            continue;
        }

        /**
         * parse number
         */
        if(NUMBERS.test(char) && current <code.length){
            let number = ``;
            while(NUMBERS.test(char) && current <code.length){
                number+=char;
                char=code[++current];
            }
            tokens.push({
                type: TokenTypes.NUMBER,
                value: number,
            });
            continue;
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
            continue;
        }

        /**
         * parse colon
         * notice: this parse cannot move above 'parse assignment', because both of them include comma
         */
        if(char === `:`) {
            tokens.push({
                type: TokenTypes.COLON,
                value: `:`,
            })
            char = code[++current];
            continue;
        }
    }
    console.log(tokens);
    return tokens;
}