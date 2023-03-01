package com.demo.test;

import org.geotools.data.FeatureWriter;
import org.geotools.data.Transaction;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.feature.collection.ClippedFeatureCollection;
import org.geotools.feature.collection.ClippedFeatureIterator;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Polygon;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.geometry.Geometry;

import java.io.File;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class Demo {
    public static void main(String[] args) {
        File file = new File("D:\\output\\output\\NEW_TB_struct_shake_.shp");
        SimpleFeatureCollection featureCollection = null;
        try {
            // 读取源文件shape
            ShapefileDataStore dataStore = new ShapefileDataStore(file.toURI().toURL());
            dataStore.setCharset(StandardCharsets.UTF_8);
            System.out.println(dataStore.getCharset() + "获取编码11111111111111111");
            SimpleFeatureSource featureSource = dataStore.getFeatureSource();
            featureCollection = featureSource.getFeatures();

            // 自定义的裁剪范围
            GeometryFactory geometryFactory = new GeometryFactory();
            Coordinate[] coordinates = {
                    new Coordinate(119.8535158272736, 36.0208825916344),
                    new Coordinate(119.909758272736, 36.091077415795),
                    new Coordinate(119.97536774812598, 36.1120377415795),
                    new Coordinate(120.03026774812598, 36.0559377415795),
                    new Coordinate(120.01796774812598, 36.023648259164),
                    new Coordinate(119.8535158272736, 36.0208825916344),
            };
            Polygon polygon = geometryFactory.createPolygon(coordinates);
            polygon.setSRID(4326);
            // 调用 geotools 的裁剪要素方法
            ClippedFeatureCollection collection = new ClippedFeatureCollection(featureCollection, polygon, true);
            ClippedFeatureIterator iterator = (ClippedFeatureIterator) collection.features();
            //根据图层名称来获取要素的source
            SimpleFeatureSource fs = dataStore.getFeatureSource(dataStore.getTypeNames()[0]);
            //根据参数创建shape存储空间
//            Map<String, Serializable> params = new HashMap<String, Serializable>();
            String strPath = "D:\\output\\output\\output\\NEW_TB_struct_shake_.shp";
            File s1 = new File(strPath);
            File fileParent = s1.getParentFile();
            if (!fileParent.exists()) {
                fileParent.mkdirs();
            }
            file.createNewFile();

            ShapefileDataStore ds = new ShapefileDataStore(s1.toURI().toURL());
//            ds.setCharset(StandardCharsets.UTF_8);
            ds.setCharset(Charset.forName("GBK"));
            System.out.println(ds.getCharset() + "获取编码22222222");

            SimpleFeatureType sft = fs.getSchema();
            //创建
            ds.createSchema(sft);

            //设置Writer，并设置为自动提交
            FeatureWriter<SimpleFeatureType, SimpleFeature> writer = ds.getFeatureWriter(ds.getTypeNames()[0], Transaction.AUTO_COMMIT);

            //循环写入要素
            while (iterator.hasNext()) {
                //获取要写入的要素
                SimpleFeature feature = iterator.next();
                //将要写入位置
                SimpleFeature featureBuf = writer.next();
                //设置写入要素所有属性
                featureBuf.setAttributes(feature.getAttributes());
                //获取the_geom属性的值
                Geometry geo = (Geometry) feature.getAttribute("the_geom");
               //重新覆盖the_geom属性的值，这里的geoBuffer必须为Geometry类型
                featureBuf.setAttribute("the_geom", geo);
            }
            //将所有数据写入
            writer.write();
            //关闭写入流
            writer.close();
            iterator.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
