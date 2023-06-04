import { Token, TokenTypes } from "./tokenizer";

export enum NodeTypes {
    Root,
    //expression
    AssignmentExpression,
    CreateExpression,
    //token
    Contract,
    Address,
    Assignment,
    User,
    UserArray,
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

interface CreateExpressionNode extends Node {
    body: Node[],
}

interface UserArrayNode extends Node {
    body: string[],
}

interface ContractNode extends Node {
    value: string,
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

function createUserArrayNode(): UserArrayNode {
    return {
        type: NodeTypes.UserArray,
        body: [],
    }
}

function createContractNode(): ContractNode {
    return {
        type: NodeTypes.Contract,
        value: `ContractName not initlized`,
    }
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

function createCreateExpressionNode(): CreateExpressionNode {
    return {
        type: NodeTypes.CreateExpression,
        body: [],
    }
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
            break;
        }
        case TokenTypes.LEFTBRACKET: {
            // create contract || template property
            switch (tokens[current + 1].type) {
                // CREATECONTRACT EXPRESSION
                case TokenTypes.LETTER: {
                    const CreateExpression = createCreateExpressionNode();
                    const UserArray = createUserArrayNode();
                    const ContractName = createContractNode();
                    token = tokens[++current];
                    // add user to userArrayNode
                    while (!(token.type == TokenTypes.RIGHTBRACKET) && current < tokens.length) {
                        if (token.type == TokenTypes.LETTER) {
                            UserArray.body.push(token.value);
                        }
                        token = tokens[++current];
                        continue;
                    }
                    // add contract name to contractNode
                    while(!(token.type == TokenTypes.SEMICOLON) && current < tokens.length){
                        if(token.type == TokenTypes.LETTER) {
                            ContractName.value = token.value; 
                        }
                        token = tokens[++current];
                        continue;
                    }
                    CreateExpression.body.push(UserArray);
                    CreateExpression.body.push(ContractName);
                    rootNode.body.push(CreateExpression);
                    break;
                }
                case TokenTypes.TEMPLATE: {

                    break;
                }
            }
            break;
        }
    }
    return rootNode;
}