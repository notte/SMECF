import { defineStore } from "pinia";

export const statusStore = defineStore("id", {
  state: () => {
    return {
      mode: "Light",
    };
  },
  getters: {
    Count: (state) => state.mode,
  },
  actions: {
    increment(mode: string) {
      this.mode = mode;
    },
  },
});
