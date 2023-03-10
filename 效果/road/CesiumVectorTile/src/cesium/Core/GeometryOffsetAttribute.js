var freezeObject=require('./freezeObject');

    'use strict';

    /**
     * Represents which vertices should have a value of `true` for the `applyOffset` attribute
     * @private
     */
    var GeometryOffsetAttribute = {
        NONE : 0,
        TOP : 1,
        ALL : 2
    };

    module.exports= freezeObject(GeometryOffsetAttribute);
