<template>
  <div id="viewer-container"></div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
import CustomMaterialLine from "@/earth/material/ts/cesium-materialLine";
export default defineComponent({
  name: "App",
  setup() {
    const data = reactive({});
    function initPage() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWNkZTViOS0yYzg0LTQ0NmQtOWRhNC1mMjcwMTViZDdkMmMiLCJpZCI6NTIyODYsImlhdCI6MTYxODUzODUxNH0.WiGDb6l5AcBXZy16wGuSu3OpbB08_ZCsDW2APmhfR8M";
      let viewer = new Cesium.Viewer("viewer-container", {
        infoBox: false,
        shouldAnimate: true, //自动播放动画控件
        vrButton: true,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: true,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
      });

      // 自定义纹理材质
      let MaterialLineImage = [
        require("./line.png"),
        require("./line2.png"),
        require("./line3.png"),
      ];

      // color
      let colors = [
        new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1),
        new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 1),
        new Cesium.Color(221 / 255, 221 / 255, 221 / 255, 1),
      ];

      // 创建材质线
      let customMaterialLine: any = CustomMaterialLine;
      let getCustomMaterialLine = (image: any, color: any) => {
        return new customMaterialLine(
          {
            image: image,
            color: color,
            duration: 2000,
          },
          Cesium
        );
      };
      // 添加实体线
      let startPoint = Cesium.Cartesian3.fromDegrees(
        104.081701757991,
        30.627042558105988
      );
      let glowingLine: any = null;
      for (let i = 0, len = 8; i < len; i++) {
        let endPoint = Cesium.Cartesian3.fromDegrees(
          Math.random() / 100 + 104.081701757991,
          Math.random() / 100 + 30.627042558105988
        );
        glowingLine = viewer.entities.add({
          polyline: {
            positions: [startPoint, endPoint],
            width: 5,
            material: getCustomMaterialLine(
              MaterialLineImage[i % 3],
              colors[i % 3]
            ),
          },
        });
      }

      viewer.flyTo(glowingLine);
    }

    onMounted(() => {
      initPage();
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
#viewer-container {
  width: 100%;
  height: 100%;
}
</style>
