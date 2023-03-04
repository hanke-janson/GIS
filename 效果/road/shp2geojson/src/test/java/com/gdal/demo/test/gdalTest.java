package com.gdal.demo.test;

import com.gdal.DemoApplication;
import com.gdal.controller.utils.GdalTools;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

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
        String tiffPath = "D:\\tiff_test_58g\\XX12-1_CCD_000304934_MMB07_001_01_002_003_L2.tiff";
        try {
            GdalTools.gdaladdoBuiltInPyramid(tiffPath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
