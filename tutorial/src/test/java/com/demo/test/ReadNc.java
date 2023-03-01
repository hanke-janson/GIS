package com.demo.test;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import lombok.extern.slf4j.Slf4j;
import ucar.nc2.NetcdfFile;
import ucar.nc2.Variable;

import java.util.List;

@Slf4j
public class ReadNc {
    public static void main(String[] args) throws Exception {
        String filename = "D:\\idea_program\\tutorial\\src\\main\\resources\\ConcentrationEntity.nc";
        NetcdfFile ncFile = NetcdfFile.open(filename);
        //读取变量
        List<Variable> variables = ncFile.getVariables();
        Variable concentration = ncFile.findVariable("ConcentrationEntity");
        Variable lon = ncFile.findVariable("lon");
        Variable lat = ncFile.findVariable("lat");
        Variable time = ncFile.findVariable("time");
        // 时间、纬度、经度
        double[][][] concentrationData = (double[][][]) concentration.read().copyToNDJavaArray();//转成数组
        double[] concentrationLat = (double[]) lat.read().copyTo1DJavaArray();
        double[] concentrationLon = (double[]) lon.read().copyTo1DJavaArray();
        double[] concentrationTime = (double[]) time.read().copyTo1DJavaArray();
        JSONObject concentrationObj = new JSONObject();
        JSONArray concentrationJson = new JSONArray();
        // 第一层 时间 30
        for (int i = 0; i < concentrationData.length; i++) {
            // 第二层 纬度 96
            for (int j = 0; j < concentrationData[i].length; j++) {
                // 第三层 经度 96
                for (int k = 0; k < concentrationData[i][j].length; k++) {
//                    log.info("time:{}", concentrationTime[i]);
//                    log.info("lon:{}", concentrationLon[k]);
//                    log.info("lat:{}", concentrationLat[j]);
//                    log.info("concentration:{}", concentrationData[i][j][k]);
                    if (Double.isNaN(concentrationData[i][k][j])) {
                        concentrationData[i][k][j] = -1;
                    }
                    concentrationObj.put("time", concentrationTime[i])
                            .put("lon", concentrationLon[k])
                            .put("lat", concentrationLat[j])
                            .put("concentration", concentrationData[i][k][j]);
                    concentrationJson.add(concentrationObj);
                }
            }
        }
        log.info("{}", concentrationJson);
    }

}

