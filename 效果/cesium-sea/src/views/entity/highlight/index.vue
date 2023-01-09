<template>
  <div id="cesiumContainer" />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
import areas from "./areas";
let viewer: any;
let previousPickedEntity: any;
export default defineComponent({
  name: "App",
  setup() {
    const data = reactive({});
    const init = () => {
      // 高德地图(影像图层)
      const gaodeEarth = new Cesium.UrlTemplateImageryProvider({
        url: "http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
      });
      viewer = new Cesium.Viewer("cesiumContainer", {
        imageryProvider: gaodeEarth, //地图数据
        geocoder: false, //位置查找工具
        homeButton: false, //复位按钮
        sceneModePicker: false, //模式切换
        baseLayerPicker: false, //图层选择
        navigationHelpButton: false, //帮助按钮
        animation: false, //速度控制
        timeline: false, //时间轴
        fullscreenButton: false, //全屏
        selectionIndicator: false, //是否显示选取指示器组件
        infoBox: false, //信息框
        shouldAnimate: false, //自动播放动画控件
        shadows: true, //是否显示光照投射的阴影
        terrainShadows: Cesium.ShadowMode.RECEIVE_ONLY, //地质接收阴影
        sceneMode: Cesium.SceneMode.SCENE3D,
      }); //隐藏版权信息
      viewer._cesiumWidget._creditContainer.style.display = "none";
      viewer.scene.skyAtmosphere.show = false; //隐藏大气层 //设置太阳效果.背面为黑
      viewer.scene.globe.enableLighting = true; //fly(飞行器)
    }; // 加载的面

    const addGeoJsonPolygon = () => {
      // 第一种加载方式
      let promise: any = viewer.dataSources.add(
        Cesium.GeoJsonDataSource.load(areas, {
          stroke: Cesium.Color.BLUE.withAlpha(0.8),
          strokeWidth: 2.3,
          fill: Cesium.Color.RED.withAlpha(0.3),
          clampToGround: true,
        })
      ); // 注册鼠标移动事件

      viewer.flyTo(promise);

      const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (movement) {
        let pickedPrimitive = viewer.scene.pick(movement.endPosition);

        let pickedEntity = Cesium.defined(pickedPrimitive)
          ? pickedPrimitive.id
          : undefined;

        // Unhighlight the previously picked entity // 取消突出显示前面选中的实体
        if (Cesium.defined(previousPickedEntity)) {
          previousPickedEntity.polygon.material =
            Cesium.Color.RED.withAlpha(0.3);
        }

        // Highlight the currently picked entity // 突出显示当前选择的实体
        if (
          Cesium.defined(pickedEntity) &&
          Cesium.defined(pickedEntity.polygon)
        ) {
          pickedEntity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.3);
          previousPickedEntity = pickedEntity;
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    };

    onMounted(() => {
      init();
      addGeoJsonPolygon();
    });
    const refData = toRefs(data);
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
</style>
