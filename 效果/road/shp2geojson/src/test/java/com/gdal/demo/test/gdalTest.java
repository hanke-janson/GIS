package com.gdal.demo.test;

import com.gdal.controller.utils.GdalTools;
import org.junit.Test;

public class gdalTest {
    @Test
    public void TestDemo() {
        String shpPath = "C:\\Users\\admin\\Desktop\\drone\\anQuanQu.shp";
        String geojsonPath = "C:\\Users\\admin\\Desktop\\drone\\anQuanQu.geojson";
        GdalTools.shp2GeoJson(shpPath, geojsonPath);
    }
}
