import { create } from "zustand";

type StateStore = {
  user: User | null;
  setUser: (userObj: User) => void;
  afterLogin: string;
  setAfterLogin: (s: string) => void;
};
export const useAppStore = create<StateStore>((set) => ({
  user: null,

  setUser: (userObj: User) => {
    set({ user: userObj });
  },
  afterLogin: "",
  setAfterLogin: (s: string) => {
    set({ afterLogin: s });
  },
}));
