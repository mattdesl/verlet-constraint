var Constraint2D = require('./')
var Constraint3D = require('./3d')
var vec2 = require('gl-matrix').vec2
var vec3 = require('gl-matrix').vec3

var deepcopy = require('deepcopy')

var test = require('tape').test

test('testing 2D constraints', function(t) {
    run(vec2, Constraint2D, t)
})

test('testing 3D constraints', function(t) {
    run(vec3, Constraint3D, t)
})


function run(vec, Constraint, t) {
    //the API may change to operate on bare points at some point. For now, don't allow it.
    t.throws(Constraint, 'no points throws error')
    t.throws(Constraint.bind(null, [ [0,0], [1,5] ]), 'bare points throws error')

    var vecA = vec.fromValues(10, 20, 30),  
        vecB = vec.fromValues(50, 25, 40)
    var points = [ { position: vecA }, { position: vecB } ]
    var orig = deepcopy(points)

    var c = Constraint(points)

    t.deepEqual(points, orig, 'does not modify points')

    var dist = c.solve()
    t.deepEqual(c.points, orig, 'distance is at rest')    

    var eDist = vec.distance(points[0].position, points[1].position)
    t.deepEqual(dist, eDist, 'returns expected distance')

    //pretty fragile..
    c.restingDistance = 40
    c.solve()
    t.notDeepEqual(points, orig, 'solve modifies points') 

    t.end()
}