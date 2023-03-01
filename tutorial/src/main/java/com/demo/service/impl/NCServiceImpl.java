package com.demo.service.impl;

import com.demo.entity.Concentration;
import com.demo.service.INCService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ucar.nc2.NetcdfFile;
import ucar.nc2.Variable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
public class NCServiceImpl implements INCService {
    @Override
    public ArrayList<Concentration> readNC(String ncPath) {
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
