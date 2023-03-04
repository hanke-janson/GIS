package com.demo.controller;

import com.demo.utils.geoserver.IGeoserver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@Slf4j
public class GeoserverController {
    @Autowired
    private IGeoserver geoserver;

    @GetMapping("/releaseTiff")
    public ArrayList<String> releaseTiff(@RequestParam String workspace,
                                         @RequestParam String filePath) {
        try {
            return geoserver.releaseTiff(workspace, filePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
