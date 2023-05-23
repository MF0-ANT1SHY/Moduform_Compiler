export enum TokenTypes {
    Leftbracket,
    Rightbracket,
    Paren,
    Letter,
    Address,
    Assignment,
}

interface Token {
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
        if(char === `[`){
            tokens.push({
                type: TokenTypes.Leftbracket,
                value: char,
            });
            char = code[++current];
            continue;
        }

        /**
         * parse Rightbracket
         */
        if(char === `]`){
            tokens.push({
                type: TokenTypes.Rightbracket,
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

            tokens.push({
                type: TokenTypes.Letter,
                value: letter,
            });
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
                type: TokenTypes.Address,
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
                type: TokenTypes.Assignment,
                value: equal,
            })
        }
    }
    console.log(tokens);
    return tokens;
}