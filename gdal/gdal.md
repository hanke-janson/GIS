# GDAL

文件的最大存储大小不仅由文件的格式决定，而且和操作系统有关

## VRT-虚拟格式

## tiff 内建金字塔

```cmd
gdaladdo -r average --config GDAL_NUM_THREADS ALL_CPUS --config GDAL_TIFF_OVR_BLOCKSIZE 256 --config BIGTIFF_OVERVIEW IF_SAFER D:\**.tif 2 4 8 16 32 64 128
```

### BuildOverviews(String resampling, int[] overviewlist, ProgressCallback callback, Vector options) 选项的存储方式

BuildOverviews 方法中的选项参数用于传递控制方法行为的附加参数。options 参数是 Vector 类型，它是类似于 ArrayList 的遗留类。它是一个动态数组，可以容纳任何类型的对象。options 参数通常用于传递选项，例如用于概览的压缩方法。BuildOverviews 方法是 GDAL 库的一部分，用于读取、写入和操作地理空间数据。该方法创建概视图，它们是栅格数据集的较低分辨率版本。通过允许用户查看不同细节级别的数据，概视图可用于加速大型栅格数据集的显示。

BuildOverviews 方法采用多个参数，包括重采样、概览列表、回调和选项。重采样参数指定创建概视图时要使用的重采样算法。overviewlist 参数是一个数组，指定要创建的概览级别。回调参数是在创建概览期间定期调用的函数，用于向用户提供反馈。options 参数用于将附加参数传递给该方法。options 参数通常用于传递选项，例如用于概览的压缩方法。options 参数是一个 Vector 对象，可以容纳任何类型的对象。

options 参数可用于将各种选项传递给 BuildOverviews 方法，包括： - 压缩方法：用于概览的压缩方法。这可以设置为“NONE”、“LZW”、“JPEG”、“JPEG2000”、“DEFLATE”、“PACKBITS”、“ZSTD”或“WEBP”。 - 质量：用于 JPEG 压缩的质量设置。这可以设置为 1 到 100 之间的值。 - 块大小：用于压缩的块大小。这可以设置为 1 到 65535 之间的值。

以下是如何使用带有选项参数的 BuildOverviews 方法的示例：

```java
Vector options = new Vector();
options.add("COMPRESS=DEFLATE");
options.add("JPEG_QUALITY=75");
options.add("BLOCKSIZE=256");

Dataset dataset = gdal.Open("input.tif", gdalconst.GA_Update);
dataset.BuildOverviews("NEAREST", new int[] { 2, 4, 8, 16 }, null, options);
dataset.delete();
```
