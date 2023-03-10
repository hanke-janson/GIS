# -*- coding: utf-8 -*-
"""
nc/nc4数据 -> tiff
"""
import numpy as np
import netCDF4 as nc
from osgeo import gdal, osr, ogr
import os
import pycrs

# 重装pyproj解决 坐标查询报错的问题 conda install pyproj
os.environ['PROJ_LIB'] = r'C:\Users\admin\.conda\envs\nc2tiff\Library\share\proj'
os.environ['GDAL_DATA'] = r'D:\Dev\PostgreSQL\14\gdal-data'

'''必须没有中文'''
Input_data = r''

if Input_data == '':
    Input_data = input('请输入nc数据的路径——————————————：')

Out_dir = r''

if Out_dir == '':
    Out_dir = input('请输入存放nc或nc4数据转tif的结果文件夹——————————————：')


def nc_to_tiffs(data, out_dir):
    nc_data_obj = nc.Dataset(data)
    # 获取时间，经度，纬度，波段的名称信息，这些可能是不一样的
    key = list(nc_data_obj.variables.keys())
    print(f'{data} 的所有波段信息为————————：{key}')
    # 模糊查找属于经度的名称
    lon_loc = [i for i, x in enumerate(key) if (x.find('lon'.upper()) != -1 or x.find('lon'.lower()) != -1)][0]
    # 模糊查找属于纬度的名称
    lat_loc = [i for i, x in enumerate(key) if (x.find('lat'.upper()) != -1 or x.find('lat'.lower()) != -1)][0]
    band_start = eval(input(f"请在指定范围内 1~{len(key)} 输入您想要输出的多个波段的开始序号(int): "))
    band_end = eval(input(f"请在指定范围内 1~{len(key)} 输入您想要输出的多个波段的结束序号(int)(如果你只有一个波段想要输出的话结束序号就与开始序号相同): "))
    if band_end > len(key):
        print('结束序号不在指定范围内')
        return 0
    for band_var in key[band_start - 1:band_end]:
        # 获取经度的名称
        key_lon = key[lon_loc]
        # 获取纬度的名称
        key_lat = key[lat_loc]
        # 获取每个像元的经度
        lon = nc_data_obj.variables[key_lon][:]
        # 获取每个像元的纬度
        lat = nc_data_obj.variables[key_lat][:]
        # 获取对应波段的像元的值，类型为数组
        band = np.asarray(nc_data_obj.variables[band_var]).astype(np.float64)
        print("请查看你的填充值：", nc_data_obj.variables[band_var])
        fill_data = input("请输入您刚刚查看的填充值('FillValue'或者为'missing_value')如果没有的话就输入:'None'：——————————")
        # 影像的四个角的坐标
        lon_min, lat_max, lon_max, lat_min = [lon.min(), lat.max(), lon.max(), lat.min()]
        # 分辨率计算
        n_lat = len(lat)
        if lon.ndim == 1:
            # 如果Lon为一维的话，就取长度
            n_lon = len(lon)
        else:
            # 如果Lon为二维的话，就取宽度
            n_lon = len(lon[0])
        lon_res = (lon_max - lon_min) / (float(n_lon) - 1)
        lat_res = (lat_max - lat_min) / (float(n_lat) - 1)

        ndim = band.ndim

        if ndim == 4:
            print(f'正在处理的数据为：{data}')
            print(f'正在处理的波段为：{band_var}')
            print(f'{band_var}波段维度为：4')
            print(f'该四维数据中在第一维度上的长度为：{band.shape[0]}')
            print(f'该四维数据中在第二维度上的长度为：{band.shape[1]}')
            print(f'该四维数据中在第三维度上的长度为：{band.shape[2]}')
            print(f'该四维数据中在第四维度上的长度为：{band.shape[3]}')
            # 下面四个变量用于命名 遍历
            ndim_4_1_start = eval(input("请输入您在第一维度上开始时间，如果是xxxx年的话就输入xxxx比如2000：——————————"))
            step_4_1 = eval(input("请输入您在第一维度上时间的步长，如果是每隔x年的话就输入x比如5：——————————"))
            ndim_4_2_start = eval(input("请输入您在第二维度上开始时间，如果是x月的话就输入x比如1：——————————"))
            step_4_2 = eval(input("请输入您在第二维度上时间的步长，如果是每隔x月的话就输入x比如6：——————————"))
            for i in range(band.shape[0]):
                for j in range(band.shape[1]):
                    # 创建驱动
                    driver = gdal.GetDriverByName('GTiff')
                    # 获取不同时间段的数据
                    arr1 = band[i, j, :, :]
                    out_tif_name = out_dir + os.sep + '_' + band_var + '_' + str(ndim_4_1_start) + '_' + str(
                        ndim_4_2_start) + '.tif'
                    out_tif = driver.Create(out_tif_name, n_lon, n_lat, 1, gdal.GDT_Float64)
                    # 设置影像的显示范围
                    # -Lat_Res一定要是-的
                    geo_transform = (lon_min, lon_res, 0, lat_max, 0, -lat_res)
                    out_tif.SetGeoTransform(geo_transform)
                    srs = osr.SpatialReference()
                    srs.ImportFromEPSG(4326)
                    out_tif.SetProjection(srs.ExportToWkt())
                    # 如果维度上的第一个值小于等于最后的一个值就认为是倒序，就得进行数组的倒序排列，否则就是正向，不用倒序排列
                    if lat[0] <= lat[-1]:
                        print(f'{data}行数据是倒的，现在进行矫正............')
                        arr1 = arr1[::-1]
                        print('矫正完成...........')
                    else:
                        pass
                    # 写入数据
                    out_tif.GetRasterBand(1).WriteArray(arr1)
                    if fill_data == 'None':
                        pass
                    else:
                        # 设置输出数据的无效值
                        out_tif.GetRasterBand(1).SetNoDataValue(eval(fill_data))
                    # 将数据写入硬盘
                    out_tif.FlushCache()
                    print(f'{out_tif_name} is ok!!!!')
                    # 注意必须关闭tif文件
                    del out_tif
                    ndim_4_2_start += step_4_2
                ndim_4_1_start += step_4_1
        if ndim == 3:
            print(f'正在处理的数据为：{data}')
            print(f'正在处理的波段为：{band_var}')
            print(f'{band_var}波段维度为：3')
            print(f'该三维数据中在第一维度上的长度为：{band.shape[0]}')
            print(f'该三维数据中在第二维度上的长度为：{band.shape[1]}')
            print(f'该三维数据中在第三维度上的长度为：{band.shape[2]}')
            ndim_3_1_start = eval(input("请输入您在第一维度上开始时间，如果是xxxx年的话就输入xxxx比如2000,如果是x月的话就输入x比如1：——————————"))
            step_3_1 = eval(input("请输入您在第一维度上时间的步长，如果是每隔x年的话就输入x比如5：——————————"))
            for i in range(band.shape[0]):
                # 创建驱动
                driver = gdal.GetDriverByName('GTiff')
                # 获取不同时间段的数据
                arr1 = band[i, :, :]
                out_tif_name = out_dir + os.sep + band_var + '_' + str(
                    ndim_3_1_start) + '.tif'
                out_tif = driver.Create(out_tif_name, n_lon, n_lat, 1, gdal.GDT_Float64)
                # 设置影像的显示范围
                # -Lat_Res一定要是-的
                geo_transform = (lon_min, lon_res, 0, lat_max, 0, -lat_res)
                out_tif.SetGeoTransform(geo_transform)
                srs = osr.SpatialReference()
                srs.ImportFromEPSG(4326)
                out_tif.SetProjection(srs.ExportToWkt())
                # 如果维度上的第一个值小于等于最后的的一个值就认为是倒序，就得进行数组的倒序排列，否则就是正向，不用倒序排列
                if lat[0] <= lat[-1]:
                    print(f'{data}行数据是倒的，现在进行矫正............')
                    arr1 = arr1[::-1]
                    print('矫正完成...........')
                else:
                    pass
                out_tif.GetRasterBand(1).WriteArray(arr1)  # 写入数据
                if fill_data == 'None':
                    pass
                else:
                    # 设置输出数据的无效值
                    out_tif.GetRasterBand(1).SetNoDataValue(eval(fill_data))
                    # 将数据写入硬盘
                out_tif.FlushCache()
                print(f'{out_tif_name} is ok!!!!')
                # 注意必须关闭tif文件
                del out_tif
                ndim_3_1_start += step_3_1

        if ndim == 2:
            print(f'正在处理的数据为：{data}')
            print(f'正在处理的波段为：{band_var}')
            print(f'{band_var}波段维度为：2')
            print(f'该二维数据中在第一维度上的长度为：{band.shape[0]}')
            print(f'该二维数据中在第二维度上的长度为：{band.shape[1]}')
            # 创建驱动
            driver = gdal.GetDriverByName('GTiff')
            # 获取不同时间段的数据
            arr1 = band[:, :]
            out_tif_name = out_dir + os.sep + data.split('\\')[-1][:-4] + '_' + band_var + '.tif'
            out_tif = driver.Create(out_tif_name, n_lon, n_lat, 1, gdal.GDT_Float64)
            # 设置影像的显示范围
            # -Lat_Res一定要是-的
            geo_transform = (lon_min, lon_res, 0, lat_max, 0, -lat_res)
            out_tif.SetGeoTransform(geo_transform)
            srs = osr.SpatialReference()
            srs.ImportFromEPSG(4326)
            out_tif.SetProjection(srs.ExportToWkt())
            # 如果维度上的第一个值小于等于最后的的一个值就认为是倒序，就得进行数组的倒序排列，否则就是正向，不用倒序排列
            if lat[0] <= lat[-1]:
                print(f'{data}行数据是倒的，现在进行矫正............')
                arr1 = arr1[::-1]
                print('矫正完成...........')
            else:
                pass
            # 写入数据
            out_tif.GetRasterBand(1).WriteArray(arr1)
            if fill_data == 'None':
                pass
            else:
                # 设置输出数据的无效值
                out_tif.GetRasterBand(1).SetNoDataValue(eval(fill_data))
                # 将数据写入硬盘
            out_tif.FlushCache()
            print(f'{out_tif_name} is ok!!!!')
            # 注意必须关闭tif文件
            del out_tif
    print('ALL IS ok   !!!!!')


# nc_to_tiffs(Input_data, Out_dir)


def esri_wkt_to_proj(esri_wkt):
    # wkt text可以直接从ArcGIS导出
    print(pycrs.parse.from_esri_wkt(esri_wkt).to_proj4())


esri_wkt = 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]'
esri_wkt_to_proj(esri_wkt)
