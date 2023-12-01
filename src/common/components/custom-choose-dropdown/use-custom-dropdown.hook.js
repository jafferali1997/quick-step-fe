import { useState } from 'react';

function useCustomDropdown() {
  const [open, setOpen] = useState('');

  const handleCreateItem = () => {
    setOpen(true);
  };

  return { open, setOpen, handleCreateItem };
}

export default useCustomDropdown;
