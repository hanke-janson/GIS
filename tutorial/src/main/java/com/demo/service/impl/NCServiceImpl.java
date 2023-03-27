package com.demo.service.impl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import com.demo.entity.Concentration;
import com.demo.service.INCService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ucar.nc2.NetcdfFile;
import ucar.nc2.Variable;

import java.util.*;

@Slf4j
@Service
public class NCServiceImpl implements INCService {
    @Override
    public LinkedList<LinkedHashMap<String, Double>> readKuiBaNC(String ncPath) {
        List<String> split = StrUtil.split(ncPath, "/");
        // 因为切过的nc文件中表示滑坡数值波段的名称为文件名
        String fileName = StrUtil.split(split.get(split.size() - 1), ".").get(0);
        try {
            NetcdfFile ncFile = NetcdfFile.open(ncPath);
            //读取变量
            Variable value = ncFile.findVariable(fileName);
            Variable lon = ncFile.findVariable("lon");
            Variable lat = ncFile.findVariable("lat");
            // 经度、纬度、值
            double[] kuiBaLon = (double[]) lon.read().copyTo1DJavaArray();
            double[] kuiBaLat = (double[]) lat.read().copyTo1DJavaArray();
            double[][] kuiBaData = (double[][]) value.read().copyToNDJavaArray();//转成数组

            LinkedList<LinkedHashMap<String, Double>> list = new LinkedList<>();
            // 第一层 经度 lon 202
            for (int i = 0; i < kuiBaData.length; i++) {
                // 第二层 纬度 lat 203
                for (int j = 0; j < kuiBaData[i].length; j++) {
                    LinkedHashMap<String, Double> map = new LinkedHashMap<>();
                    if (Double.isNaN(kuiBaData[i][j])) {
                        String invalidValue = "NaN";
                        log.info("lon:{},lat:{},无效值:{}", kuiBaLon[i], kuiBaLat[j], invalidValue);
//                        kuiBaData[i][j] = -1;
                        continue;
                    }
                    map.put("lon", kuiBaLon[i]);
                    map.put("lat", kuiBaLat[j]);
                    map.put("value", kuiBaData[i][j]);
                    log.info("lon: {},lat: {},value: {}", kuiBaLon[i], kuiBaLat[j], kuiBaData[i][j]);
                    list.add(map);
                }
            }
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ArrayList<Concentration> readConcentrationNC(String ncPath) {
        try {
            NetcdfFile ncFile = NetcdfFile.open(ncPath);
            //读取变量
            Variable concentration = ncFile.findVariable("Concentration");
            Variable lon = ncFile.findVariable("lon");
            Variable lat = ncFile.findVariable("lat");
            Variable time = ncFile.findVariable("time");
            // 时间、纬度、经度
            double[] concentrationTime = (double[]) time.read().copyTo1DJavaArray();
            double[] concentrationLat = (double[]) lat.read().copyTo1DJavaArray();
            double[] concentrationLon = (double[]) lon.read().copyTo1DJavaArray();
            double[][][] concentrationData = (double[][][]) concentration.read().copyToNDJavaArray();//转成数组

            ArrayList<Concentration> concentrations = new ArrayList<>();
            // 第一层 时间 30
            for (int i = 0; i < concentrationData.length; i++) {
                Concentration concentrationEntity = new Concentration();
                concentrationEntity.setTime(concentrationTime[i]);
                log.info("time:{}", concentrationTime[i]);
                ArrayList<HashMap<String, Double>> value = new ArrayList<>();
                // 第二层 纬度 96
                for (int j = 0; j < concentrationData[i].length; j++) {
                    HashMap<String, Double> map = new HashMap<>();
                    map.put("lat", concentrationLat[j]);
                    log.info("lat:{}", concentrationLat[j]);
                    // 第三层 经度 96
                    for (int k = 0; k < concentrationData[i][j].length; k++) {
                        map.put("lon", concentrationLon[k]);
                        log.info("lon:{}", concentrationLon[k]);
                        if (Double.isNaN(concentrationData[i][k][j])) {
                            concentrationData[i][k][j] = -1;
                        }
                        map.put("concentration", concentrationData[i][j][k]);
                        log.info("concentration:{}", concentrationData[i][j][k]);
                        value.add(map);
                    }
                    concentrationEntity.setValue(value);
                }
                concentrations.add(concentrationEntity);
            }
            return concentrations;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
