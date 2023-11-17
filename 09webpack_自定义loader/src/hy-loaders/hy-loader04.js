const { validate } = require('schema-utils')
const loader04_schema = require('./schema/loader04_schema.json')
module.exports = function (content) {
    console.log('hy-loader04', content)
    const options = this.getOptions()
    validate(loader04_schema, options)
    console.log('options', options)
    return content
}
