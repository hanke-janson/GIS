<template>
  <div class="sidebar-item" v-if="item.children">
    <template v-if="item.children.length == 0">
      <el-menu-item :index="item.path">
        <i class="el-icon-menu"></i>
        {{ item.title }}
      </el-menu-item>
    </template>

    <el-submenu v-else :index="item.path">
      <template v-slot:title>
        <i class="el-icon-menu"></i>
        {{ item.title }}
      </template>

      <template v-for="child in item.children">
        <sidebar-item
          v-if="child.children && child.children.length > 0"
          :item="child"
          :key="child.path"
        />
        <el-menu-item v-else :key="child" :index="child.path">
          <i class="el-icon-location"></i>
          {{ child.title }}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const data = reactive({});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped></style>
