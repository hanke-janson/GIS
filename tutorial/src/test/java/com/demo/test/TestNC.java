package com.demo.test;

import com.demo.GeotoolsApplication;
import com.demo.service.INCService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.util.Objects;

@RunWith(SpringRunner.class)
@Slf4j
@SpringBootTest(classes = GeotoolsApplication.class)
public class TestNC {
    @Autowired
    private INCService ncService;

    @Test
    public void readNCTest() {
        String filename = "D:\\idea_program\\tutorial\\src\\test\\resources\\Concentration.nc";
        ncService.readConcentrationNC(filename);
    }

    @Test
    public void readKuiBaNCTest() {
        String filename = "C:/Users/admin/Desktop/溃坝输出案例数据/nc/h/h30.nc";
        ncService.readKuiBaNC(filename);
    }

    /**
     * 遍历文件夹下文件
     */
    @Test
    public void tiffListTest() {
        String files = "C:\\Users\\admin\\Desktop\\data\\nc_tiff_data";
        // 创建File对象
        File file = new File(files);
        // 判断File对象对应的目录是否存在
        if (file.isDirectory()) {
            // 获得目录下的所有文件的文件名
            String[] names = file.list();
            for (String fileName : Objects.requireNonNull(names)) {
                //输出文件名
                System.out.println(fileName);
            }
        }
    }


}
