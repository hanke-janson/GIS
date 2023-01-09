/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @Author ai_xiaowei
 * @Date 2021-12-23 16:40:57
 * @LastEditors ai_xiaowei
 * @LastEditorsDate 2021-12-23 16:40:57
 * @Description 工具类:
 * 1、自定义材质线Property 适用于entity和primitive材质
 */

export default function CustomMaterialLine(options: any, Cesium: any): any {
  const Color = Cesium.Color,
    defaultValue = Cesium.defaultValue,
    defined = Cesium.defined,
    defineProperties = Object.defineProperties,
    Event = Cesium.Event,
    createPropertyDescriptor = Cesium.createPropertyDescriptor,
    Property = Cesium.Property,
    Material = Cesium.Material,
    defaultColor = Color.WHITE,
    MaterialType =
      options.MaterialType || "wallType" + Math.floor(Math.random() * 1000);

  // 创建自定义动态材质对象
  class PolylineCustomMaterialProperty {
    _definitionChanged: any;
    _color: any;
    _colorSubscription: any;
    color: any;
    duration: any;
    _time: any;
    constructor(options: any, Cesium: any) {
      options = defaultValue(options, defaultValue.EMPTY_OBJECT);
      // 定义内置属性
      this._definitionChanged = new Event();
      this._color = undefined;
      this._colorSubscription = undefined;
      this.color = options.color || Cesium.Color.BLUE;
      this.duration = options.duration || 1000;
      this._time = undefined;
    }

    // 材质对象需要有type函数 value函数 equals函数
    getType(): any {
      return MaterialType;
    }
    getValue(time: any, result: any): any {
      if (!defined(result)) {
        result = {};
      }
      result.color = Property.getValueOrClonedDefault(
        this._color,
        time,
        defaultColor,
        result.color
      );
      result.image = options.image;
      if (this._time === undefined) {
        this._time = time.secondsOfDay;
      }
      result.time = ((time.secondsOfDay - this._time) * 1000) / this.duration;
      return result;
    }

    equals(other: any): any {
      return (
        this === other || //
        (other instanceof PolylineCustomMaterialProperty &&
          Property.equals(this._color, other._color))
      );
    }
  }

  // 定义材质对象默认属性
  defineProperties(PolylineCustomMaterialProperty.prototype, {
    isvarant: {
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

  // 将定义的材质对象添加到cesium的材质队列中
  Material._materialCache.addMaterial(MaterialType, {
    fabric: {
      type: MaterialType,
      uniforms: {
        color: options.color || new Cesium.Color(1.0, 0.0, 0.0, 0.5),
        image: options.image,
        time: options.color.time || 0,
      },
      // 动态材质shader
      source:
        "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
        {\n\
            czm_material material = czm_getDefaultMaterial(materialInput);\n\
            vec2 st = materialInput.st;\n\
            \n\
            if(texture2D(image, vec2(0.0, 0.0)).a == 1.0){\n\
                discard;\n\
            }else{\n\
                material.alpha = texture2D(image, vec2(1.0 - fract(time - st.s), st.t)).a * color.a;\n\
            }\n\
            \n\
            material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb);\n\
            \n\
            return material;\n\
        }\n\
        ",
    },
    // 透明
    translucent: function () {
      return true;
    },
  });

  return new PolylineCustomMaterialProperty(options, Cesium);
}
