package com.gdal.controller.utils;

import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import org.gdal.gdal.*;
import org.gdal.gdal.ProgressCallback;
import org.gdal.gdalconst.gdalconstConstants;
import org.gdal.ogr.*;
import org.gdal.ogr.Driver;

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

    public static void gdaladdo(String tiffPath) {
        gdal.AllRegister();
        Dataset dataset = gdal.Open(tiffPath, gdalconstConstants.GA_ReadOnly);
        dataset.BuildOverviews("nearest", new int[]{2, 4, 6, 8, 16}, new buildOverViewCallBack());
    }

    //进度回调
    static class buildOverViewCallBack extends ProgressCallback {
        @Override
        public int run(double dfComplete, String pszMessage) {
            if (StrUtil.isNotBlank(pszMessage)) {
                System.out.println(pszMessage);
            }
            System.out.printf("%.2f%n", dfComplete * 100);
            return 1;
        }
    }
}
