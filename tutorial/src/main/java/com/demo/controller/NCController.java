package com.demo.controller;

import com.demo.entity.Concentration;
import com.demo.service.INCService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@Slf4j
@RestController
public class NCController {

    @Autowired
    private INCService ncService;

    @GetMapping("/getNCData")
    public ArrayList<Concentration> getNCData() {
        String filename = "D:\\idea_program\\tutorial\\src\\test\\resources\\Concentration.nc";
        return ncService.readNC(filename);
    }

}
