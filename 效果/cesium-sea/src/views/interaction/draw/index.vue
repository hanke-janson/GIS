<template>
  <!-- 使用Cesium动态绘制点、线、面、圆、矩形 -->
  <el-button-group class="button-group">
    <el-button
      v-for="item in buttonGroup"
      :key="item.id"
      size="mini"
      @click="selectShape(item.type)"
      >{{ item.name }}</el-button
    >
  </el-button-group>
  <div id="cesiumContainer" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
let viewer: any;
let handler: any;
interface dataProps {
  activeShapePoints: any[];
  activeShape: any;
  floatingPoint: any; // 动态的点，或者是最后的一个点
  drawingMode: string;
  buttonGroup: any[];
  drawShape: any[]; // 最终绘制的实体
  drawPoints: any[]; // 最终绘制的鼠标点
  entityCollection: any[];
}
export default defineComponent({
  name: "Draw",
  setup() {
    const data: dataProps = reactive({
      activeShapePoints: [],
      activeShape: null,
      floatingPoint: null,
      drawShape: [],
      drawPoints: [],
      drawingMode: "line",
      buttonGroup: [
        { id: 1, name: "线", type: "line" },
        { id: 2, name: "多边形", type: "polygon" },
        { id: 3, name: "圆", type: "circle" },
        { id: 4, name: "矩形", type: "rectangle" },
        { id: 5, name: "清除", type: "remove" },
      ],
      entityCollection: [], // 动态的线
    });
    const refData = toRefs(data);
    // 注册鼠标的点击事件
    const registerEvent = () => {
      // 创建dom
      let toolTips: any = createDom();

      handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

      // 取消自带的双击放大监听
      viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );

      // 开启地形深度检测，如果鼠标指针和点不重合，这个选项设置为true试试。
      viewer.scene.globe.depthTestAgainstTerrain = false;

      // 鼠标左键
      handler.setInputAction(function (event: any) {
        // 方式1：
        // 说明：
        // 1、viewer.scene.globe.depthTestAgainstTerrain = true只有在开启地形深度检测，且不使用默认地形时是准确的。
        // 2、pickPosition在depthTestAgainstTerrain=false时只能在3DTile上获取准确位置，当depthTestAgainstTerrain=true时，在3DTile和底图上均能获取准确位置
        // viewer.scene.globe.depthTestAgainstTerrain = true;
        // let earthPosition1 = viewer.scene.pickPosition(event.position);

        // 方式2（推荐）：
        let earthPosition = viewer.scene.globe.pick(
          viewer.camera.getPickRay(event.position),
          viewer.scene
        );

        if (Cesium.defined(earthPosition)) {
          if (data.activeShapePoints.length === 0) {
            data.floatingPoint = createPoint(earthPosition);
            data.drawPoints.push(data.floatingPoint);
            data.activeShapePoints.push(earthPosition);

            var dynamicPositions = new Cesium.CallbackProperty(function () {
              if (data.drawingMode === "polygon") {
                return new Cesium.PolygonHierarchy(data.activeShapePoints);
              }
              return data.activeShapePoints;
            }, false);
            data.activeShape = drawShape(dynamicPositions); // 绘制动态图
          } else if (data.activeShapePoints.length === 2) {
            if (
              data.drawingMode === "rectangle" ||
              data.drawingMode === "circle"
            ) {
              terminateShape();
              removeRegisterEvent();
            }
          }
          data.floatingPoint = createPoint(earthPosition);
          data.drawPoints.push(data.floatingPoint);
          data.activeShapePoints.push(earthPosition);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 鼠标移动
      handler.setInputAction((event: any) => {
        toolTips.style.display = "block";
        toolTips.style.left = event.endPosition.x + 130 + "px";
        toolTips.style.top = event.endPosition.y - 25 + "px";
        let dictionary: string[] = ["polygon", "line"];
        if (dictionary.includes(data.drawingMode)) {
          toolTips.innerHTML = "<p>单击地图开始，双击结束</p>";
        } else {
          toolTips.innerHTML = "<p>单击地图开始，单击结束</p>";
        }

        if (Cesium.defined(data.floatingPoint)) {
          // scene.pickPosition只有在开启地形深度检测，且不使用默认地形时是准确的。
          // var newPosition = viewer.scene.pickPosition(event.endPosition)
          var newPosition = viewer.scene.globe.pick(
            viewer.camera.getPickRay(event.endPosition),
            viewer.scene
          );
          if (Cesium.defined(newPosition)) {
            data.floatingPoint.position.setValue(newPosition);
            data.activeShapePoints.pop();
            data.activeShapePoints.push(newPosition);
            if (data.activeShapePoints.length == 2) {
              // 为多边形的时候，创建一个动态线
              if (data.drawingMode === "polygon") {
                data.activeShapePoints.push(newPosition);
                var dynamicPositions = new Cesium.CallbackProperty(function () {
                  return data.activeShapePoints;
                }, false);
                if (Cesium.defined(dynamicPositions)) {
                  data.entityCollection.push(
                    viewer.entities.add(
                      new Cesium.Entity({
                        polyline: {
                          positions: dynamicPositions,
                          width: 2,
                          clampToGround: true,
                          material: Cesium.Color.RED,
                        },
                      })
                    )
                  );
                }
              }
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      // 鼠标左键双击
      handler.setInputAction(() => {
        terminateShape();
        removeRegisterEvent();
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    };

    // 清除鼠标事件
    const removeRegisterEvent = () => {
      handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      // handler.destroy()
    };

    // 清除绘制
    const clearDraw = () => {
      data.drawPoints.forEach((item: any) => {
        viewer.entities.remove(item);
      }); // 去除动态点图形（当前鼠标点）
      viewer.entities.remove(data.drawShape); // 去除图形
      data.entityCollection.forEach((item: any) => {
        viewer.entities.remove(item);
      }); // 去除动态线图形
      data.entityCollection = [];
      data.floatingPoint = undefined;
      data.activeShape = undefined;
      data.activeShapePoints = [];
      destroyDom();
    };

    // 绘制点
    const createPoint = (worldPosition: any) => {
      var point = viewer.entities.add({
        position: worldPosition,
        point: {
          color: Cesium.Color.RED,
          pixelSize: 5,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
      return point;
    };

    // 创建dom
    const createDom = (): any => {
      const toolTips = document.createElement("div");
      toolTips.id = "toolTips";
      toolTips.style.position = "fixed";
      toolTips.style.pointerEvents = "none";
      toolTips.style.display = "none";
      toolTips.style.color = "#FFFF00";
      document.body.appendChild(toolTips);

      return (document as any).getElementById("toolTips");
    };

    // 销毁dom
    const destroyDom = () => {
      if (document.getElementById("toolTips")) {
        document.body.removeChild((document as any).getElementById("toolTips"));
      }
    };

    // 笛卡尔坐标系转WGS84坐标系
    const Cartesian3_to_WGS84 = (point: any) => {
      var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
      var lat = Cesium.Math.toDegrees(cartographic.latitude);
      var lng = Cesium.Math.toDegrees(cartographic.longitude);
      var alt = cartographic.height;
      return { lat: lat, lng: lng, alt: alt };
    };

    // 获取绘制后的范围
    const getPolygonExent = (positions: any) => {
      const wgs84_positions = [];
      for (let i = 0; i < positions.length; i++) {
        const wgs84_point = Cartesian3_to_WGS84({
          x: positions[i].x,
          y: positions[i].y,
          z: positions[i].z,
        });
        wgs84_positions.push(wgs84_point);
      }
      // console.log("获取绘制后的范围", wgs84_positions);
    };

    // Redraw the shape so it's not dynamic and remove the dynamic shape.
    const terminateShape = () => {
      //   data.activeShapePoints.pop(); // 去除最后一个动态点
      if (data.activeShapePoints.length) {
        data.drawShape = drawShape(data.activeShapePoints); // 绘制最终图
        getPolygonExent(data.activeShapePoints); // 获取绘制后的范围
        removeRegisterEvent(); // 绘制结束后,清除所有鼠标事件
        destroyDom();
      }
      viewer.entities.remove(data.floatingPoint); // 去除动态点图形（当前鼠标点）
      viewer.entities.remove(data.activeShape); // 去除动态图形
      data.floatingPoint = undefined;
      data.activeShape = undefined;
      data.activeShapePoints = [];
    };

    // 绘制图形
    const drawShape = (positionData: any) => {
      var shape;
      if (data.drawingMode === "line") {
        shape = viewer.entities.add({
          polyline: {
            positions: positionData,
            clampToGround: true,
            width: 3,
            material: new Cesium.ColorMaterialProperty(
              Cesium.Color.YELLOW.withAlpha(0.5)
            ),
          },
        });
      } else if (data.drawingMode === "polygon") {
        shape = viewer.entities.add({
          polygon: {
            hierarchy: positionData,
            material: new Cesium.ColorMaterialProperty(
              Cesium.Color.YELLOW.withAlpha(0.5)
            ),
            extrudedHeight: 0,
          },
        });
      } else if (data.drawingMode === "circle") {
        // 当positionData为数组时绘制最终图，如果为function则绘制动态图
        var value =
          typeof positionData.getValue === "function"
            ? positionData.getValue(0)
            : positionData;
        // var start = activeShapePoints[0];
        // var end = activeShapePoints[activeShapePoints.length - 1];
        // var r = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
        // r = r ? r : r + 1;
        shape = viewer.entities.add({
          position: data.activeShapePoints[0],
          name: "Blue translucent, rotated, and extruded ellipse with outline",
          type: "Selection tool",
          ellipse: {
            semiMinorAxis: new Cesium.CallbackProperty(function () {
              // 半径 两点间距离
              var r = Math.sqrt(
                Math.pow(value[0].x - value[value.length - 1].x, 2) +
                  Math.pow(value[0].y - value[value.length - 1].y, 2)
              );
              return r || r + 1;
            }, false),
            semiMajorAxis: new Cesium.CallbackProperty(function () {
              var r = Math.sqrt(
                Math.pow(value[0].x - value[value.length - 1].x, 2) +
                  Math.pow(value[0].y - value[value.length - 1].y, 2)
              );
              return r || r + 1;
            }, false),
            material: Cesium.Color.YELLOW.withAlpha(0.5),
            outline: true,
          },
        });
      } else if (data.drawingMode === "rectangle") {
        // 当positionData为数组时绘制最终图，如果为function则绘制动态图
        var arr =
          typeof positionData.getValue === "function"
            ? positionData.getValue(0)
            : positionData;
        shape = viewer.entities.add({
          name: "Blue translucent, rotated, and extruded ellipse with outline",
          rectangle: {
            coordinates: new Cesium.CallbackProperty(function () {
              var obj = Cesium.Rectangle.fromCartesianArray(arr);
              // if(obj.west==obj.east){ obj.east+=0.000001};
              // if(obj.south==obj.north){obj.north+=0.000001};
              return obj;
            }, false),
            material: Cesium.Color.YELLOW.withAlpha(0.5),
          },
        });
      }
      return shape;
    };

    //  选择绘制图形的类型
    const selectShape = (type: string) => {
      clearDraw();
      registerEvent();
      switch (type) {
        case "line": {
          // 线
          terminateShape();
          data.drawingMode = "line";
          break;
        }
        case "polygon": {
          // 多边形
          terminateShape();
          data.drawingMode = "polygon";
          break;
        }
        case "circle": {
          // 圆
          terminateShape();
          data.drawingMode = "circle";
          break;
        }
        case "rectangle": {
          // 矩形
          terminateShape();
          data.drawingMode = "rectangle";
          break;
        }
        case "remove": {
          // 清除
          clearDraw();
          terminateShape();
          removeRegisterEvent();
          break;
        }
      }
    };

    const init = () => {
      // 资源访问令牌 Cesium token
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZWNkZTViOS0yYzg0LTQ0NmQtOWRhNC1mMjcwMTViZDdkMmMiLCJpZCI6NTIyODYsImlhdCI6MTYxODUzODUxNH0.WiGDb6l5AcBXZy16wGuSu3OpbB08_ZCsDW2APmhfR8M";
      viewer = new Cesium.Viewer("cesiumContainer", {
        geocoder: false, // 位置查找工具
        homeButton: false, // 复位按钮
        sceneModePicker: false, // 模式切换
        baseLayerPicker: false, // 图层选择
        navigationHelpButton: false, // 帮助按钮
        animation: false, // 速度控制
        timeline: false, // 时间轴
        fullscreenButton: false, // 全屏
        infoBox: false,
        selectionIndicator: false,
      });
      const imageryLayers = viewer.imageryLayers;
      const googleMap = new Cesium.UrlTemplateImageryProvider({
        url: "http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}",
      });
      imageryLayers.addImageryProvider(googleMap);
      // 隐藏版权信息
      viewer._cesiumWidget._creditContainer.style.display = "none";
      viewer.scene.skyAtmosphere.show = false; // 隐藏大气层
      // 设置太阳效果.背面为黑
      viewer.scene.globe.enableLighting = true;

      // fly 定位
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

    onMounted(() => {
      init();
      destroyDom();
    });

    return {
      ...refData,
      selectShape,
    };
  },
});
</script>

<style lang="scss" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
.button-group {
  position: absolute;
  left: 180px;
  top: 0;
  z-index: 2;
}
</style>
