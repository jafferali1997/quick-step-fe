/* eslint-disable react/jsx-filename-extension */

'use client';

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import handleDownloadCsv from '@/common/utils/document-file-download/download-csv';
import handleDownloadPdf from '@/common/utils/document-file-download/download-pdf';
import handleDownloadTxt from '@/common/utils/document-file-download/download-txt';
import handleDownloadExcel from '@/common/utils/document-file-download/download-xls';
import handleDownloadXml from '@/common/utils/document-file-download/download-xml';
import handleDownloadPdfAsZip from '@/common/utils/document-file-download/download-zip';
import { getAllInvoice } from '@/provider/features/invoice/invoice.slice';
import DraftContent from './components/draft/draft.component';
import OverviewContent from './components/overview/overview.comopnent';
import RejectedContent from './components/rejected/rejected.component';
import TemplateContent from './components/templates/templates.component';

const customoptions = [
  { value: 'open', label: 'Open' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'invoiced', label: 'Invoiced' }
];

export default function useViewInvoice(handleTabClick, handleTabCompleted) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [ids, setIds] = useState([]);
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openZIPPopup, setZIPOpenPopup] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectValue, setSelectValue] = useState(customoptions[0].value);
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedId, setSelectedId] = useState('');
  const [openInvoice, setOpen] = useState('');
  const [invoiced, setInvoiced] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [profit, setProfit] = useState('');
  const open = Boolean(anchorEl);
  const [diffrenciator, setDiffrenciator] = useState(false);

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

  const dropdownOptions = [
    {
      id: 1,
      name: 'Download PDF',
      onClick: () => {
        setOpenPopup(true);
        setDiffrenciator(true);
      }
    },
    {
      id: 2,
      name: 'Download ZIP File',
      onClick: () => {
        setOpenPopup(true);
        setZIPOpenPopup('zip');
      }
    },
    {
      id: 3,
      name: 'Download XML File',
      onClick: () => {
        handleDownloadXml({
          data,
          module: 'invoice'
        });
      }
    },
    {
      id: 4,
      name: 'Download CSV File',
      onClick: () => {
        handleDownloadCsv({
          data,
          module: 'invoice'
        });
      }
    },
    {
      id: 5,
      name: 'Download TXT File',
      onClick: () => {
        handleDownloadTxt({
          data,
          module: 'invoice'
        });
      }
    },
    {
      id: 6,
      name: 'Download .xls File',
      onClick: () => {
        handleDownloadExcel({
          data,
          module: 'invoice'
        });
      }
    }
  ];

  const handleData = async (invoice) => {
    const response = await dispatch(
      getAllInvoice({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: { id: { $in: invoice } }
        }
      })
    );

    response.payload?.data ? setData(response.payload?.data) : setData([]);
  };

  const handleGetAllData = (data) => {
    setOpen(data.open);
    setInvoiced(data.invoiced);
    setExpenditure(data.invoiced);
    setProfit(data.profit);
  };

  const tabs = [
    {
      id: 'tab1',
      label: 'Overview',
      content: <OverviewContent action={handleData} allData={handleGetAllData} />
    },
    {
      id: 'tab2',
      label: 'Draft',
      content: <DraftContent action={handleData} allData={handleGetAllData} />
    },
    {
      id: 'tab3',
      label: 'Cancelled',
      content: <RejectedContent action={handleData} allData={handleGetAllData} />
    },
    {
      id: 'tab4',
      label: 'Template',
      content: <TemplateContent />
    }
  ];

  const offers = [
    {
      id: 1,
      status: 'Open',
      value: `€${openInvoice || 0}`,
      icon: '/assets/images/offers/open.svg'
    },
    {
      id: 2,
      status: 'Invoiced',
      value: `€${invoiced || 0}`,
      icon: '/assets/images/offers/invoiced.svg '
    },
    {
      id: 3,
      status: 'Expenditure',
      value: `€${expenditure || 0}`,
      icon: '/assets/images/offers/expenditure.svg '
    },
    {
      id: 4,
      status: 'Profit',
      value: `€${profit || 0}`,
      icon: '/assets/images/offers/profit.svg'
    }
  ];

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

  const handleChange = (id, value) => {
    setSelectedValues({ ...selectedValues, [id]: value });
  };

  const getOptionClassName = (id, optionValue) => {
    let className = 'status_dropdown !tw-w-fit !tw-px-0';
    if (optionValue === 'accepted') {
      className += ' accepted';
    } else if (optionValue === 'rejected') {
      className += ' rejected';
    } else if (optionValue === 'invoiced') {
      className += ' invoiced';
    } else {
      className += ' open';
    }
    if (selectedValues[id] === optionValue) {
      className += ` ${selectedValue}`;
    }
    return className;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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

  const handleDownloadBlankPdfFile = () => {
    openZIPPopup === 'zip'
      ? handleDownloadPdfAsZip({
          canvasElement: 'canvas-element-blank',
          data,
          module: 'invoice',
          setOpenPopup,
          setZIPOpenPopup
        })
      : handleDownloadPdf({
          canvasElement: 'canvas-element-blank',
          data,
          module: 'invoice',
          setOpenPopup,
          setZIPOpenPopup
        });
  };

  const handleDownloadPdfFile = () => {
    openZIPPopup === 'zip'
      ? handleDownloadPdfAsZip({
          canvasElement: 'canvas-element',
          data,
          module: 'invoice',
          setOpenPopup,
          setZIPOpenPopup
        })
      : handleDownloadPdf({
          canvasElement: 'canvas-element',
          data,
          module: 'invoice',
          setOpenPopup,
          setZIPOpenPopup
        });
  };

  const handleClose = () => {
    setOpenPopup(false);
    setZIPOpenPopup('');
    setDiffrenciator(true);
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
    handleChange,
    handleSelectChange,
    selectedId,
    handleTabsFilter,
    selectedValue,
    getOptionClassName,
    selectValue,
    selectedValues,
    tabs,
    offers,
    dropdownOptions,
    handleDownloadBlankPdfFile,
    handleDownloadPdfFile,
    openZIPPopup,
    handleClose
  };
}

useViewInvoice.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
