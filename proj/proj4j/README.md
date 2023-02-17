## proj4j

https://github.com/locationtech/proj4j

> ### 将 Proj4J 与 Maven 结合使用
>
> **！重要的！**从`1.2.2`版本开始，`proj4-core`不包含 EPSG 许可文件。为了使 proj4j 正常运行，考虑`proj4-epsg`依赖使用是有意义的。
>
> 要在 Maven 项目中包含 Proj4J，请添加如下依赖块：
>
> ```
> <properties>
>     <proj4j.version>{latest version}</proj4j.version>
> </properties>
> <dependency>
>     <groupId>org.locationtech.proj4j</groupId>
>     <artifactId>proj4j</artifactId>
>     <version>${proj4j.version}</version>
> </dependency>
> ```
>
> 其中`{latest version}`指的是上面徽章指示的版本。
>
> #### Proj4j EPSG
>
> `Proj4J-EPSG`模块分发了一部分 EPSG 数据集。
>
> 要包含`Proj4J-EPSG`在 Maven 项目中，请添加如下依赖块：
>
> ```
> <properties>
>     <proj4j.version>{latest version}</proj4j.version>
> </properties>
> <dependency>
>     <groupId>org.locationtech.proj4j</groupId>
>     <artifactId>proj4j-epsg</artifactId>
>     <version>${proj4j.version}</version>
> </dependency>
> ```
>
> 其中`{latest version}`指的是 maven 指示的版本。
