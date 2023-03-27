package com.demo.controller;

import cn.hutool.core.io.FileUtil;
import com.demo.entity.Concentration;
import com.demo.service.INCService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;

@Slf4j
@RestController
public class NCController {

    @Autowired
    private INCService ncService;

    @GetMapping("/getNCData")
    public ArrayList<Concentration> getNCData() {
        String filename = "C:\\Users\\admin\\Desktop\\滑坡模块输出结果形式\\10.nc";
//        String filename = "C:\\Users\\admin\\Desktop\\GIS\\tutorial\\src\\main\\resources\\Concentration.nc";
        return ncService.readConcentrationNC(filename);
    }

    @GetMapping("getKuiBaNc")
    public LinkedList<LinkedHashMap<String, Double>> getKuiBaNc(String fileName){
        ncService.readKuiBaNC(fileName);
        return ncService.readKuiBaNC(fileName);
    }

}
