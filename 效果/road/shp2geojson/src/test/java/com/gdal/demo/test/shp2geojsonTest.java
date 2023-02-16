package com.gdal.demo.test;

import com.gdal.controller.utils.GdalTools;
import org.junit.Test;

public class shp2geojsonTest {
    @Test
    public void TestDemo() {
        String tiffPath = "C:\\Users\\admin\\Desktop\\data\\案例+硬件需求\\水库大坝溃决\\output\\flood\\Depth (01MAR2020 16 40 00).tif";
        String shpPath = "C:\\Users\\admin\\Desktop\\data\\案例+硬件需求\\水库大坝溃决\\output\\flood\\Depth (01MAR2020 16 40 00).shp";
        String geojsonPath = "C:\\Users\\admin\\Desktop\\output\\output\\NEW_TB_struct_shake_.geojson";
//        GdalTools.shp2GeoJson(shpPath, geojsonPath);
        GdalTools.tiff2Shp(tiffPath, shpPath);
    }
}
