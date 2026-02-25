import { create } from "zustand";
import type { EEGFrame } from "../types";

type EEGState = {
    frames: EEGFrame[];
    latest?: EEGFrame;
    push: (f: EEGFrame)=>void;
    reset: ()=>void;
};

export const useEEGStore = create<EEGState>((set) => ({
    frames: [],
    push: (f) => set((s)=>({ frames: s.frames.length>500 ? [...s.frames.slice(-400), f] : [...s.frames, f], latest: f })),
    reset: ()=> set({ frames: [], latest: undefined })
}));
