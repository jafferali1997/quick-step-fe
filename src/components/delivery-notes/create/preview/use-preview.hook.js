import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DOCUMENT from '@/common/constants/document.constants';
import useDocumentTemplate from '@/common/hooks/use-document-template.hook';
import {
  bookAnDeliveryNotes,
  getSingleDeliveryNotes,
  saveAsDraft
} from '@/provider/features/delivery-notes/delivery-notes.slice';
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
  const displayId = searchParams.get('d-id');

  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [search, setSearch] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [templateHeader, setTemplateHeader] = useState([]);
  const [templateContact, setTemplateContact] = useState([]);
  const [templateFooter, setTemplateFooter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryNotesToData, setDeliveryNotesToData] = useState('');
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
  } = useDocumentTemplate({ documentType: DOCUMENT.DELIVERY_NOTES });

  useEffect(() => {
    if (deliveryNotes) {
      getSingleTemplateData(
        deliveryNotes.deliveryNotesTemplateId ||
          simpleTemplateData?.[0]?.id ||
          standardTemplateData?.[0]?.id
      );
    }
  }, [deliveryNotes, simpleTemplateData, standardTemplateData]);

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
    handleGetDeliveryNotes();
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

  const handleGetDeliveryNotes = async () => {
    const response = await dispatch(getSingleDeliveryNotes({ payload: id }));
    setDeliveryNotes(response.payload);
    if (response.payload.customer) {
      setDeliveryNotesToData({
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
      deliveryNotes.deliveryNotesTemplateId ||
      standardTemplateData?.[0]?.id ||
      simpleTemplateData?.[0]?.id;

    const response = await dispatch(saveAsDraft({ templateId, id }));
    if (response.meta.requestStatus === 'fulfilled') {
      router.push('/delivery-notes/view');
      setOpenPopup(false);
    }
  };

  const handleBook = async () => {
    const templateId =
      currentSelectedTemplate ||
      deliveryNotes.deliveryNotesTemplateId ||
      standardTemplateData?.[0]?.id ||
      simpleTemplateData?.[0]?.id;

    if (Number(searchParams.get('id'))) {
      const response = await dispatch(
        bookAnDeliveryNotes({
          payload: id || Number(searchParams.get('id')),
          deliveryNotesTemplateId: templateId
        })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        setOpenPopup(false);
        router.push('/delivery-notes/view');
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

  const termsAndConditionsData = extractTermsFromHtml(deliveryNotes?.termsAndConditions);

  const handleCraeteTemplate = async () => {
    const data = {
      documentType: DOCUMENT.DELIVERY_NOTES
    };
    try {
      const response = await dispatch(createTemplate({ payload: data }));
      if (response.payload.id) {
        const temId = response.payload.id;
        const docType = response.payload.documentType;
        router.push(`/create-template?id=${temId}&docType=${docType}`);
      }
    } catch (error) {
      console.error('Error creating deliveryNotes template:', error);
    }
  };

  const handleEditTemplate = (templateId) => {
    router.push(`/edit-template?id=${templateId}&docType=${DOCUMENT.DELIVERY_NOTES}`);
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
    deliveryNotes,
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
    deliveryNotesToData,
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
    displayId
  };
}

export default usePreview;
