const { marked } = require('marked')
module.exports = function (content) {
    //marked()函数会将md内容转化为html结构
    const htmlContent = marked(content)
    console.log(htmlContent)
    //最后返回的结果必须是模块化的内容或字符串
    //先将其转化为字符串
    const innerContent = '`' + htmlContent + '`'
    //然后转化为模板语法
    const moduleContent = `var code = ${innerContent};export default code`
    return moduleContent
}
