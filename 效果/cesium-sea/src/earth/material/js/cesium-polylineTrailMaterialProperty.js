/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium"; //防止报错，才引入进来的

export default function PolylineTrailMaterialProperty(options) {
  options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
  this._definitionChanged = new Cesium.Event();
  this._color = undefined;
  this._colorSubscription = undefined;
  this.color = options.color;
  this.duration = options.duration;
  this._time = new Date().getTime();
}

Object.defineProperties(PolylineTrailMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return false;
    },
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },
  color: Cesium.createPropertyDescriptor("color"),
});

PolylineTrailMaterialProperty.prototype.getType = function () {
  return "PolylineTrail";
};
PolylineTrailMaterialProperty.prototype.getValue = function (time, result) {
  if (!Cesium.defined(result)) {
    result = {};
  }
  result.color = Cesium.Property.getValueOrClonedDefault(
    this._color,
    time,
    Cesium.Color.WHITE,
    result.color
  );
  result.image = Cesium.Material.PolylineTrailImage;
  result.time =
    ((new Date().getTime() - this._time) % this.duration) / this.duration;
  return result;
};

PolylineTrailMaterialProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof PolylineTrailMaterialProperty &&
      Cesium.Property.equals(this._color, other._color))
  );
};

Cesium.Material.PolylineTrailType = "PolylineTrail";
Cesium.Material.PolylineTrailImage = require("../../assets/img/particle/color0.png");
Cesium.Material.PolylineTrailSource =
  "czm_material czm_getMaterial(czm_materialInput materialInput)" +
  "{" +
  "czm_material material = czm_getDefaultMaterial(materialInput);" +
  "vec2 st = materialInput.st;" +
  "vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));" +
  "material.alpha = colorImage.a * color.a;" +
  "material.diffuse = (colorImage.rgb+color.rgb)/2.0;" +
  "return material;" +
  "}";

Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailType, {
  fabric: {
    type: Cesium.Material.PolylineTrailType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
      image: Cesium.Material.PolylineTrailImage,
      time: 100,
    },
    source: Cesium.Material.PolylineTrailSource,
  },
  translucent: function () {
    return true;
  },
});
