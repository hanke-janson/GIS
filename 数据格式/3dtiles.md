# BIM

**建筑信息模型（Building Information Modeling）**是建筑学、工程学及土木工程的新工具。建筑信息模型或建筑资讯模型一词由Autodesk所创的。它是来形容那些以三维图形为主、物件导向、建筑学有关的电脑辅助设计。当初这个概念是由Jerry Laiserin把Autodesk、奔特力系统软件公司、Graphisoft所提供的技术向公众推广。--------百度百科

BIM的核心是通过建立虚拟的建筑工程三维模型，利用数字化技术，为这个模型提供完整的、与实际情况一致的建筑工程信息库。该信息库不仅包含描述建筑物构件的几何信息、专业属性及状态信息，还包含了非构件对象（如空间、运动行为）的状态信息。借助这个包含建筑工程信息的三维模型，大大提高了建筑工程的信息集成化程度，从而为建筑工程项目的相关利益方提供了一个工程信息交换和共享的平台。

BIM（Building Information Modeling）技术是一种应用于工程设计、建造、管理的数据化工具，通过对建筑的数据化、信息化模型整合，在项目策划、运行和维护的全生命周期过程中进行共享和传递，使工程技术人员对各种建筑信息作出正确理解和高效应对，为设计团队以及包括建筑、运营单位在内的各方建设主体提供协同工作的基础，在提高生产效率、节约成本和缩短工期方面发挥重要作用。

# 3D Tiles规范(三维瓦片)

3D Tiles 专为流式传输和渲染大量 3D 地理空间内容而设计，例如摄影测量、3D 建筑、BIM/CAD、实例化特征和点云。它定义了一个分层数据结构和一组提供可渲染内容的图块格式。3D Tiles 没有为内容的可视化定义明确的规则；客户可以可视化 3D Tiles 数据，但它认为合适。

在 3D Tiles 中，*tileset*是在空间数据结构**树中组织的一组图块**。一个tileset由至少一个tileset JSON文件描述，该文件包含tileset元数据和一个tile对象树，每个对象都可以引用以下格式之一的可渲染内容：

| 类型         | 英文名称          | 文件后缀名 |
| ------------ | ----------------- | ---------- |
| 批量三维模型 | Batch 3D Model    | b3dm       |
| 实例三维模型 | Instance 3D Model | i3dm       |
| 点云         | PointCloud        | pnts       |
| 复合模型     | Component         | cmpt       |

| 格式                                                         | 用途                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [批量 3D 模型 ( `b3dm`)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Batched3DModel/README.md) | 异构 3D 模型。例如带纹理的地形和表面、3D 建筑外部和内部、大型模型。 |
| [实例化 3D 模型 ( `i3dm`)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Instanced3DModel/README.md) | 3D 模型实例。例如树木、风车、螺栓。                          |
| [点云 ( `pnts`)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/PointCloud/README.md) | 海量点数。                                                   |
| [复合 ( `cmpt`)](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Composite/README.md) | 将不同格式的图块连接到一个图块中。                           |

| 瓦片类型 | 对应实际数据                                               |
| -------- | ---------------------------------------------------------- |
| b3dm     | 传统三维建模数据、BIM数据、倾斜摄影数据                    |
| i3dm     | 一个模型多次渲染的数据，灯塔、树木、椅子等                 |
| pnts     | 点云数据                                                   |
| cmpt     | 前三种数据的复合（允许一个cmpt文件内嵌多个其他类型的瓦片） |

![img](https://img2020.cnblogs.com/blog/1097074/202006/1097074-20200628033646285-1641618470.png) 

# ————————————-————

建筑的话，shp -> b3dm格式   使用Cesiumlab 通用模型切片，然后设置高度字段，选择八叉树处理器（Lod策略选择尺寸过滤【适用于个数非常多的BIM模型】），记得选择保存字段，否则根据高度区分建筑颜色，字段不会被识别，选择同一个目录输出，导出的b3dm数据会被覆盖掉（批量处理的时候，时间可能会超长）

**注：如果在转换时设置贴图纹理效果的话，那么转换时间会超长！！！！！** 

目前的想法，把获取到的带有高程的.shp建筑数据转为.b3dm数据后，分别部署后，单独引入cesium

目前的地球地图的坐标系是GCJ-02，建筑等模型数据的坐标系是WGS84，需要利用QGIS 扩展-- GeoHey工具将shp数据进行坐标转换后（注意3857和4326，需要3857-GCJ-02数据）可批量转换**（大概10分钟60个shp文件，处理过多可能卡住）**，再进行转b3dm格式

 **注**：cesium请求已发布的3DTileset数据时，是先加载json索引文件，后加载b3dm文件，所以会有些延迟（如果Lod策略选择尺寸过滤【适用于个数非常多的BIM模型】会好得多）

# —————————————————

https://www.cnblogs.com/onsummer/p/12799366.html

https://www.cnblogs.com/onsummer/p/13128682.html

3dTiles 是一种规范，在规范的指导下，各种资源文件可以是独立存在于硬盘中的目录、文件，也可以以二进制形式写入数据库中。目前，3dTiles 的官方实现只有 “散列文件”，也就是文件、文件夹的形式存储在硬盘中，有关如何存储到数据库中的讨论，官方仍在进行中 。

3dTiles还有一个特点：那就是不记录模型数据，只记录各级“Tile”的逻辑关系，以及“Tile”自己的属性信息。所谓的模型数据，是指三维模型的顶点、贴图材质、法线、颜色等信息。逻辑关系是指，各级Tile是如何在空间中保持连续的，LOD是如何组织的。属性信息就很简单啦，门有门的生产商，窗户有窗户的使用年限等，往大了说，建筑还有它自己的寿命、法人、施工单位等属性信息。 

3dTiles的特点总结如下：

- 三维模型使用了 glTF 规范，继承它的渲染高性能
- 除了嵌入的 glTF，3dTiles 自己 **只记录各级Tile的空间逻辑关系（如何构成整个3dtiles）和属性信息，以及模型与属性如何挂接在一起的信息**  

一份3dtiles数据集：

- 入口文件是`tileset.json`
- 各级瓦片用文件夹（目录）来组织

3dTiles 数据目前的具体文件实现，是一些零散的文件。

数据集的名称与所在文件夹的名称并无关系，数据集的名称写在入口文件中。

3dTiles至少有一个 `tileset.json` 文件，作为整个数据集的入口。它是一个 json 文件，描述了整个三维瓦片数据集，它记录的是上一节提及的“逻辑信息”，还包括一些其他的元数据。而“属性信息”、“嵌入的gltf模型” 则位于各个二进制瓦片文件中，这些二进制文件则由 `tileset.json` 中的瓦片中的 `uri` 来引用。

3dtiles十分灵活

- 3dTiles的文件名可以不是tileset.json
- 3dTiles允许套娃

原则上，只要被引用的子一级3dtiles 不循环引用父级3dtiles，那么就OK（规范如是说）。 

3dTiles在空间上允许数据集使用如下几种树结构： 四叉树 、八叉树、KD树、格网结构

## 四叉树

四元树又称四叉树是一种树状数据结构，在每一个节点上会有四个子区块。四元树常应用于二维空间数据的分析与分类。 它将数据区分成为四个象限。数据范围可以是方形或矩形或其他任意形状。

## 八叉树

八叉树是一种用于描述三维空间的树状数据结构，八叉树的每个节点表示一个正方体的体积元素，每个节点有八个子节点，将八个子节点所表示的体积元素加在一起就等于父节点的体积。 

## KD树

Kd-树 其实是K-dimension tree的缩写，是对数据点在k维空间中划分的一种数据结构。其实，Kd-树是一种平衡二叉树。 

## 格网结构

格网结构是以格网单元为基础的地理空间数据组织方式，通过对制图区域按一定大小划分而构成的格网炬阵。 

每个格网单元是最基本的信息存贮和处理单元。格网形式有三角形、六边形、正方形、矩形等，但多采用正方形格网形式。格网结构是[地理信息系统](https://baike.baidu.com/item/%E5%9C%B0%E7%90%86%E4%BF%A1%E6%81%AF%E7%B3%BB%E7%BB%9F/171830?fromModule=lemma_inlink)常采用的数据结构之一。对于每一格网数据矩阵来说，其行、列号隐含了地理实体的空间分布位置及其空间关系。每个格网单元记录相应空间实体的属性类型码，即属性编码。如果对同一区域内格网单元不同专题类型的空间实体作属性编码，则在地学综合分析中每个格网单元成为多维判别空间中的一点，并可根据分析数学模型对各格网单元进行判别分类与制图。以格网结构为基础的地理信息系统，优点是数据结构与数据处理方法较简单，适用于地学综合分析，但几何精度较低，且占用较多存贮空间。通常采用游程编码（runlength encoding）方法进行格网数据的压缩。 

# glTF格式

一个简单的三角形

```js
{
  "scenes" : [
    {
      "nodes" : [ 0 ]
    }
  ],

  "nodes" : [
    {
      "mesh" : 0
    }
  ],

  "meshes" : [
    {
      "primitives" : [ {
        "attributes" : {
          "POSITION" : 1
        },
        "indices" : 0
      } ]
    }
  ],

  "buffers" : [
    {
      "uri" : "data:application/octet-stream;base64,AAABAAIAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAA=",
      "byteLength" : 44
    }
  ],
  "bufferViews" : [
    {
      "buffer" : 0,
      "byteOffset" : 0,
      "byteLength" : 6,
      "target" : 34963
    },
    {
      "buffer" : 0,
      "byteOffset" : 8,
      "byteLength" : 36,
      "target" : 34962
    }
  ],
  "accessors" : [
    {
      "bufferView" : 0,
      "byteOffset" : 0,
      "componentType" : 5123,
      "count" : 3,
      "type" : "SCALAR",
      "max" : [ 2 ],
      "min" : [ 0 ]
    },
    {
      "bufferView" : 1,
      "byteOffset" : 0,
      "componentType" : 5126,
      "count" : 3,
      "type" : "VEC3",
      "max" : [ 1.0, 1.0, 0.0 ],
      "min" : [ 0.0, 0.0, 0.0 ]
    }
  ],

  "asset" : {
    "version" : "2.0"
  }}
```

![img](https://img2022.cnblogs.com/blog/48590/202209/48590-20220908172641311-1276574695.png) 

元素概述

> scene： glTF格式的场景结构描述条目。它通过引用node来定义场景图；
>
> node： 场景图层次中的一个节点。它可以包含一个变换(比如旋转或平移)，并且可以引用其他（子）节点 。此外，它可以引用网格和相机，以及描述网格变换的蒙皮；
>
> camera： 定义了用于渲染场景的视锥体配置；
>
> mesh： 描述了出现在场景中几何对象实际的几何数据。它是指accessor用于访问实际几何数据material的对象，并且是指在渲染对象时定义其外观的 ；
>
> skin： 定义了用于蒙皮的参数，参数的值通过一个accessor对象获得。
>
> animation： 描述了一些结点如何随时间进行变换(比如旋转或平移)；
>
> accessor： 一个访问任意数据的抽象数据源。被mesh、skin和animation元素使用来提供几何数据、蒙皮参数和基于时间的动画值。它通过引用一个bufferView对象，来引用实际的二进制数据；
>
> material： 包含了定义3D对象外观的参数。它通常引用了用于3D对象渲染的texture对象；
>
> texture： 定义了一个sampler对象和一个image对象。sampler对象定义了image对象在3D对象上的张贴方式。

更多详情，可查阅glTF 2.0规范（[https://github.com/KhronosGroup/glTF/tree/master/specification/2.0/](https://link.zhihu.com/?target=https%3A//github.com/KhronosGroup/glTF/tree/master/specification/2.0/)）以及glTF官方教程（[https://github.com/KhronosGroup/glTF-Tutorials/tree/master/gltfTutorial](https://link.zhihu.com/?target=https%3A//github.com/KhronosGroup/glTF-Tutorials/tree/master/gltfTutorial)）



# glTF和3DTiles的选用

[参考博客](https://blog.csdn.net/hankern/article/details/101796600?spm=1001.2101.3001.6650.9&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-9-101796600-blog-107334174.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-9-101796600-blog-107334174.pc_relevant_aa&utm_relevant_index=12)

glTF小模型只是Primitive 或Entity的其中一种数据类型；

Cesium支持包含关键帧（key-frame）动画，骨骼（skinning）动画的glTF格式的三维模型，且支持模型节点（node）的拾取。glTf是Khronns Group定义的一个基于web的新兴三维模型格式行业标准；

3D Tiles是一个开发的规范，用于传输海量的异构三维地理空间数据集，使用概念类似terrain和imagery的瓦片流技术，3D Tiles使得建筑物数据集、BIM模型、点云和摄影测量模型等大模型比较流畅的在web端进行浏览展示。

glTF表示了渲染一个模型的几何数据、[纹理](https://so.csdn.net/so/search?q=%E7%BA%B9%E7%90%86&spm=1001.2101.3001.7020)数据、材质数据、元数据等。glTF一般用于表示一个具体模型，比如汽车、树木等，不会用于表示一个数字城市，数字城市一般用3DTiles来表示。 

```shell
# /bin/bash^M: 坏的解释器: 没有那个文件或目录 的解决方法
原因：
由于windows系统下换行符为 \r\n，linux下换行符为 \n，所以导致在windows下编写的文件会比linux下多回车符号 \r。

解决方法：
只需要去掉多余的 \r 回车符 即可。操作办法可以用sed命令进行全局替换
sed 's/\r//' -i gen_cert.sh
```

# TopoJSON

**TopoJSON**是对拓扑进行编码的 GeoJSON 的扩展。*TopoJSON*文件中的几何不是离散地表示几何.

