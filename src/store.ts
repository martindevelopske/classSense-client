import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type StoreState = {
  user: LoginResponse | null;
  setUser: (userObj: LoginResponse | null) => void;
};
// type Action = {
// };

export const useAppStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (userObj: LoginResponse | null) =>
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
