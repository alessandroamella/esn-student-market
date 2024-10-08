import { create } from 'zustand';

export type AppDialogs = 'login';

interface DialogState {
  curDialog: AppDialogs | null;
  openDialog: (dialog: AppDialogs) => void;
  closeDialog: () => void;
}

const useDialog = create<DialogState>((set) => ({
  curDialog: null,
  openDialog: (dialog) => set({ curDialog: dialog }),
  closeDialog: () => set({ curDialog: null }),
}));

export default useDialog;
