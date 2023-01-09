<template>
  <div id="cesiumContainer">
    <div id="slider">
      <div class="areaScale">
        <div class="areaScale-tree" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
let viewer: any;
export default defineComponent({
  name: "Point",
  setup() {
    const data = reactive({});
    const init = () => {
      const gaodeEarth = new Cesium.UrlTemplateImageryProvider({
        url: "http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
      });
      viewer = new Cesium.Viewer("cesiumContainer", {
        imageryProvider: gaodeEarth, // 地图数据
        geocoder: false, // 位置查找工具
        homeButton: false, // 复位按钮
        sceneModePicker: false, // 模式切换
        baseLayerPicker: false, // 图层选择
        navigationHelpButton: false, // 帮助按钮
        animation: false, // 速度控制
        timeline: false, // 时间轴
        fullscreenButton: false, // 全屏
      });

      // 卷帘效果
      roller(viewer);

      // 隐藏版权信息
      viewer._cesiumWidget._creditContainer.style.display = "none";
      viewer.scene.skyAtmosphere.show = false; // 隐藏大气层
      // 设置太阳效果.背面为黑
      viewer.scene.globe.enableLighting = true;
      // fly
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          114.296063,
          30.55245,
          20000000
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
        duration: 2, // fly time 2s
      });
    };

    const roller = (viewer: any): void => {
      const layers = viewer.imageryLayers;

      //   这个卷帘图层在左边显示
      const balckMarble = layers.addImageryProvider(
        new Cesium.ArcGisMapServerImageryProvider({
          url: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        })
      );

      balckMarble.splitDirection = Cesium.ImagerySplitDirection.LEFT;

      const slider: any = document.getElementById("slider");
      viewer.scene.imagerySplitPosition =
        slider.offsetLeft / slider.parentElement.offsetWidth;

      const handler = new Cesium.ScreenSpaceEventHandler(slider);
      let moveActive = false;
      function move(movement: any) {
        if (!moveActive) {
          return;
        }
        const relativeOffset = movement.endPosition.x;
        const splitPosition =
          (slider.offsetLeft + relativeOffset) /
          slider.parentElement.offsetWidth;
        slider.style.left = 100.0 * splitPosition + "%";
        viewer.scene.imagerySplitPosition = splitPosition;
      }

      handler.setInputAction(() => {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      handler.setInputAction(() => {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.PINCH_START);

      handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

      handler.setInputAction(() => {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
      handler.setInputAction(() => {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.PINCH_END);
    };

    onMounted(() => {
      init();
    });
    return {
      ...toRefs(data),
      roller,
    };
  },
});
</script>

<style lang="scss" scoped>
#cesiumContainer {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  #slider {
    position: absolute;
    left: 50%;
    top: 0px;
    background-color: #d3d3d3;
    width: 1px;
    height: 100%;
    z-index: 2;
    .areaScale {
      position: absolute;
      right: -6px;
      top: 42%;
      line-height: 40px;
      text-align: center;
      z-index: 11;
      cursor: pointer;
      width: 15px;
      height: 60px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        cursor: ew-resize;
      }
      .areaScale-tree {
        width: 2px;
        height: 40px;
        background: #98a6ad;
        opacity: 0.7;
      }
    }
  }
}
</style>
