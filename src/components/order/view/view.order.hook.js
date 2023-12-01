'use client';

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export default function useViewOffer({ handleTabClick, handleTabCompleted }) {
  const ref = useRef(null);
  const [ids, setIds] = useState([]);
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleSelectChange = (e, { value }, id) => {
    if (value === 'accepted') {
      setSelectedValue('tw-bg-[#F1FFB9] tw-text-[#A58825]');
      setSelectedId(id);
    } else if (value === 'rejected') {
      setSelectedValue('tw-bg-[#FFE8E8] tw-text-[#A60A0A]');
      setSelectedId(id);
    } else if (value === 'invoice') {
      setSelectedValue('tw-bg-[#DCFFDE] tw-text-[#0DA60A]');
      setSelectedId(id);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabsFilter = ({ label }) => {
    const selectedFilter = data.filter((rowData) => rowData.status);
    const filteredTabData = selectedFilter.filter((data) => {
      return data.label;
    });
  };

  const handleDuplicate = (index) => {
    const newRow = { ...data[index], id: data.length };
    setData([...data.slice(0, index + 1), newRow, ...data.slice(index + 1)]);
  };

  const handleRemove = (index) => {
    setData(data.filter((row, i) => i !== index));
  };

  const handleActionClick = (row) => {
    if (selectedRow && selectedRow.id === row.id) {
      setSelectedRow((prevRow) => ({
        ...prevRow,
        name: inputValue
      }));
      setInputValue('');
      setSelectedRow(null);
    } else {
      setSelectedRow(row);
      setInputValue(row.name);
    }
  };

  const handleSaveClick = () => {
    setSelectedRow((prevRow) => ({
      ...prevRow,
      name: inputValue
    }));

    setInputValue('');
    setSelectedRow(null);
  };

  const handleInputChangee = (event) => {
    setInputValue(event.target.value);
  };

  const handleClik = () => {
    handleTabClick('HeaderBody');
    handleTabCompleted('customer_details');
  };

  const columns = [
    {
      field: 'offer',
      headerName: 'Offer #'
    },
    { field: 'company', headerName: 'Company' },
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'address', headerName: 'Address' },
    { field: 'country', headerName: 'Country' },
    { field: 'created', headerName: 'Created At' },
    { field: 'status', headerName: 'Status' },
    { field: 'data', headerName: 'Add Data' },
    { field: 'action', headerName: 'Action' }
  ];

  const handleSortClick = (field) => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    sortData(field, sortDirection);
  };

  const sortData = (field, direction) => {
    const sortedRows = [...data].sort((a, b) => {
      if (direction === 'asc') {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });

    setData(sortedRows);
  };

  const isIdAdded = (id) => {
    return ids.includes(JSON.parse(id));
  };

  const checkBoxHandler = (e) => {
    setIsChecked(e.target.value);
    const id = JSON.parse(e.target.value);
    let stateIds = ids;
    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setIds([...stateIds]);
  };

  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      const ids = data?.map((data, index) => index);
      setIds([...ids]);
    } else {
      setIds([]);
    }
  };

  return {
    isChecked,
    isSubmit,
    setIsSubmit,
    handleClik,
    columns,
    data,
    ids,
    isIdAdded,
    allCheckboxHandler,
    checkBoxHandler,
    openPopup,
    setOpenPopup,
    ref,
    handleActionClick,
    handleSaveClick,
    handleInputChangee,
    inputValue,
    selectedRow,
    sortDirection,
    setSortDirection,
    handleSortClick,
    handleDuplicate,
    handleRemove,
    anchorEl,
    handleClick,
    open,
    handleClose,
    handleSelectChange,
    selectedValue,
    selectedId,
    handleTabsFilter
  };
}

useViewOffer.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
