package com.demo.service;

import com.demo.entity.Concentration;

import java.util.ArrayList;

public interface INCService {
    ArrayList<Concentration> readNC(String ncPath);
}
