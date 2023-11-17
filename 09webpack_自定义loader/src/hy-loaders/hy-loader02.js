module.exports = function (content) {
    //async()依然返回一个callback，但是告诉webpack即将有异步操作，只有调用callback才会执行下一个loader
    const callback = this.async()
    setTimeout(() => {
        console.log('hy-loader02', content)
        let result = content + 'aaa'
        callback(null, result)
    }, 2000)
}
