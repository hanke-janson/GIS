<template>
  <div class="side-bar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :default-active="activeName"
      >
        <sidebar-item v-for="menu in menuList" :key="menu.path" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, onMounted } from "vue";
import SidebarItem from "./SidebarItem.vue";
import { menuList } from "./index";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "SideBar",
  components: {
    SidebarItem,
  },
  setup() {
    const route = useRoute();
    const data = reactive({
      menuList,
      activeName: "",
    });

    watch(
      () => route.path,
      (value: any) => {
        getPath(value);
      }
    );

    // 获取当前路由的path
    let getPath = (value: any) => {
      let item: any = value.split("/");
      data.activeName = `/${item[item.length - 1]}`;
    };

    onMounted(() => {
      getPath(route.path);
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.side-bar {
  transition: width 0.28s;
  width: 180px !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;

  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .el-scrollbar {
    height: 100%;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }
  .is-horizontal {
    display: none;
  }
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
  .is-active > .el-submenu__title {
    color: #f4f4f5 !important;
  }
}
</style>
