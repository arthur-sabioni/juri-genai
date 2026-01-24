import { useJurimetry } from '../../context/JurimetryHooks';
import { CustomizationColumn } from '../../context/JurimetryContext';
import { v4 as uuidv4 } from 'uuid';

export function useCustomizationWorkflow() {
  const { 
    processDescription, 
    setProcessDescription, 
    columns, 
    setColumns 
  } = useJurimetry();

  const handleAddColumn = () => {
    setColumns([
      ...columns,
      { id: uuidv4(), title: "", description: "", hasTaxonomy: false }
    ]);
  };

  const handleRemoveColumn = (id: string) => {
    if (columns.length > 1) {
      setColumns(columns.filter(col => col.id !== id));
    }
  };

  const updateColumn = (id: string, field: keyof CustomizationColumn, value: string | boolean) => {
    setColumns(columns.map(col => {
      if (col.id === id) {
        return { ...col, [field]: value };
      }
      return col;
    }));
  };

  return {
    processDescription,
    setProcessDescription,
    columns,
    handleAddColumn,
    handleRemoveColumn,
    updateColumn
  };
}
