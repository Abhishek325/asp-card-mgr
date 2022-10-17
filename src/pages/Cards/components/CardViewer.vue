<template>
  <q-layout
    view="lHh lpr lFf"
    container
    style="height: 75vh"
    class="container-shadow"
  >
    <div class="row justify-center q-pa-lg">
      <div class="column items-center col-12 col-sm-12 col-md-7">
        <q-carousel
          ref="carousel"
          v-model="activeCardId"
          swipeable
          animated
          infinite
          control-color="green"
          navigation
          navigation-icon="fiber_manual_record"
          height="315px"
        >
          <q-carousel-slide
            v-for="(card, i) in cards"
            :name="card.id"
            :key="i"
            class="column no-wrap q-pa-none"
          >
            <card-preview :card="card" />
          </q-carousel-slide>
        </q-carousel>
        <card-actions @actionClicked="actionHelper" />
      </div>
      <div class="row justify-center col-12 col-sm-12 col-md-5">
        <div class="q-pa-md" style="width: 100%">
          <recent-transactions />
        </div>
      </div>
    </div>
    <!-- Dialogs -->
    <q-dialog v-model="cancelCardConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="cancel" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >Are you sure you want to cancel this card?</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Nope" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes"
            color="primary"
            @click="onConfirmCancel"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="lastCardRemoveAlert">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Cannot cancel card</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          You cannot cancel any card as this is the only card linked to your
          account.
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { actions } from "../constants";
import { Card } from "./models";
import CardPreview from "./CardPreview.vue";
import CardActions from "./CardActions.vue";
import RecentTransactions from "./RecentTransactions.vue";

export default defineComponent({
  name: "CardViewer",
  components: { CardActions, CardPreview, RecentTransactions },
  props: {
    cards: {
      type: Array as unknown as PropType<Card[]>,
      default: () => [],
    },
  },
  data() {
    return {
      activeCardId: 1,
      cancelCardConfirm: false,
      lastCardRemoveAlert: false,
    };
  },
  methods: {
    actionHelper(action: string) {
      switch (action) {
        case actions.FREEZE_CARD:
          this.$emit(actions.FREEZE_CARD, this.activeCardId);
          break;
        case actions.SET_SPEND_LIMIT:
          break;
        case actions.ADD_TO_GPAY:
          break;
        case actions.REPLACE_CARD:
          break;
        case actions.CANCEL_CARD:
          this.cancelCardHelper();
          break;
      }
    },
    cancelCardHelper() {
      if (this.cards.length == 1) {
        this.lastCardRemoveAlert = true;
        return;
      }
      this.cancelCardConfirm = true;
    },
    onConfirmCancel() {
      this.$emit(actions.CANCEL_CARD, this.activeCardId);
      const carousel = this.$refs.carousel as HTMLInputElement;
      // @ts-ignore:next-line
      carousel.next();
    },
  },
});
</script>

<style scoped>
.container-shadow {
  box-shadow: 0 4px 12px #00000014;
  border-radius: 8px;
}
/deep/.q-carousel__navigation-icon {
  font-size: 8px !important;
  margin: -2px;
  padding: 0;
}
</style>
