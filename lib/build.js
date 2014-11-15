module.exports = function(vec) {
    var delta = vec.create()
    var scaled = vec.create()

    function Constraint(points, opt) {
        if (!points || points.length !== 2)
            throw new Error('two points must be specified for the constraint')
        if (!points[0].position || !points[1].position)
            throw new Error('must specify verlet-point or similar, with { position }')
        this.points = points
        this.stiffness = 1.0
        if (opt && typeof opt.stiffness === 'number')
            this.stiffness = opt.stiffness

        if (opt && typeof opt.restingDistance === 'number')
            this.restingDistance = opt.restingDistance
        else
            this.restingDistance = vec.distance(this.points[0].position, this.points[1].position)
    }

    Constraint.prototype.solve = function() {
        //distance formula
        var p1 = this.points[0],
            p2 = this.points[1],
            p1vec = p1.position,
            p2vec = p2.position,
            p1mass = typeof p1.mass === 'number' ? p1.mass : 1,
            p2mass = typeof p2.mass === 'number' ? p2.mass : 1

        vec.sub(delta, p1vec, p2vec)
        var d = Math.sqrt(vec.dot(delta, delta))

        //ratio for resting distance
        var restingRatio = d===0 ? this.restingDistance : (this.restingDistance - d) / d
        var scalarP1, 
            scalarP2

        //handle zero mass a little differently
        if (p1mass===0||p2mass===0) {
            scalarP1 = this.stiffness
            scalarP2 = this.stiffness
        } else {
            //invert mass quantities
            var im1 = 1.0 / p1mass
            var im2 = 1.0 / p2mass
            scalarP1 = (im1 / (im1 + im2)) * this.stiffness
            scalarP2 = this.stiffness - scalarP1
        }
        
        //push/pull based on mass
        vec.scale(scaled, delta, scalarP1 * restingRatio)
        vec.add(p1vec, p1vec, scaled)
        
        vec.scale(scaled, delta, scalarP2 * restingRatio)
        vec.sub(p2vec, p2vec, scaled)

        return d
    }

    return function(p1, p2, opt) {
        return new Constraint(p1, p2, opt)
    }
}