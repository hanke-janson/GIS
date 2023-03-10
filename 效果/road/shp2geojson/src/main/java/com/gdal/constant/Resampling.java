package com.gdal.constant;

/**
 * -r 重采样算法 10种
 */
public class Resampling {

    /**
     * 应用最近邻（简单采样）重采样器（默认值）
     */
    public static final String NEAREST = "nearest";
    /**
     * 计算所有非 NODATA 贡献像素的平均值。从 GDAL 3.1 开始，这是一个加权平均值，适当考虑了对目标像素没有完全贡献的源像素的权重
     */
    public static final String AVERAGE = "average";
    /**
     * 计算所有非 NODATA 贡献像素的均方根/二次均值 (GDAL >= 3.3)
     */
    public static final String RMS = "rms";
    /**
     * 应用双线性卷积核
     */
    public static final String BILINEAR = "bilinear";
    /**
     * 计算概览之前应用高斯核，这可以导致比简单平均更好的结果，例如在具有高对比度或噪声模式的锐边的情况下(对于高对比度和图像边界比较明显的图像效果比较好)
     */
    public static final String GAUSS = "gauss";
    /**
     * 一个4*4的近似立方卷积内核(应用三次卷积核)
     */
    public static final String CUBIC = "cubic";
    /**
     * 应用 B 样条卷积核
     */
    public static final String CUBICSPLINE = "cubicspline";
    /**
     * 应用 Lanczos 加窗 sinc 卷积核
     */
    public static final String LANCZOS = "lanczos";
    /**
     * 平均 mag/phase 空间中的复杂数据
     */
    public static final String AVERAGE_MAGPHASE = "average_magphase";
    /**
     * 选择所有采样点中最常出现的值
     */
    public static final String MODE = "mode";

}
