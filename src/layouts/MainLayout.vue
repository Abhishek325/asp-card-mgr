<template>
  <q-layout view="lHh Lpr lFf">
    <left-menu class="gt-xs" />
    <bottom-tab-view class="lt-sm"/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LeftMenu from "./LeftMenu.vue";
import BottomTabView from "./BottomTabView.vue";

export default defineComponent({
  name: "MainLayout",
  components: { LeftMenu, BottomTabView },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.logo-img {
  width: 125px;
  height: 35px;
}
/deep/.q-drawer__content {
  background: #0c365a;
  color: #fff;
}
</style>
