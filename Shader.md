# Shader 学习

https://thebookofshaders.com/?lan=ch

https://www.shadertoy.com/

GPU 会让所有并行的微处理器（管道们）一直处在忙碌状态；只要它们一有空闲就会接到新的信息。一个线程不可能知道它前一刻在做什么。它可能是在画操作系统界面上的一个按钮，然后渲染了游戏中的一部分天空，然后显示了一封 email 中的一些文字。每个线程不仅是“盲视”的，而且还是“无记忆”的。同时，它要求编写一个通用的规则，依据像素的不同位置依次输出不同的结果。 这种抽象性，和盲视、无记忆的限制使得 shaders 在程序员新手中不是很受欢迎。

## Hello World

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
	gl_FragColor = vec4(0.924,0.655,1.000,1.000);
}
```

推测出的知识点：

尽管这几行简单的代码看起来不像有很多内容，我们还是可以据此推测出一些知识点：

1. shader 语言 有一个 `main` 函数，会在最后返回颜色值。这点和 C 语言很像。
2. 最终的像素颜色取决于预设的全局变量 `gl_FragColor`。
3. 这个类 C 语言有内建的**变量**（像`gl_FragColor`），**函数**和**数据类型**。在本例中我们刚刚介绍了`vec4`（四分量浮点向量）。之后我们会见到更多的类型，像 `vec3` （三分量浮点向量）和 `vec2` （二分量浮点向量），还有非常著名的：`float`（单精度浮点型）， `int`（整型） 和 `bool`（布尔型）。
4. 如果我们仔细观察 `vec4` 类型，可以推测这四个变元分别响应红，绿，蓝和透明度通道。同时我们也可以看到这些变量是**规范化**的，意思是它们的值是从 0 到 1 的。之后我们会学习如何规范化变量，使得在变量间**map**（映射）数值更加容易。
5. 另一个可以从本例看出来的很重要的类 C 语言特征是，预处理程序的宏指令。宏指令是预编译的一部分。有了宏才可以 `#define` （定义）全局变量和进行一些基础的条件运算（通过使用 `#ifdef` 和 `#endif`）。所有的宏都以 `#` 开头。预编译会在编译前一刻发生，把所有的命令复制到 `#defines` 里，检查`#ifdef` 条件句是否已被定义， `#ifndef` 条件句是否没有被定义。在我们刚刚的“hello world!”的例子中，我们在第 2 行检查了 `GL_ES` 是否被定义，这个通常用在移动端或浏览器的编译中。
6. `float`类型在 shaders 中非常重要，所以**精度**非常重要。更低的精度会有更快的渲染速度，但是会以质量为代价。你可以选择每一个浮点值的精度。在第一行（`precision mediump float;`）我们就是设定了所有的浮点值都是中等精度。但我们也可以选择把这个值设为“低”（`precision lowp float;`）或者“高”（`precision highp float;`）。
7. 最后可能也是最重要的细节是，GLSL 语言规范并不保证变量会被自动转换类别。这句话是什么意思呢？显卡的硬件制造商各有不同的显卡加速方式，但是却被要求有最精简的语言规范。因而，自动强制类型转换并没有包括在其中。在我们的“hello world!”例子中，`vec4` 精确到单精度浮点，所以应被赋予 `float` 格式。但是如果你想要代码前后一致，不要之后花费大量时间 debug 的话，最好养成在 `float` 型数值里加一个 `.` 的好习惯。如下这种代码就可能不能正常运行：

```
void main() {
    gl_FragColor = vec4(1,0,0,1);   // 出错
}
```

现在我们已经基本讨论完了“hello world!”例子中所有主要的内容，是时候点击代码，检验一下我们所学的知识了。你会发现出错时程序会编译失败，只留一个寂寞的白屏。你可以试试一些好玩的小点子，比如说：

- 把单精度浮点值换成整型数值，猜猜你的显卡能不能容忍这个行为。
- 试试把第八行注释掉，不给函数赋任何像素的值。
- 尝试另外写个函数，返回某个颜色，然后在 `main()` 里面使用这个函数。给个提示，这个函数应该长这样：

```
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
vec4 red(){
    return vec4(1.000,0.087,0.154,1.000);
}
void main() {
    gl_FragColor = red();
}

```

- 有很多种构造 `vec4` 类型的方式，试试看其他方式。下面就是其中一种方式：

```
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

尽管这个例子看起来不那么刺激，它却是最最基础的 —— 我们把画布上的每一个像素都改成了一个确切的颜色。在接下来的章节中我们将会看到如何用两种输入源来改变像素的颜色：空间（依据像素在屏幕上的位置）和时间（依据页面加载了多少秒）。

## Uniforms

现在我们知道了 GPU 如何处理并行线程，每个线程负责给完整图像的一部分配置颜色。尽管每个线程和其他线程之间不能有数据交换，但我们能从 CPU 给每个线程输入数据。因为显卡的架构，所有线程的输入值必须**统一**（uniform），而且必须设为**只读**。也就是说，每条线程接收相同的数据，并且是不 可改变的数据。

这些输入值叫做 `uniform` （统一值），它们的数据类型通常为：`float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` and `samplerCube`。uniform 值需要数值类型前后一致。且在 shader 的开头，在设定精度之后，就对其进行定义。

```
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // 画布尺寸（宽，高）
uniform vec2 u_mouse;      // 鼠标位置（在屏幕上哪个像素）
uniform float u_time;     // 时间（加载后的秒数）
```

你可以把 uniforms 想象成连通 GPU 和 CPU 的许多小的桥梁。虽然这些 uniforms 的名字千奇百怪，但是在这一系列的例子中我一直有用到：`u_time` （时间）, `u_resolution` （画布尺寸）和 `u_mouse` （鼠标位置）。按业界传统应在 uniform 值的名字前加 `u_` ，这样一看即知是 uniform。尽管如此你也还会见到各种各样的名字。比如[ShaderToy.com](https://www.shadertoy.com/)就用了如下的名字：

```
uniform vec3 iResolution;   // 视口分辨率（以像素计）
uniform vec4 iMouse;        // 鼠标坐标 xy： 当前位置, zw： 点击位置
uniform float iTime;        // shader 运行时间（以秒计）
```

好了说的足够多了，我们来看看实际操作中的 uniform 吧。在下面的代码中我们使用 `u_time` 加上一个 sin 函数，来展示图中红色的动态变化。

```glsl
#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;
void main() {
	// 1.0
	gl_FragColor = vec4(abs(sin(u_time)),0.0,0.0,1.0);
}
```

GLSL 还有更多惊喜。GPU 的硬件加速支持我们使用角度，三角函数和指数函数。这里有一些这些函数的介绍：[`sin()`](https://thebookofshaders.com/glossary/?search=sin), [`cos()`](https://thebookofshaders.com/glossary/?search=cos), [`tan()`](https://thebookofshaders.com/glossary/?search=tan), [`asin()`](https://thebookofshaders.com/glossary/?search=asin), [`acos()`](https://thebookofshaders.com/glossary/?search=acos), [`atan()`](https://thebookofshaders.com/glossary/?search=atan), [`pow()`](https://thebookofshaders.com/glossary/?search=pow), [`exp()`](https://thebookofshaders.com/glossary/?search=exp), [`log()`](https://thebookofshaders.com/glossary/?search=log), [`sqrt()`](https://thebookofshaders.com/glossary/?search=sqrt), [`abs()`](https://thebookofshaders.com/glossary/?search=abs), [`sign()`](https://thebookofshaders.com/glossary/?search=sign), [`floor()`](https://thebookofshaders.com/glossary/?search=floor), [`ceil()`](https://thebookofshaders.com/glossary/?search=ceil), [`fract()`](https://thebookofshaders.com/glossary/?search=fract), [`mod()`](https://thebookofshaders.com/glossary/?search=mod), [`min()`](https://thebookofshaders.com/glossary/?search=min), [`max()`](https://thebookofshaders.com/glossary/?search=max) 和 [`clamp()`](https://thebookofshaders.com/glossary/?search=clamp)。

现在又到你来玩的时候了。

- 降低颜色变化的速率，直到肉眼都看不出来。
- 加速变化，直到颜色静止不动。
- 玩一玩 RGB 三个通道，分别给三个颜色不同的变化速度，看看能不能做出有趣的效果。

## gl_FragCoord

就像 GLSL 有个默认输出值 `vec4 gl_FragColor` 一样，它也有一个默认输入值（ `vec4 gl_FragCoord` ）。`gl_FragCoord`存储了活动线程正在处理的**像素**或**屏幕碎片**的坐标。有了它我们就知道了屏幕上的哪一个线程正在运转。为什么我们不叫 `gl_FragCoord` uniform （统一值）呢？因为每个像素的坐标都不同，所以我们把它叫做 **varying**（变化值）。

```
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	gl_FragColor = vec4(st.x,st.y,0.0,1.0);
}
```

上述代码中我们用 `gl_FragCoord.xy` 除以 `u_resolution`，对坐标进行了**规范化**。这样做是为了使所有的值落在 `0.0` 到 `1.0` 之间，这样就可以轻松把 X 或 Y 的值映射到红色或者绿色通道。

在 shader 的领域我们没有太多要 debug 的，更多地是试着给变量赋一些很炫的颜色，试图做出一些效果。有时你会觉得用 GLSL 编程就像是把一搜船放到了瓶子里。它同等地困难、美丽而令人满足。

![img](https://thebookofshaders.com/03/08.png)

现在我们来检验一下我们对上面代码的理解程度。

- 你明白 `(0.0,0.0)` 坐标在画布上的哪里吗？
- 那 `(1.0,0.0)`, `(0.0,1.0)`, `(0.5,0.5)` 和 `(1.0,1.0)` 呢？
- 你知道如何用**未**规范化（normalized）的 `u_mouse` 吗？你可以用它来移动颜色吗？
- 你可以用 `u_time` 和 `u_mouse` 来改变颜色的图案吗？不妨琢磨一些有趣的途径。

经过这些小练习后，你可能会好奇还能用强大的 shader 做什么。接下来的章节你会知道如何把你的 shader 和 three.js，Processing，和 openFrameworks 结合起来。

## GLSL

OpenGL 着色语言（OpenGL Shading Language）是用来在 OpenGL 中着色编程的语言，也即开发人员写的短小的自定义程序，他们是在图形卡的 GPU （Graphic Processor Unit 图形处理单元）上执行的，代替了固定的渲染管线的一部分，使渲染管线中不同层次具有可编程性。比如：视图转换、投影转换等。GLSL（GL Shading Language）的着色器代码分成 2 个部分：Vertex Shader（顶点着色器）和 Fragment（片断着色器），有时还会有 Geometry Shader（几何着色器）。负责运行顶点着色的是顶点着色器。它可以得到当前 OpenGL 中的状态，GLSL 内置变量进行传递。GLSL 其使用 C 语言作为基础高阶着色语言，避免了使用汇编语言或硬件规格语言的复杂性。

GLSL 的变量命名方式与 C 语言类似。变量的名称可以使用字母，数字以及下划线，但变量名不能以数字开头，还有变量名不能以 gl\_作为前缀，这个是 GLSL 保留的前缀，用于 GLSL 的内部变量。当然还有一些 GLSL 保留的名称是不能够作为变量的名称的。

## 顶点着色器和片元着色器

WebGL 的着色器代码分为顶点着色器代码和片元着色器代码两部分，顶点着色器代码会在 GPU 的顶点着色器单元执行，片元着色器代码会在 GPU 的片元着色器单元执行，在 WebGL 渲染管线流程中，或者说 GPU 的渲染流程中，顶点着色器代码先执行处理顶点，得到一系列片元，然后再执行片元着色器代码处理片元。

### 顶点着色器 Vertex shaders

顶点着色器(Vertex Shader)的作用是定位几何体的顶点。其思想是发送顶点位置、网格变换（如定位 position、旋转 rotation 和缩放 scale）、摄影机信息（如定位 position、旋转 rotation 和视野 fov）。然后，GPU 将按照顶点着色器中的指示处理所有这些信息，以便将顶点投影到 2D 空间，该空间将成为我们的渲染 render，也就是我们的画布 canvas。
顶点着色器对顶点实现了一种通用的可编程方法。
使用顶点着色器时，其代码将应用于几何体的每个顶点。但有些数据（如顶点的位置）会在每个顶点之间发生变化。这种类型的数据（在顶点之间变化的数据）称为 attribute 属性变量。

### 片元着色器 fragment shaders

片元着色器的作用是为几何体的每个可见片元(像素)进行着色。
我们会创建片元着色器,可以通过使用 uniform 将数据（像是颜色）和着色器发送至 GPU，之后 GPU 就会按照指令对每个片元进行着色。<br>片元（或像素）着色器后运行; 它设置渲染到屏幕的每个单独的“片元”（像素）的颜色。
