<template>
  <div>
    <div id="cesiumContainer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
let viewer: any;
interface dataProps {
  GeoJsonPolygonData: any;
}
export default defineComponent({
  name: "Point",
  setup() {
    const data: dataProps = reactive({
      GeoJsonPolygonData: {},
    });
    const refData = toRefs(data);
    const init = () => {
      viewer = new Cesium.Viewer("cesiumContainer", {
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: "http://localhost:8889/bm/map/{z}/{x}/{y}",
          maximumLevel: 14,
        }),
        animation: false, // 隐藏动画控件
        baseLayerPicker: false, // 隐藏图层选择控件
        fullscreenButton: false, // 隐藏全屏按钮
        vrButton: false, // 隐藏VR按钮，默认false
        geocoder: false, // 隐藏地名查找控件
        homeButton: false, // 隐藏Home按钮
        infoBox: false, // 隐藏点击要素之后显示的信息窗口
        sceneModePicker: false, // 隐藏场景模式选择控件
        selectionIndicator: true, // 显示实体对象选择框，默认true
        timeline: false, // 隐藏时间线控件
        navigationHelpButton: false, // 隐藏帮助按钮
        scene3DOnly: true, // 每个几何实例将只在3D中呈现，以节省GPU内存
        shouldAnimate: true, // 开启动画自动播放
        sceneMode: 1, // 初始场景模式 1：2D 2：2D循环 3：3D，默认3
        requestRenderMode: true, // 减少Cesium渲染新帧总时间并减少Cesium在应用程序中总体CPU使用率
        // 如场景中的元素没有随仿真时间变化，请考虑将设置maximumRenderTimeChange为较高的值，例如Infinity
        maximumRenderTimeChange: Infinity,
      });
      viewer._cesiumWidget._creditContainer.style.display = "none";
      viewer.scene.skyAtmosphere.show = false;
      viewer.scene.globe.enableLighting = false;
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          114.23812820479566,
          22.556171757652862,
          10000
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
        duration: 2,
      });
    };

    const addTexture = () => {
      function applyWaterMaterial(primitive: any) {
        primitive.appearance.material = new Cesium.Material({
          fabric: {
            type: "Water",
            uniforms: {
              specularMap: require("./earthspec1k.jpg"),
              normalMap: require("./waterNormals.png"),
              frequency: 10000.0,
              animationSpeed: 0.01,
              amplitude: 10,
            },
          },
        });
      }
      let worldRectangle = viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.RectangleGeometry({
              rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180.0, 90.0),
              vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
            }),
          }),
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: true,
          }),
          show: true,
        })
      );
      applyWaterMaterial(worldRectangle);
    }; // 将水域处理为一维数组

    onMounted(() => {
      init();
      addTexture();
    });
    return {
      ...refData,
    };
  },
});
</script>

<style lang="scss" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
.primary {
  position: absolute;
  z-index: 100;
  left: 20px;
  top: 20px;
}
</style>
