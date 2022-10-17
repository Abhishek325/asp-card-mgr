<template>
  <div>
    <q-list
      bordered
      class="rounded-borders q-mt-lg q-mb-md transaction-container"
    >
      <q-expansion-item
        expand-icon="keyboard_arrow_right"
        expanded-icon="keyboard_arrow_up"
        label="Card details"
        header-style="background:#F5F9FF;"
      >
        <template v-slot:header="{ expanded }">
          <q-item-section avatar>
            <q-avatar>
              <img
                class="expand-item-img"
                :alt="`Item expanded ${expanded}`"
                :src="
                  require('../../../assets/icons/Transactions/card-details.svg')
                "
              />
            </q-avatar>
          </q-item-section>
          <q-item-section> Card Details </q-item-section>
        </template>
      </q-expansion-item>
    </q-list>
    <q-list bordered class="rounded-borders transaction-container">
      <q-expansion-item
        default-opened
        expand-icon="keyboard_arrow_right"
        expanded-icon="keyboard_arrow_up"
        label="Card details"
        header-class="rounded-borders"
        header-style="background:#F5F9FF"
      >
        <template v-slot:header="{ expanded }">
          <q-item-section avatar>
            <q-avatar>
              <img
                class="expand-item-img"
                :alt="`Item expanded ${expanded}`"
                :src="
                  require('../../../assets/icons/Transactions/recent-transactions.svg')
                "
              />
            </q-avatar>
          </q-item-section>
          <q-item-section> Recent Transactions </q-item-section>
        </template>
        <q-card>
          <q-card-section class="q-pa-none">
            <q-list>
              <q-item
                v-for="transaction in recentTransactions"
                :key="transaction.id"
                class="q-pa-md recent-transaction-list-item non-selectable"
                bordered
                separator
                clickable
                v-ripple
              >
                <q-item-section avatar style="margin-top: -2rem">
                  <q-avatar :style="{ background: transaction.bgColor }">
                    <img
                      class="transaction-img"
                      :src="
                        require(`../../../assets/icons/Transactions/${transaction.image}.svg`)
                      "
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ transaction.name }}</q-item-label>
                  <q-item-label caption lines="1">{{
                    transaction.date
                  }}</q-item-label>
                  <q-item-label>
                    <span
                      class="text-blue-10 text-bold"
                      style="font-size: 12px"
                    >
                      <span class="transaction-log q-mr-sm bg-blue-10">
                        <img
                          style="margin-top: 1rem"
                          :src="
                            require('../../../assets/icons/Transactions/business-and-finance.svg')
                          "
                          alt=""
                        />
                      </span>
                      {{
                        transaction.type === "credit"
                          ? "Refund on"
                          : "Charged to"
                      }}
                      debit card
                    </span>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <span class="text-bold" :class="transaction.type"
                    >{{ transaction.amount }}
                    <q-icon
                      class="text-grey-5"
                      name="keyboard_arrow_right"
                    ></q-icon>
                  </span>
                </q-item-section>
              </q-item>
              <div
                class="q-pa-md view-all non-selectable text-bold text-center"
              >
                View all card transactions
              </div>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { RECENT_TRANSACTIONS } from "../constants";
import { RecentTransaction } from "./models";

export default defineComponent({
  name: "RecentTransactions",
  setup() {
    const recentTransactions = ref<RecentTransaction[]>(RECENT_TRANSACTIONS);
    return {
      recentTransactions,
    };
  },
});
</script>

<style scoped>
.transaction-img {
  width: 16px !important;
  height: 15px !important;
}
.credit {
  font-size: 14px;
  color: #01d167;
}
.recent-transaction-list-item:not(:first-of-type) {
  border-top: 1px solid #efefef;
}
.transaction-log {
  width: 20px;
  border-radius: 20px;
  padding: 2px 8px;
}
.view-all {
  color: #01d167;
  background: #edfff5;
  border: 1px solid #ddffec;
  border-radius: 4px;
}
</style>
