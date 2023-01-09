/**坐标转换 */
function defined(value) {
    return value !== undefined && value !== null;
}

function getCamera() {
    return {
        position: this.viewer.camera.position, //位置
        direction: this.viewer.camera.direction, //方向
        heading: this.viewer.camera.heading, //航向角
        pitch: this.viewer.camera.pitch //俯仰角
    }
}
/**
 * 弧度转角度
 */
function radian2Angle(radian) {
    // 角度 = 弧度 * 180 / Math.PI;
    return radian * 180 / Math.PI;
}
/**
 * 角度转弧度
 */
function angle2Radian(angle) {
    // 弧度= 角度 * Math.PI / 180;
    return angle * Math.PI / 180;
}

//#region 坐标转换
//二维屏幕坐标系到三维坐标系的转换
function cartesian2ToCartesian3(cartesian2) {
    return scene.globe.pick(viewer.camera.getPickRay(cartesian2), scene); //其中cartesian2为一个二维屏幕坐标。
}
//三维坐标系到二维屏幕坐标系的转换
function cartesian3ToCartesian2(cartesian3) {
    return Cesium.Cartesian2.fromCartesian3(cartesian3);
}
//三维坐标到地理坐标的转换
function cartesian3ToCartographic(cartesian3) {
    return scene.globe.ellipsoid.cartesianToCartographic(cartesian3); //其中cartesian3为一个Cesium.Cartesian3。
}
//地理坐标到经纬度坐标的转换
function cartographicToWgs84(cartographic) {
    return [cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
}
//三维坐标到经纬度坐标的转换
function cartesian3ToWgs84(cartesian3) {
    var cartographic = cartesian3ToCartographic(cartesian3);
    return [cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
}
//经纬度坐标转地理坐标（弧度）
function wgs84ToCartographic(point) {
    return Cesium.Cartographic.fromDegree(point);
}
//经纬度坐标转世界坐标
function wgs84ToCartesian3Three(longitude, latitude, height) {
    return Cesium.Cartesian3.fromDegrees(longitude, latitude, height, scene.globe.ellipsoid);
}
//经纬度坐标转世界坐标
function wgs84ToCartesian3(point) {
    return Cesium.Cartesian3.fromDegree(point);
}
//地理坐标（弧度）转世界坐标
function cartographicToCartesian3(cartographic) {
    return scene.globe.ellipsoid.cartographicToCartesian(cartographic);
}
//地理坐标（弧度）转世界坐标
function cartographicToCartesian3Three(longitude, latitude, height) {
    return Cesium.Cartesian3.fromRadians(longitude, latitude, height, scene.globe.ellipsoid);
}
//#endregion
/**
 * 获取相机水平面上投影朝向
 * @param {Cesium.Camera} camera 相机
 */
function getHorizontalDirection(camera, result) {
    if (!defined(result)) {
        result = new Cesium.Cartesian3();
    }
    var direction = camera.direction;
    var position = camera.position;
    var pitch = camera.pitch;

    camera.look(camera.right, pitch);
    Cesium.Cartesian3.clone(camera.direction, result);
    camera.look(camera.right, -1 * pitch);

    Cesium.Cartesian3.normalize(result, result);
    return result;
}

/**
 * 计算当前时间点飞机模型的位置矩阵
 * @param {Cesium.Entity} entity 3D实体
 * @param {Number} time 时间
 */
function computeModelMatrix(entity, time) {
    //获取位置
    var position = Cesium.Property.getValueOrUndefined(entity.position, time, new Cesium.Cartesian3());
    if (!Cesium.defined(position)) {
        return undefined;
    }
    //获取方向
    var modelMatrix;
    var orientation = Cesium.Property.getValueOrUndefined(entity.orientation, time, new Cesium.Quaternion());
    if (!Cesium.defined(orientation)) {
        modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, new Cesium.Matrix4());
    } else {
        modelMatrix = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(orientation, new Cesium.Matrix3()), position, new Cesium.Matrix4());
    }
    return modelMatrix;
}
/**
 * 计算引擎(粒子发射器)位置矩阵
 * @param {Number} xOffset
 * @param {Number} yOffset
 * @param {Number} zOffset
 */
function computeEmitterModelMatrix(xOffset, yoffset, zOffset) {
    //方向
    var hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, new Cesium.HeadingPitchRoll());
    var trs = new Cesium.TranslationRotationScale();

    //以modelMatrix(飞机)中心为原点的坐标系的xyz轴位置偏移
    Cesium.Cartesian3.fromElements(xOffset, yoffset, zOffset, trs.translation);
    Cesium.Quaternion.fromHeadingPitchRoll(hpr, trs.rotation);
    return Cesium.Matrix4.fromTranslationRotationScale(trs, new Cesium.Matrix4());
}

var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function wgs84togcj02(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat]
    }
}

/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcj02towgs84(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        mglat = lat + dlat;
        mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat]
    }
}

function transformlat(lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(
        lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformlng(lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}