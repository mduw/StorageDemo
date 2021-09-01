import produce from "immer";
import create from "zustand";

const useMyStorageManager = create((set, get) => ({
  quota: {
    total: 0,
    usage: 0,
  },
  updateQuota: (NewQuota) =>
    set((state) => (state.quota = {...state.quota, ...NewQuota})),
}));

export default useMyStorageManager;
