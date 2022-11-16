import { createContext, useContext, PropsWithChildren } from 'react';

import { useSelectionControls } from '@/hooks/use-selection-controls.hooks';

interface SelectionFunctions {
  selectedItems: number[];
  clearSelections: () => void;
  isSelected: (linkId: number) => boolean;
  setItems: (idsList: number[]) => void;
  addSelection: (id: number) => void;
  removeSelection: (id: number) => void;
}

const SelectionContext = createContext<SelectionFunctions | null>(null);

export function SelectionProvider({ children }: PropsWithChildren) {
  const selectionFunction = useSelectionControls();

  return <SelectionContext.Provider value={selectionFunction}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const state = useContext(SelectionContext);
  if (!state) {
    return null;
  }
  return state;
}
