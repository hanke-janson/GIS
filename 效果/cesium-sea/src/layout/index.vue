<template>
  <div class="layout">
    <div class="menu"><side-bar /></div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import SideBar from "@/components/SideBar/SideBar.vue";
export default defineComponent({
  name: "layout",
  components: {
    SideBar,
  },
  setup() {
    const data = reactive({});

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  .menu {
    width: 180px;
    height: 100%;
    background-color: rgb(48, 65, 86);
  }
  .content {
    flex: 1;
    height: 100%;
    background-color: rgb(130, 228, 184);
  }
}
</style>
