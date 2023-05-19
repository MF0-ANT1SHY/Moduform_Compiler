export enum TokenTypes {
    Paren,
    Letter,
    Address,
}

interface Token {
    type: TokenTypes;
    value: string;
}

export function tokenizer(code: string) {
    const tokens: Token[] = [];
    let current = 0;
    let char = code[current];

    /**
     * parse (
     */
    if (char === "(") {
        tokens.push({
            type: TokenTypes.Paren,
            value: char,
        });
    }

    /**
     * parse letter
     */
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)){
        let letter = "";
        while( LETTERS.test(char) && current< code.length){
            letter+=char;
            char=code[++current];
        }

        tokens.push({
            type:TokenTypes.Letter,
            value: letter,
        });
    }

    /**
     * parse address
     */
    let NUMBERS = /[0-9]/
    if(char==='0'&&code[current+1]==="x"){
        let address = "";
        address += char;
        char = code[++current];
        address += char;
        char = code[++current];
        while(NUMBERS.test(char) && current<code.length){
            address+=char;
            char=code[++current];
        }

        tokens.push({
            type:TokenTypes.Address,
            value:address,
        });
    }
    return tokens;
}