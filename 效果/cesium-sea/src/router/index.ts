import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { menuList, generaMenu } from "@/components/SideBar/index";
const accessedRoutes: any = [];
generaMenu(accessedRoutes, menuList);
const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: { name: "addGeojson" } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 动态添加路由
accessedRoutes.forEach((res: any) => {
  router.addRoute(res);
});

export default router;
