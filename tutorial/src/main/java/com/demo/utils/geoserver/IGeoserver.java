package com.demo.utils.geoserver;

import java.util.ArrayList;

public interface IGeoserver {
    /**
     * 批量发布tiff文件
     * @param workspace 要创建的工作区的名称
     * @param fileUrl tiff文件夹目录
     * @return 已发布的wms链接和layers
     * @throws Exception
     */
    ArrayList<String> releaseTiff(String workspace, String fileUrl,String stylePath) throws Exception;
    /**
     * 发布sld样式文件
     */



}
