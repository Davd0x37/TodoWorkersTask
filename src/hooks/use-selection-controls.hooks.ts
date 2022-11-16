import { useCallback, useState } from 'react';

type itemID = number;

export const useSelectionControls = () => {
  const [selectedItems, setSelectedItems] = useState<itemID[]>([]);

  const setItems = (idsList: number[]) => {
    setSelectedItems(idsList);
  };

  const addSelection = useCallback(
    (id: itemID) => {
      if (selectedItems.find((sID) => id === sID) === undefined) {
        setSelectedItems([...selectedItems, id]);
      }
    },
    [selectedItems]
  );

  const removeSelection = useCallback(
    (id: itemID) => {
      const newList = selectedItems.filter((sID) => sID !== id);
      setSelectedItems(newList);
    },
    [selectedItems]
  );

  const clearSelections = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const isSelected = useCallback((selectedId: number) => selectedItems.some((id) => id == selectedId), [selectedItems]);

  return {
    selectedItems,
    setItems,
    addSelection,
    removeSelection,
    isSelected,
    clearSelections,
  };
};
