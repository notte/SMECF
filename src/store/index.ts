import { defineStore } from "pinia";

export const statusStore = defineStore("id", {
  state: () => {
    return {
      mode: "light",
      listPopup: undefined,
    };
  },
  getters: {
    getMode: (state) => state.mode,
    getListPopup: (state) => state.listPopup,
  },
  actions: {
    increment(mode: string) {
      this.mode = mode;
    },
    setList(listPopup: any) {
      this.listPopup = listPopup;
    },
  },
});
