package com.gdal.demo.test;

import com.gdal.controller.utils.GdalTools;
import org.junit.Test;

public class gdalTest {
    @Test
    public void TestDemo() {
        String shpPath = "C:\\Users\\admin\\Desktop\\drone\\xianFeiQu.shp";
        String geojsonPath = "C:\\Users\\admin\\Desktop\\drone\\xianFeiQu.geojson";
        GdalTools.shp2GeoJson(shpPath, geojsonPath);
    }
}
