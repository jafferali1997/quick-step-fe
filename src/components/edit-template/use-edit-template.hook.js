/* eslint-disable no-prototype-builtins */
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useColorPicker } from 'react-best-gradient-color-picker';
import {
  getSingleTemplate,
  updateTemplate
} from '@/provider/features/template/template.slice';

const initialColumns = [
  {
    id: '1',
    name: 'Position',
    backgroundColor: '#fafafa',
    display: false
  },
  {
    id: '2',
    name: 'Description',
    backgroundColor: '#fafafa',
    display: false
  },
  {
    id: '3',
    name: 'Quantity',
    backgroundColor: '#fafafa',
    display: false
  },
  { id: '4', name: 'Unit', backgroundColor: '#fafafa', display: false },
  { id: '5', name: 'Price', backgroundColor: '#fafafa', display: false },
  { id: '6', name: 'Tax', backgroundColor: '#fafafa', display: false },
  {
    id: '7',
    name: 'Discount',
    backgroundColor: '#fafafa',
    display: false
  },
  { id: '8', name: 'Total', backgroundColor: '#fafafa', display: false }
];
const initialTableData = [];

export default function useEditTemplate() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const parmsId = searchParams.get('id');
  const docType = searchParams.get('docType');
  const templateData = useSelector((state) => state.template.getSingleTemplate.data);

  const [items, setItems] = useState([
    { id: 'item-1' },
    { id: 'item-2', isOfferTo: true }
  ]);
  const [tempSettingOpen, setTempSettingOpen] = useState(false);
  const [itemsLogo, setItemsLogo] = useState([
    { id: 'item-1', content: 'Offer ' },
    { id: 'item-2', content: 'Offer logo', isImage: true }
  ]);
  const [columns, setColumns] = useState(initialColumns);
  const [tableData, setTableData] = useState(initialTableData);
  const [activeDiv, setActiveDiv] = useState(null);
  const editorRef = useRef(null);
  const [offerToOptions, setOfferToOptions] = useState({
    companyName: false,
    contactPerson: false,
    customerNo: false,
    deliveryDate: false,
    city: false,
    country: false
  });
  const [offerLogoOptions, setOfferLogoOptions] = useState({
    logo: false
  });
  const [offerFromOptions, setOfferFromOptions] = useState({
    companyName: false,
    contactPerson: false,
    customerNo: false,
    deliveryDate: false,
    city: false,
    country: false
  });
  const [tableFooterOptions, setTableFooterOptions] = useState({
    netAmount: false,
    plusVAT: false,
    invoiceAmount: false
  });
  const [offerFooterOptions, setOfferFooterOptions] = useState({
    disclaimer: false,
    paymentTerms: false,
    delivery: false,
    warranty: false,
    copyright: false
  });
  const [columnBackgroundColor, setColumnBackgroundColor] = useState('#fafafa');
  const { valueToHex: bgColorToHex } = useColorPicker(
    columnBackgroundColor,
    setColumnBackgroundColor
  );
  const [selectedColumn, setSelectedColumn] = useState('');
  const [defautlBodyText, setDefautlBodyText] = useState('This is default body text');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getSingleTemplateData = async () => {
    setIsLoading(true);
    try {
      if (parmsId) {
        await dispatch(getSingleTemplate({ payload: parmsId }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleTemplateData();
  }, [parmsId, dispatch]);

  useEffect(() => {
    const bgColorhex = bgColorToHex();
    setColumnBackgroundColor(bgColorhex);
  }, [columnBackgroundColor]);

  const handleColumnClick = (item) => {
    setSelectedColumn(item.name);
    setActiveDiv('table header');
    const updatedColumns = columns.map((column) =>
      column.id === item.id
        ? { ...column, backgroundColor: columnBackgroundColor }
        : column
    );
    setColumns(updatedColumns);
  };

  const handleColumnStyle = (content) => {
    setSelectedColumn(content);
    const extractedValue = content.match(/<[^>]*>([^<]*)<\/[^>]*>/)[1] || content;
    const updatedColumns = columns.map((column) =>
      column.name === extractedValue ? { ...column, name: content } : column
    );
    setColumns(updatedColumns);
  };

  const handleBodyText = (value) => {
    setDefautlBodyText(value);
  };

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

  const handleOfferLogoOptionsChange = (optionName) => {
    setOfferLogoOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: !prevOptions[optionName]
    }));
  };
  const handleOfferToOptionsChange = (optionName) => {
    setOfferToOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: !prevOptions[optionName]
    }));
  };
  const handleOfferFromOptionsChange = (optionName) => {
    setOfferFromOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: !prevOptions[optionName]
    }));
  };
  const handleOfferFooterOptionsChange = (optionName) => {
    setOfferFooterOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: !prevOptions[optionName]
    }));
  };

  const handleTableColumnOptionsChange = (columnName) => {
    const updatedColumns = columns.map((column) =>
      column.name === columnName ? { ...column, display: !column.display } : column
    );
    setColumns(updatedColumns);
  };

  const handleTableFooterOptionsChange = (optionName) => {
    setTableFooterOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: !prevOptions[optionName]
    }));
  };

  const handleDivClick = (divId) => {
    setActiveDiv(divId);
    setTempSettingOpen(true);
  };

  const handleOnDragEndLogo = (result) => {
    if (!result.destination) return;
    const itemsCopyLogo = Array.from(itemsLogo);
    const [reorderedItem] = itemsCopyLogo.splice(result.source.index, 1);
    itemsCopyLogo.splice(result.destination.index, 0, reorderedItem);
    setItemsLogo(itemsCopyLogo);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const itemsCopy = [...items];
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);
    setItems(itemsCopy);
  };

  useEffect(() => {
    if (templateData) {
      const { sections } = templateData;
      const temSectionData = {};
      const sectionPositions = {};

      sections.forEach((section) => {
        const sectionAttributes = {};
        section.attributes.forEach((attribute) => {
          if (attribute.attributeName) {
            sectionAttributes[attribute.attributeName] = attribute.value;
          }
        });
        // Add the section to temSectionData
        temSectionData[section.sectionName] = sectionAttributes;
        sectionPositions[section.sectionName] = section.sectionPosition;
      });

      setItemsLogo((prevItemsLogo) => {
        const offerIdPosition = sectionPositions.offerId?.toString();
        const offerLogoPosition = sectionPositions.offerLogo?.toString();
        const newItemsLogo = prevItemsLogo.map((item) => ({
          ...item,
          id: item.isImage ? `item-${offerLogoPosition}` : `item-${offerIdPosition}`
        }));

        newItemsLogo.sort((a, b) => {
          const offerIdIndex = parseInt(a.id.split('-')[1], 10);
          const offerLogoIndex = parseInt(b.id.split('-')[1], 10);
          return offerIdIndex - offerLogoIndex;
        });
        return newItemsLogo;
      });

      setItems((prevItems) => {
        const offerToPosition = sectionPositions.offerTo?.toString();
        const offerFromPosition = sectionPositions.offerFrom?.toString();
        const newItems = prevItems.map((item) => ({
          ...item,
          id: item.isOfferTo ? `item-${offerToPosition}` : `item-${offerFromPosition}`
        }));

        newItems.sort((a, b) => {
          const offerToIndex = parseInt(a.id.split('-')[1], 10);
          const offerFromIndex = parseInt(b.id.split('-')[1], 10);
          return offerToIndex - offerFromIndex;
        });
        return newItems;
      });

      const tableSection = sections.find((section) => section.sectionName === 'table');
      const tableAttributes = tableSection?.attributes;
      const updatedColumns = columns.map((column) => {
        const matchingAttribute = tableAttributes?.find((attribute) => {
          const extractedNameMatch =
            attribute.attributeName.match(/<[^>]*>(.*?)<\/[^>]*>/);
          const extractedName = extractedNameMatch
            ? extractedNameMatch[1]
            : attribute.attributeName;
          return extractedName === column.name;
        });

        if (matchingAttribute) {
          return {
            id: matchingAttribute.attributePosition,
            name: matchingAttribute.attributeName,
            backgroundColor: matchingAttribute.backgroundColor || '#fafafa',
            display: true
          };
        } else {
          return column;
        }
      });
      setColumns(updatedColumns);
      const newOfferToOptions = { ...offerToOptions };
      const newOfferFromOptions = { ...offerFromOptions };
      const newOfferLogoOptions = { ...offerLogoOptions };
      const newOfferFooterOptions = { ...offerFooterOptions };
      const newTableFooterOptions = { ...tableFooterOptions };

      // Set the options to true only if the attribute name exists in temSectionData and matches the corresponding option name
      Object.keys(newOfferToOptions).forEach((attributeName) => {
        newOfferToOptions[attributeName] =
          temSectionData.offerTo?.hasOwnProperty(attributeName);
      });

      Object.keys(newOfferFromOptions).forEach((attributeName) => {
        newOfferFromOptions[attributeName] =
          temSectionData.offerFrom?.hasOwnProperty(attributeName);
      });

      Object.keys(newOfferLogoOptions).forEach((attributeName) => {
        if (temSectionData?.offerLogo) {
          newOfferLogoOptions[attributeName] = true;
        }
      });

      Object.keys(newOfferFooterOptions).forEach((attributeName) => {
        newOfferFooterOptions[attributeName] =
          temSectionData.offerFooter?.hasOwnProperty(attributeName);
      });

      Object.keys(newTableFooterOptions).forEach((attributeName) => {
        newTableFooterOptions[attributeName] =
          temSectionData.tableFooterOptions?.hasOwnProperty(attributeName);
      });

      setOfferToOptions(newOfferToOptions);
      setOfferFromOptions(newOfferFromOptions);
      setOfferLogoOptions(newOfferLogoOptions);
      setOfferFooterOptions(newOfferFooterOptions);
      setTableFooterOptions(newTableFooterOptions);
    }
  }, [templateData]);

  const handleUpdate = () => {
    const updatedColumns = columns.map((column, index) => ({
      ...column,
      position: index + 1
    }));

    const sectionOnePositions = itemsLogo.map((item, index) => ({
      ...item,
      position: index + 1
    }));

    const offerIdPosition = sectionOnePositions.find((item) => !item.isImage)?.position;
    const offerLogoPosition = sectionOnePositions.find((item) => item.isImage)?.position;

    const sectionTwoPositions = items.map((item, index) => ({
      ...item,
      position: index + 1
    }));

    const offerFromPosition = sectionTwoPositions.find(
      (item) => !item.isOfferTo
    )?.position;
    const offerToPosition = sectionTwoPositions.find((item) => item.isOfferTo)?.position;

    const dataToSave = {
      offerId: { sectionPosition: offerIdPosition.toString() },
      offerTo: {
        ...offerToOptions,
        sectionPosition: offerToPosition.toString()
      },
      offerFrom: {
        ...offerFromOptions,
        sectionPosition: offerFromPosition.toString()
      },
      offerFooter: offerFooterOptions,
      table: updatedColumns,
      tableFooterOptions,
      defautlBodyText: { defautlBodyText }
    };

    // Create sections based on the dataToSave
    const sections = [];

    const offerLogo = offerLogoOptions.logo
      ? {
          sectionName: 'offerLogo',
          sectionPosition: offerLogoPosition.toString(),
          sectionValue: 'offerLogo'
        }
      : undefined;

    if (offerLogo) {
      sections.push(offerLogo);
    }

    // Handle "table" section separately
    const tableSection = {
      sectionName: 'table',
      sectionValue: 'table',
      sectionPosition: '',
      attributes: []
    };

    const columnsToPush = updatedColumns.filter((column) => column.display);
    columnsToPush.forEach((column) => {
      tableSection.attributes.push({
        attributeName: column.name,
        attributePosition: column.position.toString(),
        value: '',
        color: '',
        backgroundColor: column.backgroundColor
      });
    });

    // Add the table section to the sections array
    sections.push(tableSection);

    // Loop through the dataToSave and add sections with attributes having true values
    Object.keys(dataToSave).forEach((sectionName) => {
      if (
        sectionName !== 'table' &&
        sectionName !== 'offerId' &&
        sectionName !== 'defautlBodyText'
      ) {
        const sectionData = dataToSave[sectionName];

        const section = {
          sectionName,
          sectionPosition:
            sectionName === 'offerTo'
              ? offerToPosition.toString()
              : sectionName === 'offerFrom'
              ? offerFromPosition.toString()
              : '',
          sectionValue: sectionName,
          attributes: []
        };

        // Add attributes with true values to the section
        Object.keys(sectionData).forEach((attributeName) => {
          if (sectionData[attributeName]) {
            const attribute = {
              attributeName,
              value: ''
            };
            section.attributes.push(attribute);
          }
        });

        // Add the section to the sections array if it has attributes with true values
        if (section.attributes.length > 0) {
          sections.push(section);
        }
      } else if (sectionName === 'offerId' || sectionName === 'defautlBodyText') {
        // For offerId just add the section with the correct position and no attributes
        sections.push({
          sectionName,
          sectionPosition: sectionName === 'offerId' ? offerIdPosition.toString() : '',
          sectionValue: sectionName
        });
      }
    });

    try {
      dispatch(
        updateTemplate({
          payload: {
            data: { sections },
            id: parmsId
          }
        })
      );
      setTempSettingOpen(false);
      let newObj = {};
      const existingData = JSON.parse(localStorage.getItem('activeTabTemplate'));
      newObj = { ...existingData };
      if (docType === 'invoices') {
        newObj['/invoices'] = 'tab4';
      } else {
        newObj[`/${docType}/view`] = 'tab4';
      }
      localStorage.setItem('activeTabTemplate', JSON.stringify(newObj));
      router.back();
    } catch (error) {
      console.error('Error creating offer template:', error);
    }
  };

  const goBack = () => {
    router.back();
  };

  const stripHTML = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return {
    handleOnDragEnd,
    items,
    handleOnDragEndLogo,
    itemsLogo,
    activeDiv,
    setActiveDiv,
    handleDivClick,
    offerToOptions,
    setOfferToOptions,
    handleOfferToOptionsChange,
    offerFromOptions,
    setOfferFromOptions,
    handleOfferFromOptionsChange,
    offerFooterOptions,
    setOfferFooterOptions,
    handleOfferFooterOptionsChange,
    tempSettingOpen,
    setTempSettingOpen,
    offerLogoOptions,
    setOfferLogoOptions,
    handleOfferLogoOptionsChange,
    columns,
    setColumns,
    tableData,
    setTableData,
    handleDragEnd,
    handleUpdate,
    editorRef,
    tableFooterOptions,
    handleColumnClick,
    defautlBodyText,
    handleBodyText,
    handleTableColumnOptionsChange,
    handleTableFooterOptionsChange,
    columnBackgroundColor,
    setColumnBackgroundColor,
    showModal,
    setShowModal,
    selectedColumn,
    handleColumnStyle,
    docType,
    isLoading,
    goBack,
    stripHTML
  };
}
