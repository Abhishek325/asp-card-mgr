<template>
  <div class="card-action-container q-pa-sm">
    <div class="row q-pt-sm">
      <div
        v-for="(action, i) in actions"
        :key="i"
        class="col text-center q-pa-sm cursor-pointer action non-selectable"
        @click="$emit('actionClicked', action)"
      >
        <img
          avatar
          :src="
            require(`../../../assets/icons/CardActions/${action
              .replace(/[\s\/]/g, '-')
              .toLowerCase()}.svg`)
          "
        /><br />
        <span>{{ action }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { actions } from "../constants";

export default defineComponent({
  name: "CardActions",
  setup() {
    return {
      actions,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-action-container {
  max-width: 420px;
  background: #edf3ff;
  border-radius: 16px;
  font-size: 13px;
  color: #0c365a;
}
.action {
  overflow-wrap: break-word;
}
</style>
