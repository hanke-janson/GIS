package com.demo.utils.geoserver;

import com.demo.config.GeoserverProperties;
import it.geosolutions.geoserver.rest.GeoServerRESTManager;
import it.geosolutions.geoserver.rest.GeoServerRESTPublisher;
import it.geosolutions.geoserver.rest.GeoServerRESTReader;
import it.geosolutions.geoserver.rest.encoder.GSResourceEncoder;
import it.geosolutions.geoserver.rest.encoder.datastore.GSGeoTIFFDatastoreEncoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Objects;

@Slf4j
@Service
public class GeoserverImpl implements IGeoserver {
    public GeoServerRESTManager manager;

    public GeoServerRESTReader reader;

    public GeoServerRESTPublisher publisher;

    public GeoserverImpl(GeoserverProperties properties) {
        try {
            manager = new GeoServerRESTManager(new URL(properties.getUrl()), properties.getUsername(), properties.getPassword());
            reader = manager.getReader();
            publisher = manager.getPublisher();
            log.info("GeoServer-Manager Build Success");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    /**
     * 发布tiff文件
     */
    @Override
    public ArrayList<String> releaseTiff(String workspace, String fileUrl, String styleUrl) throws Exception {
        ArrayList<String> layers = new ArrayList<>();
        // 创建工作区;
        if (isWorkSpace(workspace)) {
            File file = new File(fileUrl);
            // 判断File对象对应的目录是否存在
            if (file.isDirectory()) {
                // 获得目录下的所有文件的文件名
                String[] names = file.list();
                for (String fileName : Objects.requireNonNull(names)) {
                    if (isDatabase(workspace, fileName)) {
                        // 数据存储创建成功, 图层发布
                        if (publisher.publishGeoTIFF(workspace, fileName, new File(fileUrl + "/" + fileName))) {
                            String layer = "http://localhost:8080/geoserver/" + workspace + "/wms " + workspace + ":" + fileName;
                            layers.add(layer);
                        } else {
                            layers.add("图层发布失败：" + workspace + ":" + fileName);
                        }
                    } else {
                        // 数据存储已存在
                        layers.add("数据存储失败，请检查是否文件已上传过: " + workspace + "下存在" + fileName);
                    }
                }
            } else {
                layers.add("文件夹为空，请先进行nc转tiff的操作");
            }
        } else {
            layers.add("工作区创建失败");
        }
        return layers;
    }


    /**
     * 工作区是否存在 不存在则创建
     */
    private Boolean isWorkSpace(String workspace) {
        if (!reader.existsWorkspace(workspace)) {
            // 工作区不存在 创建工作区
            log.info("工作区不存在，正在创建工作区... {}", workspace);
            if (publisher.createWorkspace(workspace)) {
                log.info("创建工作区成功，{}", workspace);
                return true;
            } else {
                log.info("创建工作区失败，{}", workspace);
                return false;
            }
        }
        log.info("工作区存在：{}", workspace);
        return true;
    }

    /**
     * 数据存储是否存在 不存在则创建
     */
    private Boolean isDatabase(String workspace, String fileName) {
        // 拿文件名作为数据存储名
        if (!reader.existsCoveragestore(workspace, fileName)) {
            // 数据存储不存在  创建数据存储
            log.info("数据存储不存在, 正在创建数据存储...  {}", fileName);
            // 创建数据存储
            GSGeoTIFFDatastoreEncoder gsGeoTIFFDatastoreEncoder = new GSGeoTIFFDatastoreEncoder(fileName);
            gsGeoTIFFDatastoreEncoder.setWorkspaceName(workspace);
            return manager.getStoreManager().create(workspace, gsGeoTIFFDatastoreEncoder);
        } else {
            log.info("该工作区下的数据存储已存在：{}下的{}", workspace, fileName);
            return false;
        }
    }

    /**
     * 样式是否存在 不存在则创建发布
     */
    private String isStyle(String workspace, String styleFilePath) {
        String[] split = styleFilePath.split("/");
        String styleFileName = split[split.length - 1];
        if (!reader.existsStyle(workspace, styleFileName)) {
            // 样式文件不存在 发布样式
            File styleFile = new File(styleFilePath);
            log.info("样式文件不存在, 正在发布样式文件...  {}", styleFileName);
            if (publisher.publishStyleInWorkspace(workspace, styleFile, styleFileName)) {
                return styleFileName;
            } else {
                return null;
            }
        } else {
            log.info("该工作区下的样式文件已存在：{}下的{}", workspace, styleFileName);
            return styleFileName;
        }
    }

    /**
     * 创建样式
     */
    private Boolean createStyle() {

        return null;
    }

}
