package com.gdal.controller.utils;

import lombok.extern.slf4j.Slf4j;
import org.gdal.gdal.gdal;
import org.gdal.ogr.*;

@Slf4j
public class GdalTools {
    public static void shp2GeoJson(String shpPath, String geoJsonPath) {
        // 注册所有的驱动
        ogr.RegisterAll();
        // 为了支持中文路径，请添加下面这句代码
        gdal.SetConfigOption("GDAL_FILENAME_IS_UTF8", "YES");
        // 为了使属性表字段支持中文，请添加下面这句
        gdal.SetConfigOption("SHAPE_ENCODING", "");
        //打开数据
        DataSource ds = null;
        DataSource dataSource = null;
        try {
            ds = ogr.Open(shpPath, 0);
            if (ds == null) {
                log.info("打开文件失败！");
                return;
            }
            log.info("打开文件成功！");
            Driver dv = ogr.GetDriverByName("GeoJSON");
            if (dv == null) {
                log.info("打开驱动失败！");
                return;
            }
            log.info("打开驱动成功！");
            dataSource = dv.CopyDataSource(ds, geoJsonPath);
            log.info("转换成功！");
        } finally {
            if (ds != null) {
                ds.delete();
            }
            if (dataSource != null) {
                dataSource.delete();
            }
        }
    }

    public static void gdaladdo(){
        ogr.
    }
}
