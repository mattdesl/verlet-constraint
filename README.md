# verlet-constraint

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Creates a single 2D/3D constraint, useful in a [verlet physics system](https://github.com/mattdesl/verlet-system). 

```js
var Constraint = require('verlet-constraint')
var Point = require('verlet-point')

var points = [ Point(), Point() ]
var c = Constraint(points, { stiffness: 0.05, restingDistance: 15 })

//this pulls/pushes the two points 
c.solve()
```

The points can be bare objects with `position` and optional `mass`. Mass defaults to 1.0.

```js
var c = Constraint([ { position: [25, 25] }, { position: [50, 50], mass: 2 } ])
c.solve()
```

By default, assumes 2D and points with `[x, y]`. You can require an explicit dimension like so: 

```js
var Constraint2D = require('verlet-constraint/2d') //points [x, y]
var Constraint3D = require('verlet-constraint/3d') //points [x, y, z]
```

## Usage

[![NPM](https://nodei.co/npm/verlet-constraint.png)](https://nodei.co/npm/verlet-constraint/)

#### `c = Constraint(points[, opt])`

Creates a new constraint that operates on the two point objects given in the `points` array.  Options:

- `restingDistance` the desired resting distance between the two points, defaults to using the distance between the two points during construction
- `stiffness` the stiffness of the constraint, defaults to 1.0

#### `c.solve()`

Solves this constraint by pushing/pulling each point. If one of the points has a mass of zero, that body will be considered "unmovable". 

#### `c.points`

An array of the point objects that were specified to this constraint.

#### `c.restingDistance`

The desired distance

#### `c.stiffness`

The desired stiffness

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/verlet-constraint/blob/master/LICENSE.md) for details.
