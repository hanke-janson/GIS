"""
tiff内建金字塔
"""

from osgeo import gdal
from osgeo.gdalconst import *

# 注册geotiff驱动
gdal.AllRegister()
# Open the raster file 读写方式影像tiff建立金字塔的方式 gdal.GA_ReadOnly建立外建金字塔 gdal.GA_Update建立内建金字塔
dataset = gdal.Open('D:/tiff-test/GF3_MDJ_UFS_014190_E122.2_N30.9_20190421_L2_DH_L10003952523.tiff', gdal.GA_Update)
options = {'GDAL_NUM_THREADS': 'ALL_CPUS',
           'GDAL_TIFF_OVR_BLOCKSIZE': 256,
           'BIGTIFF_OVERVIEW': 'IF_SAFER'}


def progress_callback(complete, message, progressArg, data):
    print("Progress: %d%%, Message: %s" % (complete * 100, message))


# 内建金字塔
dataset.BuildOverviews(gdal.GRA_Average, overviewlist=[2, 4, 8, 16, 32, 64, 128], callback=progress_callback, **options)

'''
# Get the number of bands in the raster
num_bands = dataset.RasterCount

# Get the size of the raster
cols = dataset.RasterXSize
rows = dataset.RasterYSize

# Get the projection and geotransform
projection = dataset.GetProjection()
geotransform = dataset.GetGeoTransform()

# Print the metadata
print(f'Number of bands: {num_bands}')
print(f'Size: {cols} x {rows}')
print(f'Projection: {projection}')
print(f'Geotransform: {geotransform}')
'''
