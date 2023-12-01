import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import striptags from 'striptags';
import DOCUMENT, { LINE_ITEM_MAIN_HEADING } from '@/common/constants/document.constants';
import useDocumentTemplate from '@/common/hooks/use-document-template.hook';
import {
  bookAnOffer,
  getSingleOffer,
  saveAsDraft
} from '@/provider/features/offer/offer.slice';
import {
  createTemplate,
  getSingleTemplate
} from '@/provider/features/template/template.slice';

function usePreview() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter(null);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'));

  const [offer, setOffer] = useState('');
  const [search, setSearch] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [templateHeader, setTemplateHeader] = useState([]);
  const [templateContact, setTemplateContact] = useState([]);
  const [templateFooter, setTemplateFooter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [offerToData, setOfferToData] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [openChooseTemplate, setOpenChooseTemplate] = useState(false);
  const [currentSelectedTemplate, setCurrentSelectedTemplate] = useState('');
  const [tableFooterOptions, setTableFooterOptions] = useState({
    netAmount: false,
    plusVAT: false,
    invoiceAmount: false
  });

  const {
    templateData,
    simpleTemplateData,
    standardTemplateData,
    templateStructure,
    mapColumnNameToProductKey,
    extractTermsFromHtml,
    stripHTML,
    columns,
    business,
    businessData,
    CONTACT_INFO,
    FROM_CONTACT_INFO
  } = useDocumentTemplate({ documentType: DOCUMENT.OFFER });

  // useEffect(() => {
  //   const response = offer.offerProducts?.map((product) => {
  //     const { lineItemHeader } = product;

  //     return {
  //       ...product,
  //       lineItemHeader: lineItemHeader || LINE_ITEM_MAIN_HEADING
  //     };
  //   });

  //   const orderedMergedData = response?.reduce((result, item) => {
  //     const strippedLineItemHeader = striptags(item.lineItemHeader);
  //     if (strippedLineItemHeader) {
  //       if (strippedLineItemHeader === LINE_ITEM_MAIN_HEADING) {
  //         if (!result[strippedLineItemHeader]) {
  //           result[strippedLineItemHeader] = {
  //             product: []
  //           };
  //         }
  //         result[strippedLineItemHeader].product.push(item);
  //       } else {
  //         if (!result[strippedLineItemHeader]) {
  //           result[strippedLineItemHeader] = {
  //             product: [
  //               {
  //                 action: 'action',
  //                 productName: item.lineItemHeader
  //               }
  //             ]
  //           };
  //         }
  //         result[strippedLineItemHeader].product.push(item);
  //       }
  //     }

  //     return result;
  //   }, {});

  //   setData({
  //     LINE_ITEM_MAIN_HEADING:
  //       orderedMergedData && orderedMergedData.LINE_ITEM_MAIN_HEADING,
  //     ...orderedMergedData
  //   });
  // }, []);

  useEffect(() => {
    if (offer) {
      getSingleTemplateData(
        offer.offerTemplateId ||
          JSON.parse(localStorage.getItem('currentTemplate')) ||
          standardTemplateData?.[0]?.id ||
          simpleTemplateData?.[0]?.id
      );
    }
  }, [offer, simpleTemplateData, standardTemplateData]);

  useEffect(() => {
    templateStructure({
      tableFooterOptions,
      setTableData,
      setTemplateFooter,
      setTableFooterOptions,
      setTemplateHeader,
      setTemplateContact
    });
  }, [templateData]);

  useEffect(() => {
    handleGetOffer();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const getListOfSimpleTemplates = simpleTemplateData?.filter((item) => {
    if (search) {
      const values = Object.values(item).map((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase();
        } else {
          return value ? value.toString().toLowerCase() : ''; // Convert to string if possible
        }
      });
      return values.some((val) => val && val.includes(search.toLowerCase()));
    }
    return item;
  });

  const getListOfStandardTemplates = standardTemplateData?.filter((item) => {
    if (search) {
      const values = Object.values(item).map((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase();
        } else {
          return value ? value.toString().toLowerCase() : ''; // Convert to string if possible
        }
      });
      return values.some((val) => val && val.includes(search.toLowerCase()));
    }
    return item;
  });

  const handleGetOffer = async () => {
    const response = await dispatch(getSingleOffer({ payload: id }));
    setOffer(response.payload);
    if (response.payload.customer) {
      setOfferToData({
        companyName: response.payload.customer.companyName,
        contactPerson: response.payload.customer.firstName,
        customerNo: response.payload.customer.companyPhone,
        deliveryDate: response.payload.deliveryDate || '',
        city: response.payload.customer.city,
        country: response.payload.customer.country
      });
    }
  };

  const handleOpenPopup = (event) => {
    event.preventDefault();
    setOpenPopup(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const templateId =
      currentSelectedTemplate ||
      JSON.parse(localStorage.getItem('currentTemplate')) ||
      offer.offerTemplateId ||
      standardTemplateData?.[0]?.id ||
      simpleTemplateData?.[0]?.id;

    const response = await dispatch(saveAsDraft({ templateId, id }));
    if (response.meta.requestStatus === 'fulfilled') {
      router.push('/offer/view');
      setOpenPopup(false);
      localStorage.removeItem('currentTemplate');
    }
  };

  const handleBook = async () => {
    const templateId =
      currentSelectedTemplate ||
      JSON.parse(localStorage.getItem('currentTemplate')) ||
      offer.offerTemplateId ||
      standardTemplateData?.[0]?.id ||
      simpleTemplateData?.[0]?.id;

    if (Number(searchParams.get('id'))) {
      const response = await dispatch(
        bookAnOffer({
          payload: id || Number(searchParams.get('id')),
          offerTemplateId: templateId
        })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        setOpenPopup(false);
        router.push('/offer/view');
        localStorage.removeItem('currentTemplate');
      }
    }
  };

  const getSingleTemplateData = async (temId) => {
    setIsLoading(true);
    try {
      if (temId) {
        await dispatch(getSingleTemplate({ payload: temId }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const termsAndConditionsData = extractTermsFromHtml(offer?.termsAndConditions);

  const handleCraeteTemplate = async () => {
    const data = {
      documentType: DOCUMENT.OFFER
    };
    try {
      const response = await dispatch(createTemplate({ payload: data }));
      if (response.payload.id) {
        const temId = response.payload.id;
        const docType = response.payload.documentType;
        router.push(`/create-template?id=${temId}&docType=${docType}`);
      }
    } catch (error) {
      console.error('Error creating offer template:', error);
    }
  };

  const handleEditTemplate = (templateId) => {
    router.push(`/edit-template?id=${templateId}&docType=${DOCUMENT.OFFER}`);
  };

  const handleSearchTemplate = (event) => {
    setSearch(event.target.value);
  };

  const handleSelectedBodytemplate = (template) => {
    getSingleTemplateData(template.id);
    setOpenChooseTemplate(false);
    setSelectedTemplate(template.templateName);
    setCurrentSelectedTemplate(template.id);
  };

  return {
    ref,
    offer,
    business,
    id,
    handleSave,
    columns,
    handleBook,
    openPopup,
    setOpenPopup,
    handleOpenPopup,
    templateFooter,
    templateHeader,
    templateContact,
    tableData,
    setTableData,
    CONTACT_INFO,
    FROM_CONTACT_INFO,
    isLoading,
    offerToData,
    tableFooterOptions,
    termsAndConditionsData,
    stripHTML,
    mapColumnNameToProductKey,
    businessData,
    openChooseTemplate,
    setOpenChooseTemplate,
    getListOfSimpleTemplates,
    getListOfStandardTemplates,
    handleCraeteTemplate,
    handleEditTemplate,
    handleSearchTemplate,
    search,
    handleSelectedBodytemplate,
    selectedTemplate,
    data
  };
}

export default usePreview;
