# 虚拟机安装

[参考博客](https://blog.csdn.net/supergao222/article/details/76222864?locationNum=6&fps=1)
下载镜像

创建虚拟机（Linux，其他 3.x 内核 64 位）

1. 添加具有所需大小的硬盘驱动器
2. 将 CD/DVD 添加到指向您下载的 Alpine ISO 的 VM
3. 在设置 -> 高级中禁用“UEFI 安全启动”，使用传统启动方式即可

启动虚拟机并使用用户名“root”登录，无密码

1. 跑`setup-alpine`
2. 选择语言键盘us us
3. 选择时区 Asia/   Shanghai
4. image模式选择 r:随机 f:已有最快 e:手动修改配置文件
5. 允许root登录ssh
6. Which disk(s) would you like to use? (or '?' for help or 'none') [none]
   这一步比较关键，系统发现了有块8.6GB大小，名称叫sda的硬盘
   问你需不需要使用硬盘，因为Alpine Linux可以运行在内存里，这里的默认选项是不使用硬盘
   所以要手动键入sda，后面的步骤才会将系统安装在硬盘上
7. 当询问磁盘模式时选择**sys （** [sys 模式](https://wiki.alpinelinux.org/wiki/Installation#System_Disk_Mode)会将 Alpine 安装到磁盘）
8. WARNING: Erase the above disk(s) and continue? [y/N] 向导让你确认选择的sda磁盘上的数据会全部丢失 虚拟机磁盘，初始肯定是没数据的，键入"y"确认
9. 安装完成后重启

