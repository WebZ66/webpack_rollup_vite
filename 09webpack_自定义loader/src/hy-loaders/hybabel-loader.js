const babel = require('@babel/core')
module.exports = function (content) {
    //使用异步loader
    const callback = this.async()
    let option = this.getOptions()
    //如果webpack没有配置对应的option，那么使用babel.config.js
    if (!Object.keys(option).length) {
    }
    babel.transform(content, option, (err, res) => {
        if (err) {
            callback(err)
        } else {
            callback(null, res.code)
        }
    })
}
