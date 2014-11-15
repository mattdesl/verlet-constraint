var vec2 = {
    create: require('gl-vec2/create'),
    add: require('gl-vec2/add'),
    dot: require('gl-vec2/dot'),
    sub: require('gl-vec2/subtract'),
    scale: require('gl-vec2/scale'),
    distance: require('gl-vec2/distance')
}
module.exports = require('./lib/build')(vec2)