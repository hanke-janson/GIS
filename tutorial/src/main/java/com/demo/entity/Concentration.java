package com.demo.entity;

import lombok.Data;

import java.util.HashMap;
import java.util.List;

@Data
public class Concentration {
    private double time;
    private List<HashMap<String, Double>> value;
}
