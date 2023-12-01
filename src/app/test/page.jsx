/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react-native/no-inline-styles */
'use client';

/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PencilIcon from '@/common/icons/pencil.icon';
import useClickOutside from '@/common/hooks/use-click-outside';
import CustomSelect from '@/common/components/custom-select/custom-select.component';

export default function page() {
  const data1 = [
    { id: 1, name: 'John', age: 20 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 4, name: 'Different Object 1', different: true, age: null },
    { id: 5, name: 'Different Object 2', age: null },
    { id: 3, name: 'Jack', age: 30 },
    { id: 6, name: 'Different Object 3', different: true, age: null },
    { id: 7, name: 'Jack', age: 30 }
  ];

  const differentObjects = data1.filter((item) => item.different === true);

  // drag table with column

  // select single row and all selected rows
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectedRows.length === tableData.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows]);

  // colaps row

  const [addButtonsClicked, setAddButtonsClicked] = useState({});

  const initialColumns = [
    { id: '1', name: 'Name' },
    { id: '2', name: 'Age' },
    { id: '3', name: 'Country' }
  ];

  const initialTableData = [
    { id: 1, name: 'John', age: 25, country: 'USA' },
    { id: 2, name: 'Alice', age: 30, country: 'Canada' },
    { id: 3, name: 'Bob', age: 20, country: 'UK' },
    { id: 4, name: 'Charlie', age: 35, country: 'USA' },
    { id: 5, name: 'David', age: 28, country: 'Canada' },
    { id: 6, name: 'Eve', age: 22, country: 'UK' },
    { id: 7, name: 'Frank', age: 40, country: 'USA' },
    { id: 8, name: 'Grace', age: 32, country: 'Canada' },
    { id: 9, name: 'Henry', age: 26, country: 'UK' }
  ];
  const [columns, setColumns] = useState(initialColumns);
  const [tableData, setTableData] = useState(initialTableData);

  // sort columns
  const [sortOrder, setSortOrder] = useState({ column: 'name', ascending: true });

  const handleSort = (column) => {
    const newAscending = sortOrder.column === column ? !sortOrder.ascending : true;
    const newTableData = [...tableData].sort((a, b) => {
      const result = a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0; // compare values
      return sortOrder.ascending ? result : -result; // invert result if descending
    });
    setTableData(newTableData);
    setSortOrder({ column, ascending: newAscending });
  };

  // drag drop
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newColumns = Array.from(columns);
    const [removed] = newColumns.splice(result.source.index, 1);
    newColumns.splice(result.destination.index, 0, removed);

    const newTableData = tableData.map((row) => {
      const newRow = {};
      newColumns.forEach((column) => {
        newRow[column.name.toLowerCase()] = row[column.name.toLowerCase()];
      });
      return newRow;
    });

    setColumns(newColumns);
    setTableData(newTableData);
  };
  // actions
  const actions = [
    {
      label: 'Edit',
      icon: <PencilIcon />,
      onClick: (row) => {
        console.log(`Editing row ${row.id}`);
      }
    }
  ];
  const [activeRow, setActiveRow] = useState(false);
  const ref = useRef(null);

  // const handleRowClick = (rowId) => {
  //   setActiveRow(rowId === activeRow ? null : rowId);
  // };

  const handleActionClick = (action, rowData) => {
    action.onClick(rowData);
    setActiveRow(null);
  };
  useClickOutside([ref], [setActiveRow]);

  // status
  const offerStatusOptions = [
    { value: 'DRAFT', label: 'Draft' },
    { value: 'OPEN', label: 'Open' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'REJECTED', label: 'Rejected' },
    { value: 'INVOICED', label: 'Invoiced' }
  ];
  const [selectedValues, setSelectedValues] = useState({});

  const handleChange = (id, value) => {
    setSelectedValues({ ...selectedValues, [id]: value });
  };
  const getOptionClassName = (statusValue, id) => {
    let className = 'status_dropdown !tw-w-fit !tw-px-0 !tw-min-w-[130px] ';
    if (selectedValues[id]) {
      className += selectedValues[id].toLowerCase();
    } else {
      className += statusValue?.toLowerCase();
    }
    return className;
  };
  // paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  const getPageRangeText = () => {
    const firstItemIndex = (currentPage - 1) * itemsPerPage + 1;
    const lastItemIndex = Math.min(currentPage * itemsPerPage, tableData.length);
    // return `${firstItemIndex} - ${lastItemIndex} of ${tableData.length} entries`;
    return (
      <div className="tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-ultra-light-gray">
        <span className="tw-pr-1 tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
          entries
        </span>
        <span className="tw-text-text-dark-gray">{firstItemIndex} </span> to{' '}
        {lastItemIndex} of {tableData.length} entries
      </div>
    );
  };

  // random object
  // const templateObject = {
  //   id: 2,
  //   invoices: 334,
  //   firstName: 'ali',
  //   lastName: 'design',
  //   companyName: 'teer ABC',
  //   address: 'teer ABC ',
  //   country: 'USA',
  //   createdAt: '12-01-2023',
  //   status: 'Open'
  // };

  // const dataArray = Array.from({ length: 5 }, (_, index) => ({
  //   ...templateObject,
  //   id: index + 1,
  //   invoices: 334 + index + 1,
  //   firstName: `First name ${index + 1}`,
  //   lastName: `Last name ${index + 1}`,
  //   companyName: `Company ${index + 1}`,
  //   address: `teer ABC ${index + 1}`,
  //   country: `USA ${index + 1}`,
  //   createdAt: `0${Math.floor(Math.random() * 9) + 1}-01-2023`,
  //   status: Math.random() < 0.5 ? 'Open' : 'Paid'
  // }));

  // const keys = Object.keys(templateObject);

  // console.log({ dataArray });
  // console.log(keys);

  ///// tag input

  const [email, setEmail] = useState('');
  const [taggedEmails, setTaggedEmails] = useState([]);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setInvalidEmail(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    const trimmedEmail = email.trim();

    if (trimmedEmail) {
      if (trimmedEmail.slice(-1) === ',') {
        setInvalidEmail(true);
        return;
      }

      setTaggedEmails([...taggedEmails, trimmedEmail]);
      setEmail('');
    }
  };

  const removeEmail = (index) => {
    const updatedEmails = [...taggedEmails];
    updatedEmails.splice(index, 1);
    setTaggedEmails(updatedEmails);
  };

  const data = [
    {
      id: 76,
      createdBy: 3,
      updatedBy: 3,
      createdAt: '2023-08-08T11:54:08.911Z',
      updatedAt: '2023-08-09T13:53:22.451Z',
      cashDiscount: '33',
      cashDiscountValidity: '2023-08-11',
      paymentAmount: '200',
      dueDate: '2023-08-18',
      receiptDate: '2023-08-08',
      description: 'qwerty',
      taxRate: '19:00',
      status: 'PAID',
      bankAccount: '123456789076543',
      vatNumber: 'vc1234567',
      originalExpenditureId: null,
      isLatest: false,
      customerId: 213,
      expenditureCategoryId: null,
      productCategoryId: 118,
      businessDetailId: 1,
      customer: {
        id: 213,
        createdBy: 3,
        updatedBy: null,
        createdAt: '2023-08-01T11:13:35.647Z',
        updatedAt: '2023-08-01T11:16:33.775Z',
        accountOwnerName: 'Haider',
        iban: 'UNILD78728228298',
        paymentDetailType: 'BANK',
        city: 'alto de jesús',
        country: 'panama-PA',
        address: 'Lahore City',
        postalCode: '78998',
        firstName: 'Isra',
        lastName: 'Aslam',
        bic: '89898989',
        mendateReferance: '121212',
        mandateGenerateDate: '2023-08-22T00:00:00.000Z',
        gender: 'MALE',
        designation: 'QA',
        nameOfCreditCard: null,
        creditCardNumber: null,
        creditCardExpiry: null,
        creditCardCVV: null,
        companyName: 'Zee Frames',
        companyEmail: 'isra@yopmail.com',
        companyPhone: '909090909090',
        companyFax: '909090909090',
        companyMobile: '909090909090',
        companyUrl: 'www.test.com',
        companySize: 'above 100',
        tin: '9090909090',
        vat: 'DE909090999',
        vatStatus: true,
        isStatus: true,
        isActive: true,
        isPDF: true,
        isDraft: false,
        discountAmount: 2121,
        discountDays: 2,
        termOfPayment: 'PAYMENT_TERMS_AS_DATE',
        termOfPaymentData: '2023-08-04',
        businessDetailId: 1
      },
      CategoryId: {
        id: 118,
        createdBy: 3,
        updatedBy: null,
        createdAt: '2023-06-18T17:14:49.215Z',
        updatedAt: '2023-06-18T17:14:49.215Z',
        categoryLevel: 3,
        parentCategoryId: 116,
        categoryName: 'Milky Breadddd',
        hasChildren: false,
        businessDetailId: 1
      },
      partialPayments: [
        {
          id: 74,
          createdBy: null,
          updatedBy: null,
          createdAt: '2023-08-08T12:08:09.233Z',
          updatedAt: '2023-08-08T12:08:09.233Z',
          partialPayment: '134',
          receiptDate: '2023-08-08',
          comment: '',
          balance: 0,
          expenditureId: 76
        }
      ]
    },
    {
      id: 82,
      createdBy: 3,
      updatedBy: null,
      createdAt: '2023-08-11T11:01:18.162Z',
      updatedAt: '2023-08-11T11:01:57.482Z',
      cashDiscount: '22',
      cashDiscountValidity: '2023-08-30',
      paymentAmount: '300',
      dueDate: '2023-08-31',
      receiptDate: '2023-08-11',
      description: 'sdfghj',
      taxRate: '19:00',
      status: 'OPEN',
      bankAccount: '12345678933',
      vatNumber: 'vc1234567',
      originalExpenditureId: null,
      isLatest: false,
      customerId: 214,
      expenditureCategoryId: null,
      productCategoryId: 159,
      businessDetailId: 1,
      customer: {
        id: 214,
        createdBy: 3,
        updatedBy: null,
        createdAt: '2023-08-01T12:07:42.982Z',
        updatedAt: '2023-08-01T12:10:07.914Z',
        accountOwnerName: 'Haider',
        iban: 'UNILD78728228298',
        paymentDetailType: 'BANK',
        city: 'lahore',
        country: 'pakistan-PK',
        address: 'DHA Phase 4',
        postalCode: '54000',
        firstName: 'Sayam',
        lastName: 'Asjad',
        bic: '89898989',
        mendateReferance: '123123',
        mandateGenerateDate: '2023-08-11T00:00:00.000Z',
        gender: 'MALE',
        designation: 'Project Manager',
        nameOfCreditCard: null,
        creditCardNumber: null,
        creditCardExpiry: null,
        creditCardCVV: null,
        companyName: 'ZAPTA Tech',
        companyEmail: 'sayam@yopmail.com',
        companyPhone: '123123123123',
        companyFax: '123123123123',
        companyMobile: '123123123123',
        companyUrl: 'www.test.com',
        companySize: '40-100',
        tin: '1231231231',
        vat: 'ZE909090901',
        vatStatus: false,
        isStatus: true,
        isActive: true,
        isPDF: false,
        isDraft: false,
        discountAmount: 123,
        discountDays: 2,
        termOfPayment: 'PAYMENT_TERMS_AS_DATE',
        termOfPaymentData: '2023-08-10',
        businessDetailId: 1
      },
      CategoryId: {
        id: 159,
        createdBy: 3,
        updatedBy: null,
        createdAt: '2023-06-20T07:23:36.808Z',
        updatedAt: '2023-06-20T07:23:36.808Z',
        categoryLevel: 2,
        parentCategoryId: 110,
        categoryName: 'sdsdsd',
        hasChildren: false,
        businessDetailId: 1
      },
      partialPayments: []
    },
    {
      id: 85,
      createdBy: 3,
      updatedBy: 3,
      createdAt: '2023-08-11T12:30:34.598Z',
      updatedAt: '2023-08-15T09:11:55.855Z',
      cashDiscount: '33',
      cashDiscountValidity: '2023-08-31',
      paymentAmount: '600',
      dueDate: '2023-08-24',
      receiptDate: '2023-08-11',
      description: 'jdhfjdsfkdf',
      taxRate: '19:00',
      status: 'PAID',
      bankAccount: '12345678933',
      vatNumber: 'vc1234567',
      originalExpenditureId: null,
      isLatest: false,
      customerId: 140,
      expenditureCategoryId: null,
      productCategoryId: 110,
      businessDetailId: 1,
      customer: {
        id: 140,
        createdBy: 3,
        updatedBy: null,
        createdAt: '2023-07-12T10:24:43.184Z',
        updatedAt: '2023-07-12T10:26:33.242Z',
        accountOwnerName: 'zapta',
        iban: '111000222000333',
        paymentDetailType: 'BANK',
        city: 'al ain municipality',
        country: 'united arab emirates-AE',
        address: 'lahore',
        postalCode: '54000',
        firstName: 'Isra',
        lastName: 'Aslam',
        bic: '222220977',
        mendateReferance: '77777777',
        mandateGenerateDate: '2023-07-13T00:00:00.000Z',
        gender: 'FEMALE',
        designation: 'engineer',
        nameOfCreditCard: null,
        creditCardNumber: null,
        creditCardExpiry: null,
        creditCardCVV: null,
        companyName: 'zapta',
        companyEmail: 'israaslam123@gmail.com',
        companyPhone: '3333333',
        companyFax: '666666666666',
        companyMobile: '33333333',
        companyUrl: 'www.google.com',
        companySize: '40-100',
        tin: '3333333333',
        vat: 'DE123456789',
        vatStatus: false,
        isStatus: true,
        isActive: true,
        isPDF: false,
        isDraft: false,
        discountAmount: 77,
        discountDays: 77,
        termOfPayment: 'DISCOUNT_AND_PERCENTAGE',
        termOfPaymentData: '55',
        businessDetailId: 1
      },
      CategoryId: {
        id: 110,
        createdBy: 3,
        updatedBy: null,
        createdAt: '2023-06-18T17:11:28.193Z',
        updatedAt: '2023-06-20T07:23:36.812Z',
        categoryLevel: 1,
        parentCategoryId: null,
        categoryName: 'milky bread',
        hasChildren: true,
        businessDetailId: 1
      },
      partialPayments: [
        {
          id: 80,
          createdBy: null,
          updatedBy: null,
          createdAt: '2023-08-11T12:32:06.105Z',
          updatedAt: '2023-08-11T12:32:06.105Z',
          partialPayment: '100',
          receiptDate: '2023-08-11',
          comment: '',
          balance: 302,
          expenditureId: 85
        },
        {
          id: 81,
          createdBy: null,
          updatedBy: null,
          createdAt: '2023-08-11T12:32:30.709Z',
          updatedAt: '2023-08-11T12:32:30.709Z',
          partialPayment: '302',
          receiptDate: '2023-08-11',
          comment: '',
          balance: 0,
          expenditureId: 85
        }
      ]
    },
    {
      id: 88,
      createdBy: 3,
      updatedBy: null,
      createdAt: '2023-08-16T13:02:08.797Z',
      updatedAt: '2023-08-16T13:03:21.698Z',
      cashDiscount: '22',
      cashDiscountValidity: '2023-08-23',
      paymentAmount: '123',
      dueDate: '2023-08-17',
      receiptDate: '2023-08-16',
      description: 'qwerty',
      taxRate: '7:00',
      status: 'OPEN',
      bankAccount: '12345678933',
      vatNumber: 'vc1234567',
      originalExpenditureId: null,
      isLatest: false,
      customerId: 173,
      expenditureCategoryId: null,
      productCategoryId: 11,
      businessDetailId: 1,
      customer: {
        id: 173,
        createdBy: 3,
        updatedBy: null,
        createdAt: '2023-07-24T07:05:14.404Z',
        updatedAt: '2023-07-24T07:05:14.404Z',
        accountOwnerName: null,
        iban: null,
        paymentDetailType: null,
        city: 'aghavnatun',
        country: 'armenia-AM',
        address: 'Lahore',
        postalCode: '312312',
        firstName: 'abc',
        lastName: 'abc',
        bic: null,
        mendateReferance: null,
        mandateGenerateDate: null,
        gender: 'MALE',
        designation: 'abc',
        nameOfCreditCard: null,
        creditCardNumber: null,
        creditCardExpiry: null,
        creditCardCVV: null,
        companyName: null,
        companyEmail: null,
        companyPhone: null,
        companyFax: null,
        companyMobile: null,
        companyUrl: null,
        companySize: null,
        tin: null,
        vat: null,
        vatStatus: false,
        isStatus: false,
        isActive: false,
        isPDF: false,
        isDraft: true,
        discountAmount: null,
        discountDays: null,
        termOfPayment: 'CASH_DISCOUNT_TARGET_AS_A_DATE',
        termOfPaymentData: null,
        businessDetailId: 1
      },
      CategoryId: {
        id: 11,
        createdBy: 15,
        updatedBy: null,
        createdAt: '2023-06-15T11:17:22.138Z',
        updatedAt: '2023-06-15T11:17:22.138Z',
        categoryLevel: 2,
        parentCategoryId: 4,
        categoryName: 'category1.3',
        hasChildren: false,
        businessDetailId: 16
      },
      partialPayments: []
    }
  ];

  const additionalObjecttt = {
    id: 118,
    createdBy: 3,
    updatedBy: null,
    createdAt: '2023-08-23T09:12:58.575Z',
    updatedAt: '2023-08-23T09:12:58.575Z',
    cashDiscount: '10',
    cashDiscountValidity: '2023-09-01',
    paymentAmount: '33',
    dueDate: '2023-09-01',
    receiptDate: '2023-08-23',
    description: '2222222222',
    taxRate: '7:00',
    status: 'OPEN',
    bankAccount: '2222222222222222222222',
    vatNumber: 'er2222',
    originalExpenditureId: null,
    isLatest: true,
    customerId: 213,
    expenditureCategoryId: null,
    businessDetailId: 1,
    customer: {
      id: 213,
      createdBy: 3,
      updatedBy: null,
      createdAt: '2023-08-01T11:13:35.647Z',
      updatedAt: '2023-08-01T11:16:33.775Z',
      accountOwnerName: 'Haider',
      iban: 'UNILD78728228298',
      paymentDetailType: 'BANK',
      city: 'alto de jesús',
      country: 'panama-PA',
      address: 'Lahore City',
      postalCode: '78998',
      firstName: 'Isra',
      lastName: 'Aslam',
      bic: '89898989',
      mendateReferance: '121212',
      mandateGenerateDate: '2023-08-22T00:00:00.000Z',
      gender: 'MALE',
      designation: 'QA',
      nameOfCreditCard: null,
      creditCardNumber: null,
      creditCardExpiry: null,
      creditCardCVV: null,
      companyName: 'Zee Frames',
      companyEmail: 'isra@yopmail.com',
      companyPhone: '909090909090',
      companyFax: '909090909090',
      companyMobile: '909090909090',
      companyUrl: 'www.test.com',
      companySize: 'above 100',
      tin: '9090909090',
      vat: 'DE909090999',
      vatStatus: true,
      isStatus: true,
      isActive: true,
      isPDF: true,
      isDraft: false,
      discountAmount: 2121,
      discountDays: 2,
      termOfPayment: 'PAYMENT_TERMS_AS_DATE',
      termOfPaymentData: '2023-08-04',
      businessDetailId: 1
    },
    expenditureCategory: null,
    partialPayments: [
      {
        id: 87,
        createdBy: null,
        updatedBy: null,
        createdAt: '2023-08-24T05:52:57.818Z',
        updatedAt: '2023-08-24T05:52:57.818Z',
        partialPayment: '10',
        receiptDate: '2023-08-24',
        comment: 'string',
        balance: 50,
        expenditureId: 118
      },
      {
        id: 88,
        createdBy: null,
        updatedBy: null,
        createdAt: '2023-08-24T07:18:17.009Z',
        updatedAt: '2023-08-24T07:18:17.009Z',
        partialPayment: '100',
        receiptDate: '2023-08-24',
        comment: 'string',
        balance: 500,
        expenditureId: 118
      }
    ]
  };

  const ignoreFields = ['id', 'updatedAt', 'createdAt'];

  const generateChangeString = (current, next, additionalObject) => {
    let changeString = '';

    for (const key in current) {
      if (
        !ignoreFields.includes(key) &&
        current[key] !== undefined &&
        current[key] !== next[key] &&
        current[key] !== additionalObject[key]
      ) {
        if (
          typeof current[key] === 'object' &&
          typeof next[key] === 'object' &&
          typeof additionalObject[key] === 'object' &&
          !Array.isArray(current[key]) &&
          !Array.isArray(next[key]) &&
          !Array.isArray(additionalObject[key])
        ) {
          changeString += generateChangeString(
            current[key],
            next[key],
            additionalObject[key]
          );
        } else if (
          Array.isArray(current[key]) &&
          Array.isArray(next[key]) &&
          Array.isArray(additionalObject[key])
        ) {
          if (
            current[key].length === next[key].length &&
            current[key].length === additionalObject[key].length
          ) {
            // Compare array elements
            let arrayChangeString = '';
            for (let i = 0; i < current[key].length; i++) {
              const currentElement = current[key][i];
              const nextElement = next[key][i];
              const additionalElement = additionalObject[key][i];
              if (
                typeof currentElement === 'object' &&
                typeof nextElement === 'object' &&
                typeof additionalElement === 'object'
              ) {
                arrayChangeString += generateChangeString(
                  currentElement,
                  nextElement,
                  additionalElement
                );
              }
            }
            if (arrayChangeString !== '') {
              changeString += `Change ${key} from ${JSON.stringify(
                current[key]
              )} to ${JSON.stringify(next[key])}\n`;
            }
          } else {
            changeString += `Change ${key} from ${JSON.stringify(
              current[key]
            )} to ${JSON.stringify(next[key])}\n`;
          }
        } else {
          changeString += `Change ${key} from ${JSON.stringify(
            current[key]
          )} to ${JSON.stringify(next[key])}\n`;
        }
      }
    }

    return changeString;
  };
  const generateChangeData = () => {
    let changeData = '';

    const lastIndex = data.length - 1;
    const currentObject = data[lastIndex];

    // Compare the last object with additionalObjecttt
    const lastObjectChangeString = generateChangeString(
      currentObject,
      additionalObjecttt,
      additionalObjecttt
    );

    if (lastObjectChangeString !== '') {
      changeData += `Changes detected in item with ID ${currentObject.id}:\n`;
      changeData += lastObjectChangeString;
      changeData += '\n';
    }
    // const changeDatadd = () => {
    //   switch ('truetype') {
    //     case 'abc':
    //       return 'a +b';
    //     default:
    //       return 'hello world';
    //   }
    // };

    for (let i = 0; i < data.length - 1; i++) {
      const previousObject = data[i];
      const nextObject = data[i + 1];

      const changeString = generateChangeString(
        previousObject,
        nextObject,
        additionalObjecttt
      );

      if (changeString !== '') {
        changeData += `Changes detected in item with ID ${previousObject.id}:\n`;
        changeData += changeString;
        changeData += '\n';
      }
    }

    return changeData;
  };
  const changeData = generateChangeData();
  return (
    <div className="tw-flex tw-items-center tw-justify-center">
      <div class="circle-animation">
        <img src="/assets/images/logo.png" alt="logo" />
      </div>
      {/*  add heading */}

      {/* <div>
        <div>
          {taggedEmails.map((taggedEmail, index) => (
            <div key={index} className="tag">
              {taggedEmail}
              <button onClick={() => removeEmail(index)}>x</button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={email}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          style={{
            background: invalidEmail ? 'red' : 'white',
            color: invalidEmail ? 'white' : 'black'
          }}
        />
      </div> */}
      {/* <pre>{changeData}</pre> */}
      {/* <div dangerouslySetInnerHTML={{ __html: changeData }} /> */}
    </div>
  );
}
