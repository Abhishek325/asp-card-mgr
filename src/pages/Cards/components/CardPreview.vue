<template>
  <div class="row justify-center">
    <div
      class="show-card-action text-bold text-right q-mb-md non-selectable"
      @click="toggleShowCardNumber"
    >
      <q-icon name="remove_red_eye"></q-icon>
      {{ showCardNumber ? "Hide" : "Show" }} card number
    </div>
    <div class="q-pa-md debit-card" :class="{ 'light-dimmed': card.isFreezed }">
      <div class="column">
        <div class="col">
          <img
            :src="require('../../../assets/logo-white.svg')"
            class="float-right"
          />
        </div>
        <div class="col q-mt-md text-h5 text-white text-bold">
          {{ card.name }}
        </div>
        <div class="col q-mt-lg">
          <div class="row card-number-container">
            <div
              class="q-gutter-xs q-mr-md"
              v-for="(group, i) in 3"
              :key="group"
            >
              <span v-if="showCardNumber" class="text-bold show-digits">{{
                card.number.substring(i * 4, (i + 1) * 4)
              }}</span>
              <template v-else>
                <q-icon
                  name="fiber_manual_record"
                  class="font-weight"
                  v-for="n in 4"
                  :key="n"
                  style="font-size: 8px;"
                />
              </template>
            </div>
            <div class="q-gutter-xs">
              <span class="text-bold show-digits">
                {{ card.number.slice(-4) }}
              </span>
            </div>
          </div>
        </div>
        <div class="col q-mt-lg">
          <div class="row justify-center">
            <span class="col text-bold">Thru: {{ card.validThru }}</span>
            <div class="col text-bold text-center">
              <div class="row items-start">
                <span> CVV: </span>
                <span class="q-ml-md text-bold">* * *</span>
              </div>
            </div>
            <div class="col"></div>
          </div>
          <img
            :src="require('../../../assets/visa-logo.svg')"
            class="float-right q-mr-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Card } from "./models";
import { defineComponent, ref, PropType } from "vue";

function useToggleShowCardNumber() {
  const showCardNumber = ref(false);
  function toggleShowCardNumber() {
    showCardNumber.value = !showCardNumber.value;
    return showCardNumber;
  }
  return { showCardNumber, toggleShowCardNumber };
}

export default defineComponent({
  name: "CardPreview",
  props: {
    card: {
      type: Object as unknown as PropType<Card>,
      default: () => null,
    },
  },
  setup(props) {
    return {
      ...useToggleShowCardNumber(),
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.show-card-action {
  color: #01d167;
  width: 95%;
  &:hover {
    cursor: pointer;
  }
}
.debit-card {
  width: 100%;
  background: #40d167;
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
  color: #fff;
  border-radius: 15px;
  .card-number-container {
    .show-digits {
      font-size: 13px;
      letter-spacing: 4px;
    }
  }
  .cvv {
    font-size: 24px;
    margin-top: -3px;
  }
}
</style>
