package com.gdal.demo.test;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileWriter;
import cn.hutool.extra.ssh.JschUtil;
import cn.hutool.extra.ssh.Sftp;
import com.jcraft.jsch.Session;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;

import java.io.File;
import java.util.Date;

@Slf4j
public class JschTest {
    @Test
    public void uploadFile() {
        //测试目录
        String linuxPath = "/root/tmp/docker/gdal/";
        //创建session连接
        Session sessionLinux = JschUtil.getSession("192.168.23.128", 22, "root", "root");
        // 1.文件操作
        // 建立sftp
        Sftp sftp = JschUtil.createSftp(sessionLinux);
        //进入输入目录
        sftp.cd(linuxPath);
        //文件名称
        String fileName = "Sftp创建文件夹于" + DateUtil.format(new Date(), "yyyy年MM月dd日HH时mm分ss秒");
        //1.创建文件夹
        sftp.mkdir(fileName);
        log.info("=========================1.远程文件操作=========================");
        log.info(fileName + ",文件是否存在?" + sftp.exist(linuxPath + fileName));
        //删除文件
        sftp.delDir(linuxPath + fileName);
        log.info(fileName + ",文件是否存在?" + sftp.exist(linuxPath + fileName));
        //2.上传文件
        // 本地新建文件
        log.info("=========================2.上传文件操作=========================");
        String localFile = DateUtil.format(new Date(), "yyyy年MM月dd日HH时mm分ss秒") + ".txt";
        log.info(localFile);
        FileWriter fileWriter = new FileWriter(localFile);
        // 写入内容
        File file = fileWriter.write("123");
        fileWriter.append("追加信息");
        log.info(file.getPath());
        sftp.upload(linuxPath, file);
        //upload方法
        log.info("1.upload方法");
        log.info(localFile + ",文件是否存在?" + sftp.exist(linuxPath + localFile));
        sftp.delFile(linuxPath + localFile);
        log.info(localFile + ",文件是否存在?" + sftp.exist(linuxPath + fileName));
        sftp.put(file.getPath(), linuxPath);
        //put方法
        log.info("2.put方法");
        log.info(localFile + ",文件是否存在?" + sftp.exist(linuxPath + localFile));
        sftp.delFile(linuxPath + localFile);
        log.info(localFile + ",文件是否存在?" + sftp.exist(linuxPath + fileName));
        //删除本地文件
        FileUtil.del(file);
    }
}
