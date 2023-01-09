/*
 * 流动纹理线
 * color 颜色
 * duration 持续时间 毫秒
 */
function PolylineTrailLinkMaterialProperty(color, duration) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = color;
    this.duration = duration;
    this._time = (new Date()).getTime();
}

Cesium.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
    isConstant: {
        get: function () {
            return false;
        }
    },
    definitionChanged: {
        get: function () {
            return this._definitionChanged;
        }
    },
    color: Cesium.createPropertyDescriptor('color')
});

PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
    return 'PolylineTrailLink';
}

PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }

    result.color = Cesium.Property.getValueOrClonedDefault(
        this._color, time, Cesium.Color.WHITE, result.color);
    result.image = Cesium.Material.PolylineTrailLinkImage;
    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;

    return result;
}

PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
    return ((this === other) ||
        ((other instanceof PolylineTrailLinkMaterialProperty) &&
            (Cesium.Property.equals(this._color, other._color))));
}


Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
Cesium.Material.PolylineTrailLinkImage = '../../assets/img/p.png'; 
Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
{\n\
    czm_material material = czm_getDefaultMaterial(materialInput);\n\
    vec2 st = materialInput.st;\n\
    vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
    material.alpha = colorImage.a * color.a;\n\
    material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
    return material;\n\
}";

Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
    fabric: {
        type: Cesium.Material.PolylineTrailLinkType,
        uniforms: {
            color: new Cesium.Color(0, 0, 0, 0),
            image: Cesium.Material.PolylineTrailLinkImage,
            time: 0
        },
        source: Cesium.Material.PolylineTrailLinkSource
    },
    translucent: function (material) {
        return true;
    }
});
/**
 * 
 * @param {Cesium.Viewer} viewer 
 * @param {Cesium.Cartesian3} src 起点 经纬度高程
 * @param {Cesium.Cartesian3} dst 终点 经纬度高程
 * @param {Cesium.Color} color 颜色
 */
function drawLine(viewer, src, dst, color, duration) {
    var curLinePointsArr = generateCurve(src, dst);
    if (!Cesium.defined(duration)) {
        duration = 4000;
    }
    viewer.entities.add({
        description: 'trail-line',
        name: 'test',
        polyline: {
            width: 2,
            positions: curLinePointsArr,
            material: new Cesium.PolylineTrailLinkMaterialProperty(color, duration)
        }
    });

}

function generateCurve(src, dst) {

    var cartesian3s = [];
    var times = [];
    var time = 0;
    var curvePointsArr = [];
    var spline;

    cartesian3s.push(Cesium.Cartesian3.fromDegrees(src.x, src.y, src.z));
    times.push(time);
    time += 1;

    cartesian3s.push(Cesium.Cartesian3.fromDegrees(dst.x, dst.y, dst.z));
    times.push(time);

    spline = new Cesium.CatmullRomSpline({
        times: times,
        points: cartesian3s
    });

    for (var i = 0, len = times.length; i < len; i++) {
        curvePointsArr.push(spline.evaluate(times[i]));
    }

    return curvePointsArr;
}