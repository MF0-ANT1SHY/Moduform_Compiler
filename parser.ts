import { Token, TokenTypes } from "./tokenizer";

export enum NodeTypes {
    Root,
    AssignmentExpression,
    Address,
    Assignment,
    User,
}

//==========define interface==========================
interface Node {
    type: NodeTypes,
}

interface RootNode extends Node {
    body: Node[],
}

interface AssignmentExpressionNode extends Node {
    body: Node[],
}

interface UserNode extends Node {
    value: string,
}

interface AssignmentNode extends Node {
    value: string,
}

interface AddressNode extends Node {
    value: string,
}

//==============Actions of creating nodes======================
function createRootNode(): RootNode {
    return {
        type: NodeTypes.Root,
        body: [],
    };
}

function createUserNode(userName: string): UserNode {
    return {
        type: NodeTypes.User,
        value: userName,
    };
}

function createAssignmentNode(assignment: string): AssignmentNode {
    return {
        type: NodeTypes.Assignment,
        value: assignment,
    };
}

function createAssignmentExpressionNode(): AssignmentExpressionNode {
    return {
        type: NodeTypes.AssignmentExpression,
        body: [],
    };
}

function createAddressNode(address: string): AddressNode {
    return {
        type: NodeTypes.Address,
        value: address,
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
        case TokenTypes.LETTER: {
            const assignmentExpression = createAssignmentExpressionNode();
            assignmentExpression.body.push(createUserNode(token.value));
            token = tokens[++current];
            assignmentExpression.body.push(createAssignmentNode(token.value));
            token = tokens[++current];
            assignmentExpression.body.push(createAddressNode(token.value));
            token = tokens[++current];
            rootNode.body.push(assignmentExpression);
        }
    }
    return rootNode;
}