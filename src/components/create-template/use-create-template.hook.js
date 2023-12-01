import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useColorPicker } from 'react-best-gradient-color-picker';
import { useDispatch, useSelector } from 'react-redux';
import striptags from 'striptags';
import { updateTemplate } from '@/provider/features/template/template.slice';

const initialColumns = [
  {
    id: '1',
    name: 'Product',
    backgroundColor: '#fafafa',
    display: true
  },
  {
    id: '2',
    name: 'Description',
    backgroundColor: '#fafafa',
    display: true
  },
  {
    id: '3',
    name: 'Quantity',
    backgroundColor: '#fafafa',
    display: true
  },
  { id: '4', name: 'Unit', backgroundColor: '#fafafa', display: true },
  { id: '5', name: 'Price', backgroundColor: '#fafafa', display: true },
  { id: '6', name: 'Tax', backgroundColor: '#fafafa', display: true },
  {
    id: '7',
    name: 'Discount',
    backgroundColor: '#fafafa',
    display: true
  },
  { id: '8', name: 'Total', backgroundColor: '#fafafa', display: true }
];
const initialTableData = [];

export default function useCreateTemplate() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const parmsId = searchParams.get('id');
  const docType = searchParams.get('docType');
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
  const productsEditorRef = useRef(null);
  const [offerToOptions, setOfferToOptions] = useState({
    companyName: true,
    contactPerson: true,
    customerNo: true,
    deliveryDate: true,
    city: true,
    country: true
  });
  const [offerLogoOptions, setOfferLogoOptions] = useState({
    logo: true
  });
  const [offerFromOptions, setOfferFromOptions] = useState({
    companyName: true,
    contactPerson: true,
    customerNo: true,
    deliveryDate: true,
    city: true,
    country: true
  });
  const [tableFooterOptions, setTableFooterOptions] = useState({
    netAmount: true,
    plusVAT: true,
    invoiceAmount: true
  });
  const [offerFooterOptions, setOfferFooterOptions] = useState({
    disclaimer: true,
    paymentTerms: true,
    delivery: true,
    warranty: true,
    copyright: true
  });
  const [columnBackgroundColor, setColumnBackgroundColor] = useState('#fafafa');
  const [showModal, setShowModal] = useState(false);
  const { valueToHex: bgColorToHex } = useColorPicker(
    columnBackgroundColor,
    setColumnBackgroundColor
  );
  const [selectedColumn, setSelectedColumn] = useState('');
  const documentData = useSelector(
    (state) => state[`${docType.toLowerCase()}`].createHeaderBody.data
  );
  const documentBody =
    documentData && documentData[`${docType.toLowerCase()}Body`].bodyDescription;
  const [defautlBodyText, setDefautlBodyText] = useState(
    documentBody ||
      '<div><span style="color: var(--new-colors-text-dark-gray, #46474F); font-size: 14px; font-style: normal; font-weight: 550; line-height: 17.5px;"> Dear Sir or Madam,</div><div style="color: var(--new-colors-text-medium-gray, #585858); font-size: 14px; font-style: normal; font-weight: 400; line-height: 17.5px;">As discussed, we would like to make you the following offer</div>'
  );

  useEffect(() => {
    const bgColorhex = bgColorToHex();
    setColumnBackgroundColor(bgColorhex);
  }, [columnBackgroundColor]);

  const handleColumnClick = (item) => {
    setSelectedColumn(item.name);
    setActiveDiv('table header');
    setTempSettingOpen(true);
    const updatedColumns = columns.map((column) =>
      column.id === item.id
        ? { ...column, backgroundColor: columnBackgroundColor }
        : column
    );
    setColumns(updatedColumns);
  };

  const handleColumnStyle = (content) => {
    setSelectedColumn(content);
    const updatedColumns = columns.map((column) =>
      striptags(column.name) === striptags(selectedColumn)
        ? { ...column, name: content }
        : column
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

  const handleSave = async () => {
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

    updatedColumns.forEach((column) => {
      tableSection.attributes.push({
        attributeName: column.name,
        attributePosition: column.position.toString(),
        value: '',
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
        // if (section.attributes.length > 0) {
        sections.push(section);
        // }
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
      const response = await dispatch(
        updateTemplate({
          payload: {
            data: { sections },
            id: parmsId
          }
        })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        setTempSettingOpen(false);
        router.back();
        localStorage.setItem('currentTemplate', response.payload.id);
      }
    } catch (error) {
      console.error('Error creating offer template:', error);
    }
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
    handleSave,
    columnBackgroundColor,
    setColumnBackgroundColor,
    handleColumnClick,
    tableFooterOptions,
    handleTableFooterOptionsChange,
    showModal,
    setShowModal,
    handleTableColumnOptionsChange,
    selectedColumn,
    handleColumnStyle,
    editorRef,
    productsEditorRef,
    defautlBodyText,
    handleBodyText,
    docType
  };
}
