package com.gdal.utils;

import org.apache.tomcat.util.buf.HexUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class FileCheckUtil {
    /**
     * 提取文件 checksum
     *
     * @param path      文件全路径
     * @param algorithm  算法名 例如 MD5、SHA-1、SHA-256等
     * @return  checksum
     * @throws NoSuchAlgorithmException the no such algorithm exception
     * @throws IOException              the io exception
     */
    public static String extractChecksum(String path, String algorithm) throws NoSuchAlgorithmException, IOException {
        // 根据算法名称初始化摘要算法
        MessageDigest digest = MessageDigest.getInstance(algorithm);
        // 读取文件的所有比特
        byte[] fileBytes = Files.readAllBytes(Paths.get(path));
        // 摘要更新
        digest.update(fileBytes);
        //完成哈希摘要计算并返回特征值
        byte[] digested = digest.digest();
        // 进行十六进制的输出
        return HexUtils.toHexString(digested);
    }
}
