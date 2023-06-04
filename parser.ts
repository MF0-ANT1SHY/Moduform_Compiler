import { Token, TokenTypes } from "./tokenizer";

export enum NodeTypes {
    Root,
    //expression
    AssignmentExpression,
    CreateExpression,
    PropertyExpression,
    //token
    Contract,
    Template,
    Address,
    Assignment,
    User,
    UserArray,
    MINDELAY,
    MAXDELAY,
    MINneed,
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

interface PropertyExpressionNode extends Node {
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

interface TemplateNode extends Node {
    value: string,
}

interface AddressNode extends Node {
    value: string,
}

interface MINDELAYNode extends Node {
    value: string,
}

interface MAXDELAYNode extends Node {
    value: string,
}

interface MINneedNode extends Node {
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

// template & propertyExpression Node
function createTemplateNode(TemplateName: string): TemplateNode {
    return {
        type: NodeTypes.Template,
        value: TemplateName,
    };
}

function createPropertyNode(): PropertyExpressionNode {
    return {
        type: NodeTypes.PropertyExpression,
        body: [],
    };
}

function createMINDELAYNode(MINDELAY: string): MINDELAYNode {
    return {
        type: NodeTypes.MINDELAY,
        value: MINDELAY,
    };
}

function createMAXDELAYNode(MAXDELAY: string): MAXDELAYNode {
    return {
        type: NodeTypes.MAXDELAY,
        value: MAXDELAY,
    };
}

function createMINneedNode(MINneed: string): MINneedNode {
    return {
        type: NodeTypes.MINneed,
        value: MINneed,
    };
}

//==============parser func======================
export function parser(tokens: Token[]) {
    //读取token
    let current = 0;
    let token = tokens[current];

    //根节点
    const rootNode = createRootNode();

    while (current < tokens.length) {
        switch (token.type) {
            // assignment expression || template property expression
            case TokenTypes.LETTER: {
                if (tokens[current + 1].type == TokenTypes.ASSIGNMENT) {
                    // assignment expression
                    const assignmentExpression = createAssignmentExpressionNode();
                    assignmentExpression.body.push(createUserNode(token.value));
                    token = tokens[++current];
                    assignmentExpression.body.push(createAssignmentNode(token.value));
                    token = tokens[++current];
                    assignmentExpression.body.push(createAddressNode(token.value));
                    token = tokens[++current];
                    rootNode.body.push(assignmentExpression);
                } else if (tokens[current + 1].type == TokenTypes.COLON) {
                    // template property expression
                    const propertyExpression = createPropertyNode();
                    // add mindelay and maxdelay into expression
                    // judge TimeLock or MultiTrans
                    if (token.value == "TimeLock") {
                        while (!(token.type == TokenTypes.SEMICOLON) && current < tokens.length) {
                            if (token.type == TokenTypes.NUMBER) {
                                if (tokens[current + 1].type == TokenTypes.AND) {
                                    // before token [and] => mindelay
                                    propertyExpression.body.push(createMINDELAYNode(token.value));
                                } else {
                                    // after token [and] => maxdelay
                                    propertyExpression.body.push(createMAXDELAYNode(token.value));
                                }
                            }
                            token = tokens[++current];
                            continue;
                        }
                        // add expression into root
                        rootNode.body.push(propertyExpression);
                    } else if (token.value == "MultiTrans") {
                        const userArray = createUserArrayNode();
                        while (!(token.type == TokenTypes.SEMICOLON) && current < tokens.length) {
                            token = tokens[++current];
                            if (token.type == TokenTypes.NUMBER) {
                                propertyExpression.body.push(createMINneedNode(token.value));
                            } else if (token.type == TokenTypes.LETTER) {
                                userArray.body.push(token.value);
                            }
                            continue;
                        }
                        // add expression into root
                        propertyExpression.body.push(userArray);
                        rootNode.body.push(propertyExpression);
                    } else {
                        console.log("Error: template name is not correct");
                    }
                }
                break;
            }
            // create contract expression 
            case TokenTypes.LEFTBRACKET: {
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
                        while (!(token.type == TokenTypes.SEMICOLON) && current < tokens.length) {
                            if (token.type == TokenTypes.LETTER) {
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
            // template chosen
            case TokenTypes.USE: {
                while (!(token.type == TokenTypes.SEMICOLON) && current < tokens.length) {
                    if (token.type == TokenTypes.LETTER) {
                        rootNode.body.push(createTemplateNode(token.value));
                    }
                    token = tokens[++current];
                    continue;
                }
            }
            default: {
                token = tokens[++current];
                continue;
            }
        }
    }
    return rootNode;
}