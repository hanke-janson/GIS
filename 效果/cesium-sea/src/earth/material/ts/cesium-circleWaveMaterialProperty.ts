/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @Author ai_xiaowei
 * @Date 2021-12-23 16:40:57
 * @LastEditors ai_xiaowei
 * @LastEditorsDate 2021-12-23 16:40:57
 * @Description 工具类:
 * 1、圆的波动纹理
 */

export default function CustomCircleProperty(options: any, Cesium: any): any {
  const createPropertyDescriptor: any = Cesium.createPropertyDescriptor;

  class CircleWaveMaterialProperty {
    _definitionChanged: any;
    _color: any;
    _colorSubscription: any;
    color: any;
    duration: any;
    count: any;
    gradient: any;
    _time: any;
    constructor(options: any, Cesium: any) {
      options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
      this._definitionChanged = new Cesium.Event();
      this._color = undefined;
      this._colorSubscription = undefined;
      this.color = options.color;
      this.duration = Cesium.defaultValue(options.duration, 1e3);
      this.count = Cesium.defaultValue(options.count, 2);
      if (this.count <= 0) this.count = 1;
      this.gradient = Cesium.defaultValue(options.gradient, 0.1);
      if (this.gradient < 0) this.gradient = 0;
      else if (this.gradient > 1) this.gradient = 1;
      this._time = performance.now();
    }

    getType() {
      return "CircleWaveMaterial";
    }
    getValue(time: any, result: any) {
      if (!Cesium.defined(result)) {
        result = {};
      }
      result.color = Cesium.Property.getValueOrClonedDefault(
        this._color,
        time,
        Cesium.Color.WHITE,
        result.color
      );
      result.time = (performance.now() - this._time) / this.duration;
      result.count = this.count;
      result.gradient = this.gradient;
      return result;
    }
    equals(other: any) {
      return (
        this === other ||
        (other instanceof CircleWaveMaterialProperty &&
          Cesium.Property.equals(this._color, other._color))
      );
    }
  }

  Object.defineProperties(CircleWaveMaterialProperty.prototype, {
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

  Cesium.Material.CircleWaveMaterialType = "CircleWaveMaterial";
  Cesium.Material.PolylineTrailSource = `czm_material czm_getMaterial(czm_materialInput materialInput)\n
                                        {\n
                                            czm_material material = czm_getDefaultMaterial(materialInput);\n
                                            material.diffuse = 1.0 * color.rgb;\n
                                            vec2 st = materialInput.st;\n
                                            vec3 str = materialInput.str;\n
                                            float dis = distance(st, vec2(0.5, 0.5));\n
                                            float per = fract(time);\n
                                            if (abs(str.z) > 0.001) {\n
                                                discard;\n
                                            }\n
                                            if (dis > 0.5) { \n
                                                discard; \n
                                            } else { \n
                                                float perDis = 0.5 / count;\n
                                                float disNum; \n                       
                                                float bl = .0; \n                       
                                                for (int i = 0; i <= 999; i++) { \n                           
                                                    if (float(i) <= count) { \n                               
                                                      disNum = perDis * float(i) - dis + per / count; \n                             
                                                        if (disNum > 0.0) { \n                                 
                                                            if (disNum < perDis) { \n                                     
                                                                bl = 1.0 - disNum / perDis;\n
                                                            }\n                                 
                                                          else if(disNum - perDis < perDis) { \n                                       
                                                                    bl = 1.0 - abs(1.0 - disNum / perDis); \n
                                                            } \n                                 
                                                            material.alpha = pow(bl, gradient); \n
                                                        } \n
                                                    } \n
                                                } \n
                                            } \n
                                        return material; \n
                                    } \n`;

  Cesium.Material._materialCache.addMaterial(
    Cesium.Material.CircleWaveMaterialType,
    {
      fabric: {
        type: Cesium.Material.CircleWaveMaterialType,
        uniforms: {
          color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
          time: 1,
          count: 1,
          gradient: 0.1,
        },
        source: Cesium.Material.PolylineTrailSource,
      },
      translucent: function () {
        return !0;
      },
    }
  );

  return new CircleWaveMaterialProperty(options, Cesium);
}
