const message = 'hello message'
console.log(message)

const foo = () => {
    console.log('foo function')
}

foo()

/* 
①解析阶段 将js代码转化为抽象语法树AST，进行词法分析和语法分析
②转换阶段 遍历抽象语法树AST，通过babel的各种插件对抽象语法树的节点进行操作，
重新生成一颗新的抽象语法树
③生成阶段 将抽象语法树转换成
*/
