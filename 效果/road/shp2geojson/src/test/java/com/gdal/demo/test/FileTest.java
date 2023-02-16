package com.gdal.demo.test;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import static com.gdal.controller.utils.FileCheckUtil.extractChecksum;

public class FileTest {
    @Test
    public void testDemo() throws NoSuchAlgorithmException, IOException {
        String path1 = "D:\\mnt\\sdb\\docker\\docker-data\\shp\\长沙市.shp";
        String path2 = "D:\\mnt\\sdb\\docker\\docker-data\\geojson\\长沙.shp";
        String checksum1 = extractChecksum(path1, "SHA-1");
        String checksum2 = extractChecksum(path2, "SHA-1");
        String hash = "16d0354b503c54c641b50214eed66e08781e7795";
        Assertions.assertEquals(hash,checksum1);
        Assertions.assertEquals(hash,checksum2);
    }
}
