import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// type State = {
//   user: User | null;
// };
// type Action = {
//   setUser: (userObj: State["user"]) => void;
// };

type StoreState = {
  user: User | null;
  setUser: (userObj: User | null) => void;
};
export const useAppStore = create(
  persist(
    (set, get) => ({
      user: null,

      setUser: (userObj: User) =>
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
