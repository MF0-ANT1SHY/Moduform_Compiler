"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizer = exports.Keyword = exports.TokenTypes = void 0;
var TokenTypes;
(function (TokenTypes) {
    TokenTypes[TokenTypes["LEFTBRACKET"] = 0] = "LEFTBRACKET";
    TokenTypes[TokenTypes["RIGHTBRACKET"] = 1] = "RIGHTBRACKET";
    TokenTypes[TokenTypes["PAREN"] = 2] = "PAREN";
    TokenTypes[TokenTypes["LETTER"] = 3] = "LETTER";
    TokenTypes[TokenTypes["ADDRESS"] = 4] = "ADDRESS";
    TokenTypes[TokenTypes["ASSIGNMENT"] = 5] = "ASSIGNMENT";
    TokenTypes[TokenTypes["NUMBER"] = 6] = "NUMBER";
    TokenTypes[TokenTypes["SEMICOLON"] = 7] = "SEMICOLON";
    TokenTypes[TokenTypes["COLON"] = 8] = "COLON";
    TokenTypes[TokenTypes["COMMA"] = 9] = "COMMA";
    // keywords
    TokenTypes[TokenTypes["CREATE"] = 10] = "CREATE";
    TokenTypes[TokenTypes["CONTRACT"] = 11] = "CONTRACT";
    TokenTypes[TokenTypes["TIME"] = 12] = "TIME";
    TokenTypes[TokenTypes["BETWEEN"] = 13] = "BETWEEN";
    TokenTypes[TokenTypes["AND"] = 14] = "AND";
    TokenTypes[TokenTypes["USE"] = 15] = "USE";
    TokenTypes[TokenTypes["TEMPLATE"] = 16] = "TEMPLATE";
    TokenTypes[TokenTypes["NEED"] = 17] = "NEED";
    TokenTypes[TokenTypes["IN"] = 18] = "IN";
    TokenTypes[TokenTypes["LIMIT"] = 19] = "LIMIT";
    TokenTypes[TokenTypes["ACTIVED"] = 20] = "ACTIVED";
    TokenTypes[TokenTypes["BY"] = 21] = "BY";
    TokenTypes[TokenTypes["WHEN"] = 22] = "WHEN";
    TokenTypes[TokenTypes["THEN"] = 23] = "THEN";
})(TokenTypes = exports.TokenTypes || (exports.TokenTypes = {}));
exports.Keyword = new Map([
    ["create", TokenTypes.CREATE],
    ["contract", TokenTypes.CONTRACT],
    ["time", TokenTypes.TIME],
    ["between", TokenTypes.BETWEEN],
    ["and", TokenTypes.AND],
    ["use", TokenTypes.USE],
    ["template", TokenTypes.TEMPLATE],
    ["need", TokenTypes.NEED],
    ["in", TokenTypes.IN],
    ["Limit", TokenTypes.LIMIT],
    ["actived", TokenTypes.ACTIVED],
    ["by", TokenTypes.BY],
    ["when", TokenTypes.WHEN],
    ["then", TokenTypes.THEN],
]);
function tokenizer(code) {
    var tokens = [];
    var current = 0;
    var char = code[current];
    while (current < code.length) {
        /**
        * jump space and \n
        */
        var WHITESPACES = /[\s\n]/;
        if (WHITESPACES.test(char)) {
            char = code[++current];
            continue;
        }
        /**
         * parse Leftbracket
         */
        if (char === "[") {
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
        if (char === "]") {
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
        if (char === ",") {
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
        if (char === ";") {
            tokens.push({
                type: TokenTypes.SEMICOLON,
                value: ";",
            });
            char = code[++current];
            continue;
        }
        /**
        * parse letter
        */
        var LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            LETTERS = /[a-z0-9]/i;
            var letter = "";
            while (LETTERS.test(char) && current < code.length) {
                letter += char;
                char = code[++current];
            }
            if (exports.Keyword.get(letter) != undefined) {
                tokens.push({
                    type: exports.Keyword.get(letter),
                    value: letter,
                });
            }
            else {
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
        var NUMBERS = /[0-9a-fA-F]/;
        if (char === '0' && code[current + 1] === "x") {
            var address = "";
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
        if (NUMBERS.test(char) && current < code.length) {
            var number = "";
            while (NUMBERS.test(char) && current < code.length) {
                number += char;
                char = code[++current];
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
            var equal = "";
            equal += char;
            char = code[++current];
            equal += char;
            char = code[++current];
            tokens.push({
                type: TokenTypes.ASSIGNMENT,
                value: equal,
            });
            continue;
        }
        /**
         * parse colon
         * notice: this parse cannot move above 'parse assignment', because both of them include comma
         */
        if (char === ":") {
            tokens.push({
                type: TokenTypes.COLON,
                value: ":",
            });
            char = code[++current];
            continue;
        }
    }
    console.log(tokens);
    return tokens;
}
exports.tokenizer = tokenizer;
