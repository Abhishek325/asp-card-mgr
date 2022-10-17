<template>
  <q-page>
    <!-- Desktop -->
    <div class="q-gutter-y-md gt-xs" style="padding: 2rem">
      <div class="column q-px-md">
        <div>Available balance</div>
        <div class="row q-mt-sm">
          <div class="col row items-start">
            <span class="balance-label text-white text-bold q-mr-md">S$</span>
            <span class="text-h5 text-bold">3,000</span>
          </div>
          <div class="col text-right">
            <q-btn
              color="blue-10"
              size="md"
              no-caps
              @click="readCard = !readCard"
            >
              <q-icon name="add_circle"></q-icon>
              &nbsp;New Card
            </q-btn>
          </div>
        </div>
      </div>
      <q-tabs
        v-model="activeTab"
        narrow-indicator
        dense
        no-caps
        align="left"
        class="text-grey"
        active-color="black"
        indicator-color="blue"
      >
        <q-tab
          v-for="(tab, i) in tabList"
          :key="i"
          :ripple="false"
          :name="tab.name"
          :label="tab.label"
        />
      </q-tabs>
      <q-tab-panels v-model="activeTab">
        <q-tab-panel name="MY_DEBIT_CARDS">
          <card-viewer :cards="cards" v-on="eventBindings" />
        </q-tab-panel>
        <q-tab-panel name="ALL_COMPANY_CARDS">Nothing to display</q-tab-panel>
      </q-tab-panels>
    </div>
    <!-- Mobile -->
    <div class="q-gutter-y-sm q-pa-lg q-pt-md lt-sm mobile-container">
      <div class="row items-end text-white">
        <div class="col">Available balance</div>
        <div class="col">
          <img
            :src="require('../../assets/logo-icon.svg')"
            class="float-right"
            style="width: 35px"
          />
        </div>
      </div>
      <div class="row">
        <div class="col row items-start">
          <span class="balance-label text-white text-bold q-mr-md">S$</span>
          <span class="text-h5 text-white text-bold">3,000</span>
        </div>
        <div class="col text-right text-bold">
          <q-btn
            color="light-blue-3"
            class="text-bold"
            size="md"
            flat
            no-caps
            @click="readCard = !readCard"
          >
            <q-icon name="add_circle"></q-icon>
            &nbsp;New Card
          </q-btn>
        </div>
      </div>
      <q-tabs
        v-model="activeTab"
        narrow-indicator
        dense
        no-caps
        align="left"
        class="text-grey"
        active-color="white"
        indicator-color="blue"
        active-bg-color="transparent"
      >
        <q-tab
          v-for="(tab, i) in tabList"
          :key="i"
          :ripple="false"
          :name="tab.name"
          :label="tab.label"
        />
      </q-tabs>
      <q-tab-panels v-model="activeTab" style="background: transparent">
        <q-tab-panel name="MY_DEBIT_CARDS">
          <mobile-card-viewer :cards="cards" v-on="eventBindings" />
        </q-tab-panel>
        <q-tab-panel name="ALL_COMPANY_CARDS">Nothing to display</q-tab-panel>
      </q-tab-panels>
    </div>
    <!-- Dialog -->
    <q-dialog v-model="readCard">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Card details</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <q-input
                v-model="card.name"
                label="Card Name"
                :rules="[
                  (val) => !!val || 'Card name is required to create a card',
                ]"
              />
              <q-input
                type="int"
                v-model="card.number"
                label="Card number"
                disable
              />
              <q-input v-model="card.validThru" label="Valid Thru" disable />
            </div>
          </div>
          <card-preview v-if="card.name.length > 3" :card="card" />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Add card"
            v-close-popup
            @click="addCard"
            :disable="card.name.length === 0"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Card } from "./components/models";
import { actions, linkedCards, TABS } from "./constants";
import CardPreview from "./components/CardPreview.vue";
import MobileCardViewer from "./components/MobileCardViewer.vue";
import CardViewer from "./components/CardViewer.vue";

const cards = ref<Card[]>(linkedCards);

export default defineComponent({
  name: "Cards",
  components: { CardViewer, CardPreview, MobileCardViewer },
  data() {
    return {
      readCard: false,
      activeTab: TABS[0].name,
      tabList: TABS,
      cards: ref(cards),
      card: {
        id: 0,
        name: "",
        validThru: "",
        number: "",
        cvv: 0,
        isFreezed: false,
      },
      eventBindings: {
        // @ts-ignore:next-line
        [actions.FREEZE_CARD]: this.toggleFreezeCard,
        // @ts-ignore:next-line
        [actions.CANCEL_CARD]: this.cancelCard,
      },
    };
  },
  mounted() {
    this.reloadCardForm();
  },
  methods: {
    reloadCardForm() {
      this.card = {
        id: Date.now(),
        name: "",
        validThru: "04/2022",
        number: `${Math.floor(Math.random() * 10000000000000000)}`,
        cvv: 123,
        isFreezed: false,
      };
    },
    addCard() {
      this.cards.push(this.card);
      this.readCard = false;
      this.reloadCardForm();
    },
    toggleFreezeCard(cardId: number) {
      const currentCardIndex: number = this.cards.findIndex(
        ({ id }) => id === cardId
      );
      const isFreezed = this.cards[currentCardIndex].isFreezed;

      this.$set(this.cards, currentCardIndex, {
        ...this.cards[currentCardIndex],
        isFreezed: !isFreezed,
      });
    },
    cancelCard(cardId: number) {
      this.cards = [...this.cards.filter(({ id }) => id !== cardId)];
    },
  },
});
</script>

<style scoped>
.mobile-container {
  background: #0c365a;
  margin-top: -1rem;
  height: 92vh;
}
.balance-label {
  background: #01d167;
  margin-top: 2px;
  padding: 4px 12px;
  border-radius: 4px;
}
</style>
