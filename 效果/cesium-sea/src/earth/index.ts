import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
export default class Earth {
  private viewerName: string; //私有属性

  constructor(viewerName: string) {
    this.viewerName = viewerName;
  }
  public initMap(): Cesium.Viewer {
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YThkOGJkNi03Zjc3LTRmOWItOGI3Mi1jMGZlMWNhZGI5YTgiLCJpZCI6NTIyODYsImlhdCI6MTYxODUzODMwM30.SVBGT9P6kIjWTzEUH8gDMGVaLJBZXVbYBUMHxgtk0dI";
    const viewer = new Cesium.Viewer(this.viewerName, {
      geocoder: false, // 位置查找工具
      homeButton: false, // 复位按钮
      sceneModePicker: false, // 模式切换
      baseLayerPicker: false, // 图层选择
      navigationHelpButton: false, // 帮助按钮
      animation: false, // 速度控制
      timeline: false, // 时间轴
      fullscreenButton: false, // 全屏
    });

    // 隐藏版权信息
    (viewer as any)._cesiumWidget._creditContainer.style.display = "none";
    viewer.scene.skyAtmosphere.show = false; // 隐藏大气层
    // 设置太阳效果.背面为黑
    viewer.scene.globe.enableLighting = false;
    //全球影像中文注记服务
    const imageryLayers = viewer.scene.imageryLayers;
    imageryLayers.addImageryProvider(
      new Cesium.WebMapTileServiceImageryProvider({
        //影像注记
        url: "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=e10cb5ed481c95efe8dec8967a1f8647",
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        layer: "tdtCiaLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
      })
    );

    return viewer;
  }
}
