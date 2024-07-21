import { Order } from "@/types";

export const getSortedUniqueOrderBookList = (orderList: Order[], newEvent: Order[], order: 'asc' | 'desc') => {
  if (!orderList) return [];
  if (!newEvent) return orderList;

  return [...new Map([...orderList, ...newEvent])].filter((order) => Number(order[0]) && Number(order[1])).sort((a, b) => order === 'asc' ? Number(a[0]) - Number(b[0]) : Number(b[0]) - Number(a[0])); // remove qty 0
}
