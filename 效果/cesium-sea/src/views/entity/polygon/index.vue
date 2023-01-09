<template>
  <div id="cesiumContainer" />
  <div class="explain">说明：实现缩略图快显功能。采用 面实体+图片材质 完成</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import * as Cesium from "cesium";
import $Earth from "@/earth/index";
let viewer: any;
export default defineComponent({
  name: "App",
  setup() {
    const data = reactive({});
    const init = () => {
      let earthMap = new $Earth("cesiumContainer"); // 控件实例
      viewer = earthMap.initMap();
      loadingSurface();
    };

    const loadingSurface = () => {
      // 与X轴的弧度公式：https://www.hangge.com/blog/cache/detail_1087.html

      // 1、将经纬度坐标系，转换为世界坐标
      let p1 = Cesium.Cartesian3.fromDegrees(85.5401, 46.664);
      let p2 = Cesium.Cartesian3.fromDegrees(88.0228, 46.2085);
      // 2、计算弧度and角度
      const angle: number = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const theta: number = angle * (180 / Math.PI);

      (viewer as any).entities.add({
        polygon: {
          hierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray([
              85.5401, 46.664, 88.0228, 46.2085, 87.3033, 44.3936, 84.8987,
              44.8388, 85.5401, 46.664,
            ]),
          },
          material: new Cesium.ImageMaterialProperty({
            image: require("@/assets/china.jpeg"),
            repeat: new Cesium.Cartesian2(1, 1), // s,t方向重复次数
          }), // 图片材质
          height: 0,
          outline: true,
          outlineColor: Cesium.Color.RED,
          outlineWidth: 1.5,
          stRotation: Cesium.Math.toRadians(180 - theta), // 材质的旋转角度
        },
      });
      viewer.zoomTo(viewer.entities);
    };

    onMounted(() => {
      init();
    });
    const refData = toRefs(data);
    return {
      ...refData,
      init,
    };
  },
});
</script>
<style lang="scss" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
.explain {
  position: absolute;
  left: 180px;
  top: 0;
  z-index: 2;
  background: white;
  color: #3550e7;
}
</style>
