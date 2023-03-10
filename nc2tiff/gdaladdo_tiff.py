"""
tiff内建金字塔
"""
from osgeo import gdal
from osgeo.gdalconst import *

# 注册geotiff驱动
gdal.AllRegister()
# Open the raster file 读写方式影像tiff建立金字塔的方式 gdal.GA_ReadOnly建立外建金字塔 gdal.GA_Update建立内建金字塔
dataset = gdal.Open('D:/tiff-test/XX12-1_CCD_000304934_MMB07_001_01_002_003_L2.tiff', gdal.GA_Update)
# options = {'GDAL_NUM_THREADS': 'ALL_CPUS',
#            'GDAL_TIFF_OVR_BLOCKSIZE': 256,
#            'BIGTIFF_OVERVIEW': 'IF_SAFER'}

gdal.SetConfigOption('GDAL_NUM_THREADS', 'ALL_CPUS')


def progress_callback(complete, message):
    print("Progress: %d%%, Message: %s" % (complete * 100, message))


# 内建金字塔
try:
    dataset.BuildOverviews("AVERAGE", overviewlist=[2, 4, 8, 16, 32, 64, 128])
except:
    print("error")

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
