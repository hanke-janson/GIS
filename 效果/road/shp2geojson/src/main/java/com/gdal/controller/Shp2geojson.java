package com.gdal.controller;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/gdal")
public class Shp2geojson {

    /**
     * shp文件转geojson文件接口
     * 注shp相关文件需一同上传
     */
    @PostMapping("/shp2geojson")
    public void shp2GeoJson(MultipartFile[] files) throws Exception {
        // 上传文件到服务器
        upload(files);
        log.info("上传文件成功！");

    }

    /**
     * 上传文件，返回服务器上shp文件地址
     */
    public void upload(MultipartFile[] files) throws Exception {
        BufferedInputStream in;
        BufferedOutputStream out;
        String volPath = "/root/updown/";
        String fileName = "";
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
            log.info(volPath+fileName);
            in.close();
            out.close();
        }
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
