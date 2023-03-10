package com.gdal.controller.utils;

import cn.hutool.core.util.StrUtil;
import com.gdal.controller.constant.Resampling;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.gdal.gdal.*;
import org.gdal.gdal.ProgressCallback;
import org.gdal.gdalconst.gdalconstConstants;
import org.gdal.ogr.*;
import org.gdal.ogr.Driver;

import java.util.Vector;

@Slf4j
public class GdalTools {
    // gdaladdo -r average --config BIGTIFF_OVERVIEW YES D:\tiff_test_58g\SV1-03_20200308_L2A0001248876_8042200088170014_01-PAN.tiff 2 4 8 16 32 64

    /**
     * shp转geojson
     *
     * @param shpPath     shp路径
     * @param geoJsonPath geojson路径
     */
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

    /**
     * gdaladdo 外建金字塔
     *
     * @param tiffPath tiff路径 ovr金字塔文件生成在同一目录下
     */
    public static void gdaladdo(String tiffPath) {
        gdal.AllRegister();
        // GDALOpen的访问权限参数会影响图像的创建金字塔方式
        Dataset dataset = gdal.Open(tiffPath, gdalconstConstants.GA_ReadOnly);
        Vector<String> options = new Vector<>();
        options.add("-r average");
        options.add("--config BIGTIFF_OVERVIEW YES");
        dataset.BuildOverviews("nearest", new int[]{2, 4, 8, 16, 32, 64}, new buildOverViewCallBack(), options);
    }

    /**
     * gdaladdo 内建金字塔
     *
     * @param tiffPath tiff路径 注：内建金字塔无法恢复源文件
     */
    public static void gdaladdoBuiltInPyramid(String tiffPath, Vector<String> options) {
        gdal.AllRegister();
        // GDALOpen的访问权限参数会影响图像的创建金字塔方式
        Dataset dataset = gdal.Open(tiffPath, gdalconstConstants.GA_Update);
        // 命令：gdaladdo -r average --config GDAL_NUM_THREADS ALL_CPUS --config GDAL_TIFF_OVR_BLOCKSIZE 256 --config BIGTIFF_OVERVIEW IF_SAFER D:\**.tif 2 4 8 16 32 64 128
        // BuildOverviews()返回值0为成功 其他值为失败   如果没有建立金字塔 会直接返回其他值 - 失败    只要执行了 那就返回0 - 成功
        int nearest = dataset.BuildOverviews(Resampling.AVERAGE, new int[]{2, 4, 8, 16, 32, 64, 128}, new buildOverViewCallBack(), options);
        // 关闭数据集并释放所有资源
        dataset.delete();
        if (nearest == 0) {
            System.out.println("命令已执行！");
        } else {
            System.out.println("命令未执行！");
        }
    }

    //进度回调
    static class buildOverViewCallBack extends ProgressCallback {
        @SneakyThrows
        @Override
        //dfComplete，它是一个介于 0 和 1 之间的双精度值，表示完成的百分比，而message，它是一个可选的字符串，可用于将消息传递给回调方法。
        public int run(double dfComplete, String pszMessage) {
            // pszMessage 通常为Null
            if (StrUtil.isNotBlank(pszMessage)) {
                System.out.println(("warning:" + pszMessage));
            }
            // 获取第一条控制台报错信息
            String errorMsg = gdal.GetLastErrorMsg();
            if (StrUtil.isNotBlank(errorMsg)) {
//                throw new Exception(errorMsg);
                System.out.println("error: "+errorMsg);
            }
           /* // 完全关闭错误信息
            gdal.PushErrorHandler("CPLQuietErrorHandler");
            // 发生错误时启用异常
            gdal.UseExceptions();
            try {
                gdal.Error(gdalconstConstants.CE_Failure, 1, gdal.GetLastErrorMsg());
            } catch (Exception e) {
                e.printStackTrace();
            }*/
            // 打印gdal操作的进度
            System.out.printf("进度：%.2f%%\n", dfComplete * 100);
            // 返回0表示中断处理  返回其他值表示继续处理
            return 1;
        }
    }
}
