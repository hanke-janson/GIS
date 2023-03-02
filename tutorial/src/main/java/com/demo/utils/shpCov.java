package com.demo.utils;

import java.io.File;
import java.io.Serializable;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.geotools.data.DataStore;
import org.geotools.data.DataStoreFinder;
import org.geotools.data.FeatureSource;
import org.geotools.data.FeatureWriter;
import org.geotools.data.FileDataStoreFactorySpi;
import org.geotools.data.Transaction;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.shapefile.ShapefileDataStoreFactory;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.FeatureIterator;
import org.geotools.feature.simple.SimpleFeatureTypeBuilder;
import org.geotools.referencing.crs.DefaultGeographicCRS;
import org.locationtech.jts.geom.*;
import org.locationtech.proj4j.*;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.filter.Filter;

public class shpCov {

    private static double[] albersChinaToWGS84(double x, double y) {
        double[] doubles = new double[2];
        CRSFactory crsFactory = new CRSFactory();
        CoordinateReferenceSystem albersChina = crsFactory.createFromParameters("Albers_China", "+proj=aea +a=6378245.0 +rf=298.3 +pm=0 +x_0=0.0 +y_0=0.0 +lon_0=105.0 +lat_1=25.0 +lat_2=47.0 +lat_0=0.0 +units=m +axis=enu +no_defs");
        CoordinateReferenceSystem WGS84 = crsFactory.createFromParameters("epsg:3857","+proj=longlat +datum=WGS84 +ellps=WGS84 +a=6378137.0 +rf=298.257223563 +pm=0 +nodef");
        CoordinateTransformFactory ctFactory = new CoordinateTransformFactory();
        CoordinateTransform albersChinaToWGS84 = ctFactory.createTransform(albersChina, WGS84);
        ProjCoordinate result = new ProjCoordinate();
        albersChinaToWGS84.transform(new ProjCoordinate(x, y), result);
        doubles[0] = result.x;
        doubles[1] = result.y;
        return doubles;
    }

    //转换线，多线和点shp文件(只是转换shp中的坐标，由WGS84坐标转换为火星坐标系)
    public static void tranferWGS84toMars(String srcshppath, String destshppath) throws Exception {

        File file = new File(srcshppath);
        Map<String, Object> map = new HashMap<>();
        map.put("url", file.toURI().toURL());

        DataStore srcdata = DataStoreFinder.getDataStore(map);
        ((ShapefileDataStore) srcdata).setCharset(Charset.forName("GBK"));//国内的计算机默认编码格式为GBK，所以如果不进行设置的话，就会出现乱码的现象
        String typeName = srcdata.getTypeNames()[0];

        FeatureSource<SimpleFeatureType, SimpleFeature> source = srcdata
                .getFeatureSource(typeName);
        Filter filter = Filter.INCLUDE; // ECQL.toFilter("BBOX(THE_GEOM, 10,20,30,40)")

        FeatureCollection<SimpleFeatureType, SimpleFeature> collection = source.getFeatures(filter);
        //创建目标shape文件对象
        Map<String, Serializable> params = new HashMap<String, Serializable>();
        FileDataStoreFactorySpi factory = new ShapefileDataStoreFactory();
        params.put(ShapefileDataStoreFactory.URLP.key, new File(destshppath).toURI().toURL());
        ShapefileDataStore ds = (ShapefileDataStore) factory.createNewDataStore(params);
        ((ShapefileDataStore) ds).setCharset(Charset.forName("GBK"));
        // 设置属性
        SimpleFeatureSource fs = srcdata.getFeatureSource(srcdata.getTypeNames()[0]);
        //下面这行还有其他写法，根据源shape文件的simpleFeatureType可以不用retype，而直接用fs.getSchema设置
        ds.createSchema(SimpleFeatureTypeBuilder.retype(fs.getSchema(), DefaultGeographicCRS.WGS84));

        //设置writer
        FeatureWriter<SimpleFeatureType, SimpleFeature> writer = ds.getFeatureWriter(ds.getTypeNames()[0], Transaction.AUTO_COMMIT);
        try (FeatureIterator<SimpleFeature> features = collection.features()) {
            while (features.hasNext()) {
                SimpleFeature feature = features.next();
                List<Object> list = feature.getAttributes();
                Object obj = list.get(0);
                if (obj instanceof LineString || obj instanceof MultiLineString) {
                    Geometry line = ((Geometry) obj);
                    int parts = line.getNumGeometries();
                    for (int i = 0; i < parts; i++) {
                        LineString l = (LineString) line.getGeometryN(i);
                        for (int j = 0, num = l.getNumPoints(); j < num; j++) {
                            Coordinate coor = l.getCoordinateN(j);
                            // 转换
                            double[] xy = albersChinaToWGS84(coor.x, coor.y);
                            Coordinate newcoor = new Coordinate(xy[1], xy[0]);
                            coor.setCoordinate(newcoor);
                        }
                    }
                } else if (obj instanceof Point) {
                    Point pt = (Point) obj;
                    Coordinate coor = pt.getCoordinate();
                    // 转换
                    double[] xy = albersChinaToWGS84(coor.x, coor.y);
                    coor.setCoordinate(new Coordinate(xy[1], xy[0]));
                } else if (obj instanceof Polygon) {
                    Geometry polygon = ((Geometry) obj);
                    int parts = polygon.getNumGeometries();
                    for (int i = 0; i < parts; i++) {
                        Polygon p = (Polygon) polygon.getGeometryN(i);
                        for (int j = 0, num = p.getNumPoints(); j < num; j++) {
                            Coordinate[] coordinates = p.getCoordinates();
                            for (Coordinate coordinate : coordinates) {
                                // 转换
                                double[] xy = albersChinaToWGS84(coordinate.x, coordinate.y);
                                Coordinate newcoor = new Coordinate(xy[1], xy[0]);
                                coordinate.setCoordinate(newcoor);
                            }
                        }
                    }
                }
                SimpleFeature fNew = writer.next();
                fNew.setAttributes(feature.getAttributes());
                writer.write();
            }
        }
        writer.close();
        ds.dispose();
        srcdata.dispose();
    }

    public static void main(String[] args) throws Exception {
        tranferWGS84toMars("C:\\Users\\admin\\Desktop\\vegetation\\vegetation.shp",
                "C:\\Users\\admin\\Desktop\\vegetation\\vegetation_wgs84\\vegetation.shp");
    }
}
