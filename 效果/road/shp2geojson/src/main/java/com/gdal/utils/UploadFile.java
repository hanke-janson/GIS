package com.gdal.controller.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.Objects;

@Slf4j
public class UploadFile {
    /**
     * 上传文件， 注shp相关文件需一同上传,返回服务器上shp文件地址
     */
    public String upload(MultipartFile[] files) throws Exception {
        BufferedInputStream in;
        BufferedOutputStream out;
        String volPath = "/root/updown/";
        String fileName = "";
        ArrayList<String> paths = new ArrayList<>();
        for (MultipartFile multipartFile : files) {
            InputStream is = multipartFile.getInputStream();
            // 获取文件名
            fileName = multipartFile.getOriginalFilename();

            in = new BufferedInputStream(is);
            out = new BufferedOutputStream(new FileOutputStream(volPath + fileName));
            int len = -1;
            byte[] b = new byte[1024];
            while ((len = in.read(b)) != -1) {
                out.write(b, 0, len);
            }
            if (Objects.requireNonNull(fileName).contains(".shp")) {
                paths.add(volPath + fileName);
            }
            in.close();
            out.close();
        }
        return paths.get(0);
    }

    /**
     * MultipartFile 转 File
     *
     * @param file
     * @throws Exception
     */
    public static File multipartFileToFile(MultipartFile file) throws Exception {

        File toFile = null;
        InputStream ins = null;
        if (file.equals("") || file.getSize() <= 0) {
            file = null;
        } else {
            ins = file.getInputStream();
            toFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
            inputStreamToFile(ins, toFile);
            ins.close();
        }
        return toFile;
    }

    //获取流文件
    private static void inputStreamToFile(InputStream ins, File file) {
        try {
            OutputStream os = new FileOutputStream(file);
            int bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            os.close();
            ins.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 删除本地临时文件
     *
     * @param file
     */
    public static void delTempFile(File file) {
        if (file != null) {
            File del = new File(file.toURI());
            del.delete();
        }
    }
}
