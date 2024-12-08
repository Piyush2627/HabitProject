import { create } from "zustand";

type counterStore = {
  counter: number;
  increment: () => void;
  decrement?: () => void;
};

export const useCounter = create<counterStore>((set) => ({
  counter: 0,
  increment: () => {
    set((state) => ({ counter: state.counter + 1 }));
  },
  decrement: () => {
    set((state) => ({ counter: state.counter - 1 }));
  },
}));
0;
