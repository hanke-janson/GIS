package com.gdal.controller;

import com.gdal.utils.GdalTools;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Vector;

@RestController
public class GdaladdoController {
    @GetMapping("/test")
    public void gdaladdo(String tiffPath){
//        Vector<String> options = new Vector<>();
//        // v3.2 - 指定用于金字塔计算的线程数
//        // 可以设置为 ALL_CPUS或一个整数值
//        options.add("GDAL_NUM_THREADS=ALL_CPUS");
//        // v3.1 - 设置块大小 GDAL_TIFF_OVR_BLOCKSIZE <size>
//        // 默认128
//        options.add("GDAL_TIFF_OVR_BLOCKSIZE=256");
//        // v2.3 - 以 BigTIFF 格式创建金字塔  BIGTIFF_OVERVIEW {IF_NEEDED(2.3版本之前的默认值)|IF_SAFER(默认值)|YES|NO}
//        // YES 强制 BigTIFF
//        // NO 强制 classic TIFF
//        // IF_NEEDED 只会在明确需要时创建 BigTIFF(未压缩且概览大于 4G)
//        // IF_SAFER 如果生成的文件可能超过 4GB，将创建 BigTIFF
//        options.add("BIGTIFF_OVERVIEW=IF_SAFER");
        long startTime = System.currentTimeMillis(); //获取开始时间
        GdalTools.gdaladdoBuiltInPyramid(tiffPath);

        long endTime = System.currentTimeMillis(); //获取结束时间
        System.out.println("内建金字塔时间：" + (endTime - startTime) + "ms"); //输出程序运行时间
    }

}
