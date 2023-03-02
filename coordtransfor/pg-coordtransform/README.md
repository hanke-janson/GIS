> 基于 PostgreSQL 和 PostGIS 的坐标转换函数，支持点、线、面的 WGS84 和 CGCS2000 与 GCJ02 和 BD09 坐标系与之间互转。

## Example

update vegetation_wgs84 set geom = vegetation_gcj02.geom from (
select gid, geoc_wgs84togcj02(geom) as geom from vegetation_wgs84
) vegetation_gcj02
where vegetation_gcj02.gid = vegetation_wgs84.gid

```sql
-- 如果转换后结果为null，查看geom的srid是否为4326或者4490
WGS84转GCJ02
select geoc_wgs84togcj02(geom) from test_table
GCJ02转WGS84
select geoc_gcj02towgs84(geom) from test_table

WGS84转BD09
select geoc_wgs84tobd09(geom) from test_table
BD09转WGS84
select geoc_bd09towgs84(geom) from test_table

CGCS2000转GCJ02
select geoc_cgcs2000togcj02(geom) from test_table
GCJ02转CGCS2000
select geoc_gcj02tocgcs2000(geom) from test_table

CGCS2000转BD09
select geoc_cgcs2000tobd09(geom) from test_table
BD09转CGCS2000
select geoc_bd09tocgcs2000(geom) from test_table

GCJ02转BD09
select geoc_gcj02tobd09(geom) from test_table
BD09转GCJ02
select geoc_bd09togcj02(geom) from test_table
```

## How to use

```
PostgreSQL安装PostGIS扩展
复制geoc-pg-coordtansform.sql中代码，在数据库执行
```

---

### java

> 注意：转 gcj02 时其实就是坐标加偏，多次执行加偏坐标就不对了哈

导入 shp 数据到 pg 后，编写对应的 entity，mapper， service，controller

例子

```java
// entity
package com.geotools.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.geotools.typeHandler.PolygonTypeHandler;
import lombok.Data;
import org.postgis.Polygon;

@Data
@TableName(value = "gansu", autoResultMap = true)
public class GansuBuilding {

    @TableId(value = "ogc_fid", type = IdType.ASSIGN_ID)
    private Integer fid;

    @TableField(value = "wkb_geometry", typeHandler = PolygonTypeHandler.class)
    private Polygon wkbGeometry;

    @TableField(value = "osm_id")
    private String osmId;

    @TableField(value = "code")
    private Integer code;

    @TableField(value = "fclass")
    private String fClass;

    @TableField(value = "name")
    private String name;

    @TableField(value = "type")
    private String type;

    @TableField(value = "floor")
    private Integer floor;

    @TableField(value = "height")
    private Integer height;
}
```

```java
// mapper
package com.geotools.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.geotools.entity.GansuBuilding;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface GansuBuildingMapper extends BaseMapper<GansuBuilding> {
    String GEOC_WGS84TOGCJ02 = "<script>"
            + "update gansu set wkb_geometry = gansugcj02.wkb_geometry "
            + "from ( "
            + "select ogc_fid, geoc_wgs84togcj02(wkb_geometry) as wkb_geometry from gansu "
            + ") gansugcj02 "
            + "where gansugcj02.ogc_fid = gansu.ogc_fid;"
            + "</script>";

    @Select(GEOC_WGS84TOGCJ02)
    void wgs84ToGcj02();
}
```

```java
//service
package com.geotools.service;

public interface IGansuBuildingService {
    String wgs84ToGcj02();
}
//Impl
package com.geotools.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.geotools.entity.GansuBuilding;
import com.geotools.mapper.GansuBuildingMapper;
import com.geotools.service.IGansuBuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GansuBuildingServiceImpl extends ServiceImpl<GansuBuildingMapper, GansuBuilding> implements IGansuBuildingService {

    @Autowired
    private GansuBuildingMapper gansuBuildingMapper;
    @Override
    public String wgs84ToGcj02() {
        gansuBuildingMapper.wgs84ToGcj02();
        return "转换成功";
    }
}
```

```java
// controller
package com.geotools.Controller;

import com.geotools.service.IGansuBuildingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class GansuBuildingController {
    @Autowired
    private IGansuBuildingService gansuBuildingService;
    @GetMapping("/wgs84ToGcj02")
    public String wgs84ToGcj02() {
        return gansuBuildingService.wgs84ToGcj02();
    }
}
```
