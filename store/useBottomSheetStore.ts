// store/useBottomSheetStore.ts
import { create } from 'zustand';
import { SheetName, SheetPayloads } from '@/types/bottomSheet';

interface SheetState {
  currentSheet: SheetName;
  payload: any;
  isVisible: boolean;
  openSheet: <T extends keyof SheetPayloads>(
    name: T, 
    payload: SheetPayloads[T]
  ) => void;
  closeSheet: () => void;
}

export const useBottomSheetStore = create<SheetState>((set) => ({
  currentSheet: null,
  payload: null,
  isVisible: false,
  
  openSheet: (name, payload) => 
    set({ 
      currentSheet: name, 
      payload, 
      isVisible: true 
    }),
    
  closeSheet: () => 
    set({ 
      currentSheet: null, 
      payload: null, 
      isVisible: false 
    }),
}));
