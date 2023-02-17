package com.demo.service.impl;

import com.demo.service.IProjService;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.proj4j.*;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ProjServiceImpl implements IProjService {
    /**
     * 将坐标从WGS84转为UTM
     * 从名称获取CRS
     */
    @Override
    public String CRSFromName() {
        CRSFactory crsFactory = new CRSFactory();
        CoordinateReferenceSystem WGS84 = crsFactory.createFromName("epsg:4326");
        CoordinateReferenceSystem UTM = crsFactory.createFromName("epsg:25833");
        log.info("{}", WGS84);
        log.info("{}", UTM);
        log.info("{}", crsFactory.createFromName("epsg:4490"));
        return null;
    }

    /**
     * 将坐标从WGS84转为UTM
     * 从参数获取CRS
     */
    @Override
    public String CRSFromVal() {
        CRSFactory crsFactory = new CRSFactory();
        CoordinateReferenceSystem WGS84 = crsFactory.createFromParameters("WGS84",
                "+proj=longlat +datum=WGS84 +no_defs");
        CoordinateReferenceSystem UTM = crsFactory.createFromParameters("UTM",
                "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
        CoordinateReferenceSystem CGCS2000 = crsFactory.createFromParameters("4490",
                "+proj=longlat +ellps=GRS80 +no_defs");
        log.info("WGS84: {}", WGS84);
        log.info("UTM: {}", UTM);
        log.info("4490: {}", CGCS2000);
        return null;
    }

    /**
     * 将坐标从WGS84转为UTM
     * 变换坐标
     */
    @Override
    public String CRSToCRS() {
        CRSFactory crsFactory = new CRSFactory();
        CoordinateReferenceSystem WGS84 = crsFactory.createFromName("epsg:4326");
        CoordinateReferenceSystem UTM = crsFactory.createFromName("epsg:25833");

        CoordinateTransformFactory ctFactory = new CoordinateTransformFactory();
        CoordinateTransform wgsToUtm = ctFactory.createTransform(WGS84, UTM);
        // `result` is an output parameter to `transform()`
        ProjCoordinate result = new ProjCoordinate();
        wgsToUtm.transform(new ProjCoordinate(116.20, 39.56), result);
        log.info("{}", result);
        return null;
    }
}
