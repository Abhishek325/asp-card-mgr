export interface Card {
  id: number;
  name: string;
  number: string;
  validThru: string;
  cvv: number;
  isFreezed: boolean;
}

export interface RecentTransaction {
  id: number;
  name: string;
  date: string;
  image: string;
  amount: string;
  type: string;
  bgColor: string;
}
