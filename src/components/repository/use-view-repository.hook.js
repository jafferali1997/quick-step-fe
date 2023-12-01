/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useRef, useState } from 'react';

export default function useViewRepository() {
  const [openFolderAction, setopenFolderAction] = useState(false);
  const [openFileAction, setopenFileAction] = useState(false);
  const [openDeleteAction, setopenDeleteAction] = useState(false);
  // folder state
  const [folders, setFolders] = useState([{ name: 'Desk', children: [] }]);
  const [newFolderName, setNewFolderName] = useState('');

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // refs
  const openFolderRef = useRef();
  const openFileRef = useRef();
  const openDeleteRef = useRef();

  // folder functions
  const handleAddFolder = (parentFolder) => {
    if (newFolderName.trim().length === 0) {
      return;
    }

    const newFolder = {
      name: newFolderName,
      children: []
    };

    const updatedFolders = folders.map((folder) => {
      if (folder === parentFolder) {
        return {
          ...folder,
          children: [...folder.children, newFolder]
        };
      }

      return folder;
    });

    setFolders(updatedFolders);
    setNewFolderName('');
  };
  const renderFolder = (folder) => {
    return (
      <div key={folder.name}>
        <div>{folder.name}</div>
        <div>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button onClick={() => handleAddFolder(folder)}>Add Folder</button>
        </div>
        {folder.children.map((child) => renderFolder(child))}
      </div>
    );
  };

  // pagination

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = [].slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(15 / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  const getPageRangeText = () => {
    const firstItemIndex = (currentPage - 1) * itemsPerPage + 1;
    const lastItemIndex = Math.min(currentPage * itemsPerPage, 15);
    // return `${firstItemIndex} - ${lastItemIndex} of ${tableData.length} entries`;
    return (
      <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-ultra-light-gray">
        <span className="tw-pr-1 tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
          entries
        </span>
        <span className="tw-text-text-dark-gray">{firstItemIndex} </span> to{' '}
        {lastItemIndex} of {15} entries
      </div>
    );
  };

  return {
    openFolderAction,
    setopenFolderAction,
    openFolderRef,
    openFileAction,
    setopenFileAction,
    openFileRef,
    openDeleteAction,
    setopenDeleteAction,
    openDeleteRef,
    folders,
    setFolders,
    newFolderName,
    setNewFolderName,
    handleAddFolder,
    renderFolder,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    handleItemsPerPageChange,
    indexOfLastItem,
    indexOfFirstItem,
    currentItems,
    totalPages,
    pageNumbers,
    getPageRangeText
  };
}
