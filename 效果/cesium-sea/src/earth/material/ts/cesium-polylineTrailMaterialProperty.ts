/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @Author ai_xiaowei
 * @Date 2021-12-23 16:40:57
 * @LastEditors ai_xiaowei
 * @LastEditorsDate 2021-12-23 16:40:57
 * @Description 工具类:
 * 1、线的波动纹理
 */

export default function CustomMaterialProperty(options: any, Cesium: any): any {
  const createPropertyDescriptor: any = Cesium.createPropertyDescriptor;

  class PolylineTrailMaterialProperty {
    _definitionChanged: any;
    _color: any;
    _colorSubscription: any;
    color: any;
    duration: any;
    _time: any;

    constructor(options: any, Cesium: any) {
      options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
      this._definitionChanged = new Cesium.Event();
      this._color = undefined;
      this._colorSubscription = undefined;
      this.color = options.color;
      this.duration = options.duration;
      this._time = new Date().getTime();
    }

    getType(): any {
      return "PolylineTrail";
    }
    getValue(time: any, result: any): any {
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
    }

    equals(other: any) {
      return (
        this === other ||
        (other instanceof PolylineTrailMaterialProperty &&
          Cesium.Property.equals(this._color, other._color))
      );
    }
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
    color: createPropertyDescriptor("color"),
  });

  Cesium.Material.PolylineTrailType = "PolylineTrail";
  Cesium.Material.PolylineTrailImage = require("@/assets/particle/color0.png");
  // 将定义的材质对象添加到cesium的材质队列中
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
  Cesium.Material._materialCache.addMaterial(
    Cesium.Material.PolylineTrailType,
    {
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
    }
  );

  return new PolylineTrailMaterialProperty(options, Cesium);
}
