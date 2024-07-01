import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type StoreState = {
  user: User | null;
  setUser: (userObj: User | null) => void;
};
// type Action = {
// };

export const useAppStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (userObj: User | null) =>
        set({
          user: userObj,
        }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
