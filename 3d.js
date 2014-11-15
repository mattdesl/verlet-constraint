var vec3 = {
    create: require('gl-vec3/create'),
    add: require('gl-vec3/add'),
    dot: require('gl-vec3/dot'),
    sub: require('gl-vec3/subtract'),
    scale: require('gl-vec3/scale'),
    distance: require('gl-vec3/distance')
}
module.exports = require('./lib/build')(vec3)