"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = exports.NodeTypes = void 0;
var tokenizer_1 = require("./tokenizer");
var NodeTypes;
(function (NodeTypes) {
    NodeTypes["Root"] = "Root";
    //expression
    NodeTypes["AssignmentExpression"] = "AssignmentExpression";
    NodeTypes["CreateExpression"] = "CreateExpression";
    NodeTypes["PropertyExpression"] = "PropertyExpression";
    NodeTypes["LimitExpression"] = "LimitExpression";
    //token
    NodeTypes["Contract"] = "Contract";
    NodeTypes["Template"] = "Template";
    NodeTypes["Address"] = "Address";
    NodeTypes["Assignment"] = "Assignment";
    NodeTypes["User"] = "User";
    NodeTypes["UserArray"] = "UserArray";
    NodeTypes["MINDELAY"] = "MINDELAY";
    NodeTypes["MAXDELAY"] = "MAXDELAY";
    NodeTypes["MINneed"] = "MINneed";
    NodeTypes["Limit"] = "Limit";
    NodeTypes["Access"] = "Access";
    NodeTypes["PreSignal"] = "PreSignal";
    NodeTypes["Signal"] = "Signal";
})(NodeTypes = exports.NodeTypes || (exports.NodeTypes = {}));
//==============Actions of creating nodes======================
function createRootNode() {
    return {
        type: NodeTypes.Root,
        body: [],
    };
}
function createUserNode(userName) {
    return {
        type: NodeTypes.User,
        value: userName,
    };
}
function createUserArrayNode() {
    return {
        type: NodeTypes.UserArray,
        body: [],
    };
}
function createContractNode() {
    return {
        type: NodeTypes.Contract,
        value: "ContractName not initlized",
    };
}
function createAssignmentNode(assignment) {
    return {
        type: NodeTypes.Assignment,
        value: assignment,
    };
}
function createAssignmentExpressionNode() {
    return {
        type: NodeTypes.AssignmentExpression,
        body: [],
    };
}
function createCreateExpressionNode() {
    return {
        type: NodeTypes.CreateExpression,
        body: [],
    };
}
function createAddressNode(address) {
    return {
        type: NodeTypes.Address,
        value: address,
    };
}
// template & propertyExpression Node
function createTemplateNode(TemplateName) {
    return {
        type: NodeTypes.Template,
        value: TemplateName,
    };
}
function createPropertyNode() {
    return {
        type: NodeTypes.PropertyExpression,
        body: [],
    };
}
function createMINDELAYNode(MINDELAY) {
    return {
        type: NodeTypes.MINDELAY,
        value: MINDELAY,
    };
}
function createMAXDELAYNode(MAXDELAY) {
    return {
        type: NodeTypes.MAXDELAY,
        value: MAXDELAY,
    };
}
function createMINneedNode(MINneed) {
    return {
        type: NodeTypes.MINneed,
        value: MINneed,
    };
}
function createLimitExpressionNode() {
    return {
        type: NodeTypes.LimitExpression,
        body: [],
    };
}
function createLimitNode(Limit) {
    return {
        type: NodeTypes.Limit,
        value: Limit,
    };
}
function createAccessNode(Access) {
    return {
        type: NodeTypes.Access,
        value: Access,
    };
}
function createSignalNode(Signal) {
    return {
        type: NodeTypes.Signal,
        value: Signal,
    };
}
function createPreSignalNode() {
    return {
        type: NodeTypes.PreSignal,
        body: [],
    };
}
//==============parser func======================
function parser(tokens) {
    //读取token
    var current = 0;
    var token = tokens[current];
    //根节点
    var rootNode = createRootNode();
    while (current < tokens.length) {
        switch (token.type) {
            // assignment expression || template property expression
            case tokenizer_1.TokenTypes.LETTER: {
                if (tokens[current + 1].type == tokenizer_1.TokenTypes.ASSIGNMENT) {
                    // assignment expression
                    var assignmentExpression = createAssignmentExpressionNode();
                    assignmentExpression.body.push(createUserNode(token.value));
                    token = tokens[++current];
                    assignmentExpression.body.push(createAssignmentNode(token.value));
                    token = tokens[++current];
                    assignmentExpression.body.push(createAddressNode(token.value));
                    token = tokens[++current];
                    rootNode.body.push(assignmentExpression);
                }
                else if (tokens[current + 1].type == tokenizer_1.TokenTypes.COLON) {
                    // template property expression
                    var propertyExpression = createPropertyNode();
                    // add mindelay and maxdelay into expression
                    // judge TimeLock or MultiTrans
                    if (token.value == "TimeLock") {
                        while (!(token.type == tokenizer_1.TokenTypes.SEMICOLON) && current < tokens.length) {
                            if (token.type == tokenizer_1.TokenTypes.NUMBER) {
                                if (tokens[current + 1].type == tokenizer_1.TokenTypes.AND) {
                                    // before token [and] => mindelay
                                    propertyExpression.body.push(createMINDELAYNode(token.value));
                                }
                                else {
                                    // after token [and] => maxdelay
                                    propertyExpression.body.push(createMAXDELAYNode(token.value));
                                }
                            }
                            token = tokens[++current];
                            continue;
                        }
                        // add expression into root
                        rootNode.body.push(propertyExpression);
                    }
                    else if (token.value == "MultiTrans") {
                        var userArray = createUserArrayNode();
                        while (!(token.type == tokenizer_1.TokenTypes.SEMICOLON) && current < tokens.length) {
                            token = tokens[++current];
                            if (token.type == tokenizer_1.TokenTypes.NUMBER) {
                                propertyExpression.body.push(createMINneedNode(token.value));
                            }
                            else if (token.type == tokenizer_1.TokenTypes.LETTER) {
                                userArray.body.push(token.value);
                            }
                            continue;
                        }
                        // add expression into root
                        propertyExpression.body.push(userArray);
                        rootNode.body.push(propertyExpression);
                    }
                    else {
                        console.log("Error: template name is not correct");
                    }
                }
                break;
            }
            // create contract expression 
            case tokenizer_1.TokenTypes.LEFTBRACKET: {
                switch (tokens[current + 1].type) {
                    // CREATECONTRACT EXPRESSION
                    case tokenizer_1.TokenTypes.LETTER: {
                        var CreateExpression = createCreateExpressionNode();
                        var UserArray = createUserArrayNode();
                        var ContractName = createContractNode();
                        token = tokens[++current];
                        // add user to userArrayNode
                        while (!(token.type == tokenizer_1.TokenTypes.RIGHTBRACKET) && current < tokens.length) {
                            if (token.type == tokenizer_1.TokenTypes.LETTER) {
                                UserArray.body.push(token.value);
                            }
                            token = tokens[++current];
                            continue;
                        }
                        // add contract name to contractNode
                        while (!(token.type == tokenizer_1.TokenTypes.SEMICOLON) && current < tokens.length) {
                            if (token.type == tokenizer_1.TokenTypes.LETTER) {
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
                    case tokenizer_1.TokenTypes.TEMPLATE: {
                        break;
                    }
                }
                break;
            }
            // template chosen
            case tokenizer_1.TokenTypes.USE: {
                while (!(token.type == tokenizer_1.TokenTypes.SEMICOLON) && current < tokens.length) {
                    if (token.type == tokenizer_1.TokenTypes.LETTER) {
                        rootNode.body.push(createTemplateNode(token.value));
                    }
                    token = tokens[++current];
                    continue;
                }
                break;
            }
            // limit expression
            case tokenizer_1.TokenTypes.LIMIT: {
                var LimitExpression = createLimitExpressionNode();
                var PreSignal = createPreSignalNode();
                while (!(token.type == tokenizer_1.TokenTypes.SEMICOLON) && current < tokens.length) {
                    token = tokens[++current];
                    if (token.type == tokenizer_1.TokenTypes.LETTER) {
                        // Limit Name
                        if (tokens[current - 1].type == tokenizer_1.TokenTypes.LIMIT) {
                            LimitExpression.body.push(createLimitNode(token.value));
                        }
                        else if (tokens[current - 1].type == tokenizer_1.TokenTypes.BY) {
                            // Access
                            LimitExpression.body.push(createAccessNode(token.value));
                        }
                        else if (tokens[current - 1].type == tokenizer_1.TokenTypes.THEN) {
                            // Signal
                            LimitExpression.body.push(PreSignal);
                            LimitExpression.body.push(createSignalNode(token.value));
                        }
                        else {
                            PreSignal.body.push(token.value);
                        }
                    }
                    continue;
                }
                rootNode.body.push(LimitExpression);
                break;
            }
            default: {
                token = tokens[++current];
                break;
            }
        }
    }
    return rootNode;
}
exports.parser = parser;
