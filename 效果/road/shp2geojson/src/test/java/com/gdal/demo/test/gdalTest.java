package com.gdal.demo.test;

import com.gdal.DemoApplication;
import com.gdal.controller.utils.GdalTools;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.util.Objects;

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
        String tiffPath = "D:\\tiff-test\\GF2_PMS1_E108.2_N16.2_20170416_L2A0002308895_PAN.tiff";
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
}
