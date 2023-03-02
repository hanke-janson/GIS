参考](https://blog.csdn.net/guo45682/article/details/117792157?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EOPENSEARCH%7ERate-1-117792157-blog-83129677.pc_relevant_multi_platform_whitelistv4&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EOPENSEARCH%7ERate-1-117792157-blog-83129677.pc_relevant_multi_platform_whitelistv4&utm_relevant_index=1)

https://blog.csdn.net/weixin_43311389/article/details/99979275

http://localhost:8080/geoserver

账号密码默认为 admin /geoserver

GeoServer 作为一个地图发布服务器，主要用于发布各种类型的服务数据，方便用户多样化的使用场景。GeoServer 是参考开放地理空间联盟（OGC）的 Web Feature Service（WFS）、Web Coverage Service（WCS）、Web Map Service（WMS）等标准来实现的。

# 发布 postgis 中的矢量数据

进入 GeoServer 的管理页面，创建一个工作区

进入数据存储，添加一个 postgis 数据源

填写连接参数等信息 -> 保存

新建图层 点击发布
边框从数据中计算，经纬度 Compute from native bounds -> 保存

图层预览即可

# 矢量切片（动态切片）

https://blog.csdn.net/qq_35732147/article/details/89354557?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-89354557-blog-110925131.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-89354557-blog-110925131.pc_relevant_aa&utm_relevant_index=5

https://blog.csdn.net/qq_28418387/article/details/82823928?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-82823928-blog-122237209.pc_relevant_recovery_v2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-82823928-blog-122237209.pc_relevant_recovery_v2&utm_relevant_index=2

# NetCDF 发布

下载对应版本插件，解压，将 jar 文件全部复制到 geoserver 中的 webapps\geoserver\WEB-INF\lib 目录中，重启 geoserver 即可。

https://www.shuzhiduo.com/A/KE5Qr3ALdL/

# sld 文件

geoserver 样式文件 xml 定义地图显示样式

可以使用 qgis 导出 但是样式不是很好看 可以使用 uDig 设计样式并编辑 sld 文件

缩放比例属性

```xml
<se:MinScaleDenominator>17009</se:MinScaleDenominator>
<se:MaxScaleDenominator>4354330</se:MaxScaleDenominator>
```

https://www.cnblogs.com/echohye/p/16651808.html

## 掩膜

使用掩膜去调节样式 去掉 gerserver 发布时的样式边框

## se 标准

## sld 标准
