<template>
  <div>
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
    <swipeable-bottom-sheet ref="swipeableBottomSheet">
      <card-actions @actionClicked="actionHelper" />
      <recent-transactions class="q-px-lg" />
    </swipeable-bottom-sheet>
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
          You cannot cancel this card as this is the only card linked to your
          account.
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Card } from "./models";
import { actions } from "../constants";
import CardPreview from "./CardPreview.vue";
import CardActions from "./CardActions.vue";
import RecentTransactions from "./RecentTransactions.vue";
// @ts-ignore:next-line
import { SwipeableBottomSheet } from "vue-swipeable-bottom-sheet";

export default defineComponent({
  name: "MobileCardViewer",
  components: {
    // eslint-disable-next-line
    SwipeableBottomSheet,
    CardPreview,
    CardActions,
    RecentTransactions,
  },
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
.q-carousel {
  background: transparent;
}
/deep/.q-carousel__navigation-icon {
  font-size: 8px !important;
  margin: -2px;
  padding: 0;
}
/deep/.card-action-container {
  border-radius: 0;
  max-width: 100%;
}
/deep/.light-dimmed:after {
  background: rgb(12 49 83 / 49%) !important;
}
</style>
