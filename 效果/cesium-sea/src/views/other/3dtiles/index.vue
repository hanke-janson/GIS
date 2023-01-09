<template>
  <div id="cesiumContainer"></div>
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
      viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false, // 隐藏动画控件
        baseLayerPicker: false, // 隐藏图层选择控件
        fullscreenButton: false, // 隐藏全屏按钮
        vrButton: false, // 隐藏VR按钮，默认false
        geocoder: true, // 隐藏地名查找控件
        homeButton: false, // 隐藏Home按钮
        infoBox: false, // 隐藏点击要素之后显示的信息窗口
        sceneModePicker: false, // 隐藏场景模式选择控件
        selectionIndicator: true, // 显示实体对象选择框，默认true
        timeline: false, // 隐藏时间线控件
        navigationHelpButton: false, // 隐藏帮助按钮
        scene3DOnly: true, // 每个几何实例将只在3D中呈现，以节省GPU内存
        shouldAnimate: true, // 开启动画自动播放
        sceneMode: 3, // 初始场景模式 1：2D 2：2D循环 3：3D，默认3
        requestRenderMode: true, // 减少Cesium渲染新帧总时间并减少Cesium在应用程序中总体CPU使用率
        // 如场景中的元素没有随仿真时间变化，请考虑将设置maximumRenderTimeChange为较高的值，例如Infinity
        maximumRenderTimeChange: Infinity,
        // 加载本地离线地图
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          // url: "http://192.168.1.84:8888/bm/map/{z}/{x}/{y}",
          // url: "http://localhost:5000/map-12/{x}/{y}/{z}",
          // 本地
          url: "http://localhost:8888/bm/map/{z}/{x}/{y}",
          // 谷歌
          // url: "http://khms0.google.com/kh/v=908?&x={x}&y={y}&z={z}",
          // 高德
          // url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
          maximumLevel: 14,
        }),
      });
      // 隐藏版权信息
      viewer._cesiumWidget._creditContainer.style.display = "none";
      viewer.scene.skyAtmosphere.show = true; // 显示大气层

      // 设置相机视角位置
      viewer.camera.setView({
        destination: new Cesium.Cartesian3(
          -2200174.8573424825,
          5195968.631983663,
          3000028.3598765237
        ),
        orientation: {
          heading: 0.35631019520437945, // east, default value is 0.0 (north)
          pitch: -1.5629984805761383, // default value (looking down)
          roll: 0.0, // default value
        },
      });
      // 加载tileset数据及其优化选项
      viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: "http://192.168.12.1:19002/3dtilestest/csGCJ02b3dmlod/tileset.json",
          skipLevelOfDetail: true,
          baseScreenSpaceError: 1024,
          maximumScreenSpaceError: 1, // 数值加大，能让最终成像变模糊
          skipScreenSpaceErrorFactor: 16,
          skipLevels: 1,
          immediatelyLoadDesiredLevelOfDetail: false,
          loadSiblings: true, // 如果为true则不会在已加载完概况房屋后，自动从中心开始超清化房屋
          cullWithChildrenBounds: true,
          cullRequestsWhileMoving: true,
          cullRequestsWhileMovingMultiplier: 10, // 值越小能够更快的剔除
          preloadWhenHidden: true,
          preferLeaves: true,
          maximumMemoryUsage: 128, // 内存分配变小有利于倾斜摄影数据回收，提升性能体验
          progressiveResolutionHeightFraction: 0.5, // 数值偏于0能够让初始加载变得模糊
          dynamicScreenSpaceErrorDensity: 0.5, // 数值加大，能让周边加载变快
          dynamicScreenSpaceErrorFactor: 1, // 不知道起了什么作用没，反正放着吧先
          dynamicScreenSpaceError: true, // 根据测试，有了这个后，会在真正的全屏加载完之后才清晰化房屋
        })
      );

      // 设置太阳效果.背面为黑
      //   viewer.scene.globe.enableLighting = true;
      // fly
      //   viewer.camera.flyTo({
      //     destination: Cesium.Cartesian3.fromDegrees(
      //       81.0280769626345,
      //       40.57720615177421,
      //       20000
      //     ),
      //     orientation: {
      //       heading: Cesium.Math.toRadians(0),
      //       pitch: Cesium.Math.toRadians(-90),
      //       roll: 0.0,
      //     },
      //     duration: 2, // fly time 2s
      //   });
      //   viewer.camera.flyTo({
      //     destination: Cesium.Rectangle.fromDegrees(
      //       81.0280769626345,
      //       40.57720615177421,
      //       81.96459010504744,
      //       39.895459046652256
      //     ),
      //   });
    };

    onMounted(() => {
      init();
    });
    return {
      ...toRefs(data),
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
}
</style>
