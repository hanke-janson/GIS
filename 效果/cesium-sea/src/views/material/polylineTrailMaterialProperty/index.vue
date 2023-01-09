<template>
  <div id="viewer-container"></div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { dataGeo, dataDirection } from "./moke";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
import CustomMaterialProperty from "@/earth/material/ts/cesium-polylineTrailMaterialProperty";
import CustomCircleProperty from "@/earth/material/ts/cesium-circleWaveMaterialProperty";
let viewer: any;
let migrateLayers: any;
export default defineComponent({
  name: "App",
  setup() {
    const data = reactive({
      dataGeo: dataGeo as any,
      dataDirection: dataDirection as any,
    });

    let generateCurve = (startPoint: any, endPoint: any): any => {
      let addPointCartesian = new Cesium.Cartesian3();
      Cesium.Cartesian3.add(startPoint, endPoint, addPointCartesian);
      let midPointCartesian = new Cesium.Cartesian3();
      Cesium.Cartesian3.divideByScalar(addPointCartesian, 2, midPointCartesian);
      let midPointCartographic =
        Cesium.Cartographic.fromCartesian(midPointCartesian);
      midPointCartographic.height =
        Cesium.Cartesian3.distance(startPoint, endPoint) / 10;
      let midPoint = new Cesium.Cartesian3();
      Cesium.Ellipsoid.WGS84.cartographicToCartesian(
        midPointCartographic,
        midPoint
      );
      let spline = new Cesium.CatmullRomSpline({
        times: [0.0, 0.5, 1.0],
        points: [startPoint, midPoint, endPoint],
      });
      let curvePointsArr = [];
      for (let i = 0, len = 100; i < len; i++) {
        curvePointsArr.push(spline.evaluate(i / len));
      }
      return curvePointsArr;
    };

    let transformLat = () => {
      dataDirection.forEach((item: any) => {
        let startName = item[0].name; // 出发地
        let destinationName = item[1].name; // 目标地

        // 处理为：当前曲线的笛卡尔坐标点数组
        let startPt = Cesium.Cartesian3.fromDegrees(
          data.dataGeo[startName][0],
          data.dataGeo[startName][1],
          0
        ); // 出发地坐标
        let endPt = Cesium.Cartesian3.fromDegrees(
          data.dataGeo[destinationName][0],
          data.dataGeo[destinationName][1],
          0
        ); // 目标地坐标

        let curLinePointsArr = generateCurve(startPt, endPt); // 分割出100条数据

        // 拓展cesium材质插件1
        let customMaterialProperty: any = CustomMaterialProperty;
        let getCustomMaterialLine = (options: any) => {
          return new customMaterialProperty(options, Cesium);
        };
        migrateLayers.entities.add(
          {
            polyline: {
              width: 2,
              positions: curLinePointsArr,
              material: getCustomMaterialLine({
                color: Cesium.Color.fromCssColorString("rgba(255,255,0,1)"),
                duration: 2000,
                trailLength: 0.2,
              }),
            },
          },
          Cesium
        );
      });

      // 拓展cesium材质插件2
      let customCircleProperty: any = CustomCircleProperty;
      let getCustomCircleProperty = (options: any) => {
        return new customCircleProperty(options, Cesium);
      };
      for (let key in data.dataGeo) {
        migrateLayers.entities.add({
          // 起点
          position: Cesium.Cartesian3.fromDegrees(
            data.dataGeo[key][0],
            data.dataGeo[key][1]
          ),
          ellipse: {
            height: 0,
            semiMinorAxis: 2000,
            semiMajorAxis: 2000,
            material: getCustomCircleProperty({
              duration: 2e3,
              gradient: 10, //亮度
              color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
              count: 3,
            }),
          },
        });
      }

      viewer.flyTo(migrateLayers);
    };

    function initPage() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWNkZTViOS0yYzg0LTQ0NmQtOWRhNC1mMjcwMTViZDdkMmMiLCJpZCI6NTIyODYsImlhdCI6MTYxODUzODUxNH0.WiGDb6l5AcBXZy16wGuSu3OpbB08_ZCsDW2APmhfR8M";
      viewer = new Cesium.Viewer("viewer-container", {
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
      migrateLayers = new Cesium.CustomDataSource("migrateLayers");
      viewer.dataSources.add(migrateLayers);
      transformLat();
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
