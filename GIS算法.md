# 抽稀

在处理GPS数据时，记录中往往会有很多时间戳和距离都接近的数据，一方面浪费了较多的存储空间，另一方面造成所要表达的图形不光滑或不符合标准。因此要通过某种规则，在保证矢量曲线形状不变的情况下， 最大限度地减少数据点个数，这个过程称为**抽稀**。 

常用的抽稀算法，包括但不限于（这部分内容来源于网络）

- 步长压缩算法：沿连续曲线每隔一定的步长抽取一点，其余点全部压缩掉，然后在相邻抽取点间用直线连续或曲线拟合逼近。
- 线段过滤算法：当某一段的长度小于某一过滤值时，就以该段的中点代替该段，如同此段的两端退化到中点一样。
- 道格拉斯-普克（Douglas-Peuker)算法：亦称为拉默-道格拉斯-普克算法、迭代适应点算法、分裂与合并算法)是将曲线近似表示为一系列点，并减少点的数量的一种算法。

PostGIS内置了部分常用算法，我们进行一下简单的测试。

## 使用PostGIS函数

使用到的PostGIS函数如下

- [ST_Simplify](https://link.juejin.cn/?target=https%3A%2F%2Fpostgis.net%2Fdocs%2FST_Simplify.html)
- [ST_SimplifyVW](https://link.juejin.cn/?target=https%3A%2F%2Fpostgis.net%2Fdocs%2FST_SimplifyVW.html)
- [ST_SimplifyPreserveTopology](https://link.juejin.cn/?target=https%3A%2F%2Fpostgis.net%2Fdocs%2FST_SimplifyPreserveTopology.html)

https://juejin.cn/post/6844904019970752519

