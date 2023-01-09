/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// mock后台返回的路由表
export const menuList = [
  {
    path: "/entity",
    name: "entity",
    title: "实体",
    component: "Layout",
    redirect: "/polygon",
    children: [
      {
        path: "/polygon",
        name: "polygon",
        title: "面+图片材质",
        component: "entity/polygon/index",
      },
      {
        path: "/highlight",
        name: "highlight",
        title: "geojson+高亮",
        component: "entity/highlight/index",
      },
      {
        path: "/addGeojson",
        name: "addGeojson",
        title: "加载geojson数据",
        component: "entity/addGeojson/index",
      },
    ],
  },
  {
    path: "/interaction",
    name: "interaction",
    title: "交互",
    component: "Layout",
    redirect: "/draw",
    children: [
      {
        path: "/draw",
        name: "draw",
        title: "绘制要素",
        component: "interaction/draw/index",
      },
    ],
  },
  {
    path: "/material",
    name: "material",
    title: "材质",
    component: "Layout",
    redirect: "/customMaterialLine",
    children: [
      {
        path: "/customMaterialLine",
        name: "customMaterialLine",
        title: "自定义材质线1",
        component: "material/customMaterialLine/index",
      },
      {
        path: "/polylineTrailMaterialProperty",
        name: "polylineTrailMaterialProperty",
        title: "自定义材质线2",
        component: "material/polylineTrailMaterialProperty/index",
      },
      {
        path: "/marine",
        name: "marine",
        title: "海洋",
        component: "material/marine/index",
      },
    ],
  },
  {
    path: "/other",
    name: "other",
    title: "其他",
    component: "Layout",
    redirect: "/roller-shutters",
    children: [
      {
        path: "/roller-shutters",
        name: "roller-shutters",
        title: "卷帘",
        component: "other/roller-shutters/index",
      },
      {
        path: "/3dtiles",
        name: "3dtiles",
        title: "加载3dtiles",
        component: "other/3dtiles/index",
      },
    ],
  },
];

const SetPage = (name: any) => () => import(`@/${name}/index.vue`);
const SetView = (name: any) => () => import(`@/views/${name}.vue`);
export const generaMenu = (routers: any, data: any): any => {
  data.forEach((item: any) => {
    const menu = Object.assign({}, item);
    if (menu.component == "Layout") {
      menu.component = "layout";
      menu.component = SetPage(menu.component);
    } else {
      menu.component = SetView(menu.component);
    }
    if (item.children) {
      menu.children = [];
      generaMenu(menu.children, item.children);
    }
    routers.push(menu);
  });
};
