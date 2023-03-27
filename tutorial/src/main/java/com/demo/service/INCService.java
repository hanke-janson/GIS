package com.demo.service;

import com.demo.entity.Concentration;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;

public interface INCService {
    ArrayList<Concentration> readConcentrationNC(String ncPath);

    LinkedList<LinkedHashMap<String, Double>> readKuiBaNC(String ncPath);
}
