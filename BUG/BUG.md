#### 前端请求 minio 中 3dtileset 资源时发生跨域问题

```
Access to XMLHttpRequest at 'http://192.168.12.1:19002/3dtilestest/csGCJ02b3dmlod/tileset.json' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
Cesium.js:41
GET http://192.168.12.1:19002/3dtilestest/csGCJ02b3dmlod/tileset.json net::ERR_FAILED 200
```

![1662515688334](assets/1662515688334.png)

可能是 minio 部署的有点问题，尝试本机部署后，添加桶，以及 3dtiles 文件夹后，直接访问`域名或ip:端口/桶名称/[文件前缀]/文件名`即可，例：`http://192.168.1.91:9000/3dtiles/csGCJ02b3dmlod/tileset.json`

#### Cesium 加载 GeoJson 报错 RuntimeError message: “Unknown crs name: urn:ogc:def:crs:EPSG::3857

[参考文章](https://blog.csdn.net/a571574085/article/details/108003955)

```js
    <!-- 坐标转换 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.8.0/proj4.js"></script>
 // 解决"RuntimeError", message: "Unknown crs name: urn:ogc:def:crs:EPSG::3857"
        Cesium.GeoJsonDataSource.crsNames[
            "urn:ogc:def:crs:EPSG::3857"
        ] = Cesium.GeoJsonDataSource.crsNames["EPSG:3857"] = function (
            coordinates
        ) {
            const firstProjection =
                'PROJCS["WGS 84 / Pseudo-Mercator",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]],PROJECTION["Mercator_1SP"],PARAMETER["central_meridian",0],PARAMETER["scale_factor",1],PARAMETER["false_easting",0],PARAMETER["false_northing",0],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AXIS["X",EAST],AXIS["Y",NORTH],EXTENSION["PROJ4","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"],AUTHORITY["EPSG","3857"]]';
            const secondProjection =
                'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]';

            const xa = coordinates[0];
            const ya = coordinates[1];

            const newCoordinates = proj4(
                firstProjection,
                secondProjection,
                [xa, ya]
            );
            return Cesium.Cartesian3.fromDegrees(
                newCoordinates[0],
                newCoordinates[1],
                0
            );
        };
```

#### CESIUM 加载 geoserver 的 WMS（含跨域解决）

[参考](https://www.freesion.com/article/4394197253/)

#### Cesium 加载的模型很暗

修改 gltf 中**materials**节点

```json
{
    "doubleSided" : true,
    "name" : "Material #2145370080",
    "pbrMetallicRoughness" : {
        "baseColorTexture" : {
            "index" : 9
        },
    "metallicFactor" : 0,
    "roughnessFactor" : 0.858578622341156
    }
},
```

其中：

**pbrMetallicRoughness：**指定了基于 metallic-roughness 模型的材质属性(没有显式指定的材质属性会使用属性的默认值)；

**baseColorFactor：**包含了红，绿，蓝和 alpha 成分，构成了材质了基本颜色(这里设置的是亮橘色)。

**metallicFactor：**用于指定材质的反射情况与金属的相似度。

**roughnessFactor：**用于指定材质粗糙度。

**检查 materials 节点的材质是否具有 metallicFactor 属性，metallicFactor 的值在 0-1 之间，值越大，模型越暗。**

#### postman 测试 OAuth2 非法访问 401

在启动类上加@EnableResourceServer

非法访问 在请求头中加  from：gateway

401 在启动日志中查找`Using generated security password`在 Authoriaztion 中选择 Basic Auth 输入 Username=user Password=`Using generated security password的值`即可

#### java sql 拼接

```java
public class ConvertSql {
    public static final String GEOC_SQL_COORDINATE_TRANSFORM = "select ST_asText(%s(ST_GeomFromText(#{wkt}, #{srid})))";
}
```

```java
public enum PgTransformEnum {
    // 常用坐标转换
    WGS84TOGCJ02(1, "GEOC_WGS84TOGCJ02"),
    GCJ02TOWGS84(2, "GEOC_GCJ02TOWGS84"),
    WGS84TOBD09(3, "GEOC_WGS84TOBD09"),
    BD09TOWGS84(4, "GEOC_BD09TOWGS84"),
    CGCS2000TOGCJ02(5, "GEOC_CGCS2000TOGCJ02"),
    GCJ02TOCGCS2000(6, "GEOC_GCJ02TOCGCS2000"),
    CGCS2000TOBD09(7, "GEOC_CGCS2000TOBD09"),
    BD09TOCGCS2000(8, "GEOC_BD09TOCGCS2000"),
    GCJ02TOBD09(9, "GEOC_GCJ02TOBD09"),
    BD09TOGCJ02(10, "GEOC_BD09TOGCJ02");

    private final int transformType;

    private final String convertSql;

    PgTransformEnum(int transformType, String convertSql) {
        this.transformType = transformType;
        this.convertSql = convertSql;
    }

    public int getTransformType() {
        return this.transformType;
    }

    public String getConvertSql() {
        return this.convertSql;
    }

    public static String getConvertSqlFuncByCode(int code) {
        for (PgTransformEnum value : PgTransformEnum.values()) {
            if (value.getTransformType() == code) {
                return value.getConvertSql();
            }
        }
        return "";
    }
}
```

```java
@Select("${sql}")
    String coordinateConvert(String wkt, int srid, String sql);
```

```java
public String coordinateConvert(Double lon, Double lat, Integer srid, Integer crsCode) {
        String point = new Point(lon, lat).toString();
        String crsFunc = PgTransformEnum.getConvertSqlFuncByCode(crsCode);
        return transformMapper.coordinateConvert(point, srid, String.format(GEOC_SQL_COORDINATE_TRANSFORM, crsFunc));
    }
```
