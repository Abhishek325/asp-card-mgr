<template>
  <div class="q-gutter-y-md fixed-bottom bg-white shadow-up-6 bottom-actions">
    <q-tabs
      dense
      v-model="activeTab"
      no-caps
      class="text-grey-8"
      active-color="light-green-14"
      indicator-color="white"
    >
      <q-tab v-for="(menu, i) in menuItems" :key="i">
        <q-tab class="q-pa-none" :name="menu">
          <img
            avatar
            :src="require(`../assets/icons/LeftMenu/${menu}.svg`)"
            style="background: #eee"
          />
          <span class="text-bold">
            {{ menu }}
          </span>
        </q-tab>
      </q-tab>
    </q-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const menuItems = ["Home", "Cards", "Payments", "Credits", "Settings"];

export default defineComponent({
  name: "BottomTabView",
  data() {
    return {
      menuItems,
      activeTab: "Cards",
    };
  },
});
</script>

<style lang="scss" scoped>
.bottom-actions {
  z-index: 100;
}
</style>
