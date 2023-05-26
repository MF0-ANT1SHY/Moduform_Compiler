import { Token, TokenTypes } from "./tokenizer";

export enum NodeTypes {
    Root,
    Address,
    User,
}

//==========define interface==========================
interface Node {
    type: NodeTypes,
}

interface RootNode extends Node {
    body: Node[],
}

interface UserNode extends Node {
    value: string,
}

//==============Actions of creating nodes======================
function createRootNode(): RootNode {
    return {
        type: NodeTypes.Root,
        body: [],
    };
}

function createUserNode(userName: string): UserNode{
    return {
        type: NodeTypes.User,
        value: userName, 
    };
}

//==============parser func======================
export function parser(tokens: Token[]) {
    //读取token
    let current = 0;
    let token = tokens[current];

    //根节点
    const rootNode = createRootNode();

    switch (token.type) {
        case TokenTypes.Letter: {
            rootNode.body.push(createUserNode(token.value));
        }
    }

    console.log(rootNode);
    return rootNode;
}