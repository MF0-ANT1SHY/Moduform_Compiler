# Moduform Parser

## 参考视频

* https://space.bilibili.com/175301983/channel/collectiondetail?sid=654698 使用typescript实现一个mini编译器
* https://space.bilibili.com/525521610/channel/collectiondetail?sid=283846 使用golang实现一个python解析器

结合上述两个视频，实现一个Moduform的前端

## 功能

1. 解析Modufrom格式的代码，生成抽象语法树(AST)

## 开发过程

2023-05-29 22:11:25 粗略实现了tokenizer，开始实习parser，但是由于tokenizer阶段对token的分类太模糊(统一划分为letter)，导致parser阶段生成AST有些麻烦，因此重构tokenizer

mini编译器非常简单，将token划分为paren、name以及number三种；将语法分为表达式和number两种

* number：遇到数字的时候就是number；
* 表达式："("开头,")"结尾；

Moduform能够实现的有：表达式（地址赋值）、合约创建、模板选择、模版属性、约束创建五种语句；

* 表达式: start with "A,B..."; "[","use","[templateName]", "Limit";

    [2023-06-03 10:41:21]

    1. 赋值表达式: [LETTER, ;]
    2. create表达式: [create, ;]
    3. template property assignment: [[,;]
    4. template choosing assignment: [use,;]
    5. customize limit assginment: [limit, ;] 