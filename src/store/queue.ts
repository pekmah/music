import { create } from "zustand";

type QueueStore = {
  activateQueueId: string | null;
  setActiveQueueId: (id: string) => void;
};

export const useQueueStore = create<QueueStore>((set) => ({
  activateQueueId: null,
  setActiveQueueId: (id) => set({ activateQueueId: id }),
}));

export const useQueue = () => useQueueStore((state) => state);
