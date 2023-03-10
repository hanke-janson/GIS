package com.gdal.demo.test;

import com.gdal.DemoApplication;
import com.gdal.utils.GdalTools;
import lombok.extern.slf4j.Slf4j;
import org.gdal.gdal.Dataset;
import org.gdal.gdal.gdal;
import org.gdal.gdalconst.gdalconstConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.util.Objects;
import java.util.Vector;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoApplication.class)
public class gdalTest {
    @Test
    public void TestShp2GeoJson() {
        String shpPath = "C:\\Users\\admin\\Desktop\\drone\\anQuanQu.shp";
        String geojsonPath = "C:\\Users\\admin\\Desktop\\drone\\anQuanQu.geojson";
        try {
            GdalTools.shp2GeoJson(shpPath, geojsonPath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void TestGdaladdo() {
        String tiffPath = "D:\\tiff-test\\GF3_MYN_SL_024294_E127.8_N26.4_20210322_L2_HH_L20005946154.tif";
        Vector<String> options = new Vector<>();
        // v3.2 - 指定用于金字塔计算的线程数
        // 可以设置为 ALL_CPUS或一个整数值
        options.add("GDAL_NUM_THREADS=ALL_CPUS");
        // v3.1 - 设置块大小 GDAL_TIFF_OVR_BLOCKSIZE <size>
        // 默认128
        options.add("GDAL_TIFF_OVR_BLOCKSIZE=256");
        // v2.3 - 以 BigTIFF 格式创建金字塔  BIGTIFF_OVERVIEW {IF_NEEDED(2.3版本之前的默认值)|IF_SAFER(默认值)|YES|NO}
        // YES 强制 BigTIFF
        // NO 强制 classic TIFF
        // IF_NEEDED 只会在明确需要时创建 BigTIFF(未压缩且概览大于 4G)
        // IF_SAFER 如果生成的文件可能超过 4GB，将创建 BigTIFF
        options.add("BIGTIFF_OVERVIEW=IF_SAFER");
        long startTime = System.currentTimeMillis(); //获取开始时间
        GdalTools.gdaladdoBuiltInPyramid(tiffPath);

        long endTime = System.currentTimeMillis(); //获取结束时间
        System.out.println("内建金字塔时间：" + (endTime - startTime) + "ms"); //输出程序运行时间
    }

    // 批量处理有风险
    @Test
    public void TestGdaladdoN() {
        String tiffPath = "";
        File file = new File(tiffPath);
        Vector<String> options = new Vector<>();
        options.add("GDAL_NUM_THREADS=ALL_CPUS");
        options.add("GDAL_TIFF_OVR_BLOCKSIZE=256");
        options.add("BIGTIFF_OVERVIEW=IF_SAFER");
        // 判断File对象对应的目录是否存在
        if (file.isDirectory()) {
            // 获得目录下的所有文件的文件名
            String[] names = file.list();
            for (int i = 0; i < Objects.requireNonNull(names).length; i++) {
                System.out.println("------------------" + names[i] + "开始处理---------------------");
                //获取开始时间
                long startTime = System.currentTimeMillis();
                GdalTools.gdaladdoBuiltInPyramid(tiffPath + names[i]);
                //获取结束时间
                long endTime = System.currentTimeMillis();
                //输出程序运行时间
                System.out.println(names[i] + " 内建金字塔时间：" + (endTime - startTime) + "ms");
                System.out.println("------------------" + names[i] + "处理完成---------------------");

            }
        }
    }

    @Test
    public void Test() {
        gdal.AllRegister();
        String tiffPath = "D:\\tiff-test\\GF3_MYN_SL_024294_E127.8_N26.4_20210322_L2_HH_L20005946154.tif";
//        String tiffPath = "D:\\tiff-test\\GF3_MDJ_UFS_014190_E122.2_N30.9_20190421_L2_DH_L10003952523.tiff";
        Dataset dataset = gdal.Open(tiffPath, gdalconstConstants.GA_ReadOnly);
        String gdalInfo = gdal.GDALInfo(dataset, null);
        System.out.println(gdalInfo);
//        gdal.Error(gdalconstConstants.CE_Failure, 1, "msg");
    }
}
