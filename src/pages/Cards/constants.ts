export const actions = {
  FREEZE_CARD: "Freeze/Unfreeze card",
  SET_SPEND_LIMIT: "Set spend limit",
  ADD_TO_GPAY: "Add to GPay",
  REPLACE_CARD: "Replace card",
  CANCEL_CARD: "Cancel card",
};

export const linkedCards = [
  {
    id: 1,
    name: "Mark Henry",
    number: "4024007186710520",
    validThru: "06/2023",
    cvv: 897,
    isFreezed: false,
  },
  {
    id: 2,
    name: "Sandra Marcus",
    number: "4916218347041710",
    validThru: "01/2026",
    cvv: 322,
    isFreezed: false,
  },
];

export const TABS = [
  { name: "MY_DEBIT_CARDS", label: "My Debit Cards" },
  { name: "ALL_COMPANY_CARDS", label: "All company Cards" },
];

export const RECENT_TRANSACTIONS = [
  {
    id: 1,
    name: "Hamleys",
    date: "20 May 2020",
    image: "file-storage",
    amount: "+ S$ 150",
    type: "credit",
    bgColor: "#e5f5ff",
  },
  {
    id: 2,
    name: "Hamleys",
    date: "20 May 2020",
    image: "flights",
    amount: "- S$ 150",
    type: "debit",
    bgColor: "#e5fbf7",
  },
  {
    id: 3,
    name: "Hamleys",
    date: "20 May 2020",
    image: "megaphone",
    amount: "- S$ 150",
    type: "debit",
    bgColor: "#feedf4",
  },
  {
    id: 4,
    name: "Hamleys",
    date: "20 May 2020",
    image: "file-storage",
    amount: "- S$ 150",
    type: "debit",
    bgColor: "#e5f5ff",
  },
];
