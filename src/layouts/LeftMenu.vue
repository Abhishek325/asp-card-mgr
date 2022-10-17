<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <q-list class="left-menu q-px-lg q-mt-lg">
      <q-item header class="text-grey-8">
        <img :src="require('../assets/Logo.svg')" class="logo-img q-mt-md" />
      </q-item>

      <q-item class="q-mb-lg">
        <q-item-label caption class="text-grey-7"
          >Trusted way of banking for 3,000+ SMEs and startups in
          Singapore</q-item-label
        >
      </q-item>

      <q-item
        v-for="(menu, i) in menuItemList"
        :key="i"
        class="q-ml-sm q-my-md left-menu__item"
        tag="a"
        target="_blank"
        href="link"
      >
        <q-item-section avatar>
          <img avatar :src="require(`../assets/icons/LeftMenu/${menu}.svg`)" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold" style="margin-left: -1rem">{{
            menu
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const menuItems = ["Home", "Cards", "Payments", "Credits", "Settings"];
export default defineComponent({
  name: "LeftMenu",
  setup() {
    const leftDrawerOpen = ref(false);
    const menuItemList = ref(menuItems);
    return { leftDrawerOpen, menuItemList };
  },
});
</script>

<style lang="scss" scoped>
.left-menu {
  .logo-img {
    width: 125px;
    height: 35px;
  }
  .text-caption {
    font-size: 12.5px;
  }
  &.__item {
    font-size: 16px;
    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
