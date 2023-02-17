package com.demo.controller;

import com.demo.service.IProjService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class ProjController {
    @Autowired
    private IProjService projService;

    @GetMapping("/CRSFromName")
    public String CRSFromName() {
        return projService.CRSFromName();
    }
    @GetMapping("/CRSFromVal")
    public String CRSFromVal() {
        return projService.CRSFromVal();
    }
    @GetMapping("/CRSToCRS")
    public String CRSToCRS() {
        return projService.CRSToCRS();
    }
}
