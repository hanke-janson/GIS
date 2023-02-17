package com.demo.service;

public interface IProjService {
    /**
     * 将坐标从WGS84转为UTM
     * 从名称获取CRS
     */
    String CRSFromName();

    /**
     * 将坐标从WGS84转为UTM
     * 从参数获取CRS
     */
    String CRSFromVal();

    /**
     * 将坐标从WGS84转为UTM
     * 变换坐标
     */
    String CRSToCRS();
}
