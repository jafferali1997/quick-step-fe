/* eslint-disable no-prototype-builtins */
import { useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookAnOffer, getSingleOffer } from '@/provider/features/offer/offer.slice';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import { getSingleTemplate } from '@/provider/features/template/template.slice';

const CONTACT_INFO = {
  companyName: 'Company Name',
  contactPerson: 'Contact Person',
  customerNo: 'Company No',
  deliveryDate: 'Delivery Date',
  city: 'City',
  country: 'Country'
};

const FROM_CONTACT_INFO = {
  // companyName: '',
  // contactPerson: '',
  // deliveryDate: '',
  // city: '',
  // country: ''
};

function usePreview({ offerId: id }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter(null);
  const searchParams = useSearchParams();
  const [offer, setOffer] = useState('');
  const [business, setBusiness] = useState('');
  const [businessData, setBusinessData] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const templateData = useSelector((state) => state.template.getSingleTemplate.data);
  const [tableData, setTableData] = useState([]);
  const [templateHeader, setTemplateHeader] = useState([]);
  const [templateContact, setTemplateContact] = useState([]);
  const [templateFooter, setTemplateFooter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [offerToData, setOfferToData] = useState('');
  const [tableFooterOptions, setTableFooterOptions] = useState({
    netAmount: false,
    plusVAT: false,
    invoiceAmount: false
  });
  const [productToLoad, setProductToLead] = useState([]);

  useEffect(() => {
    const chunkSize = 5;
    const numberOfArrays = Math.ceil(
      offer && offer.offerProducts && offer.offerProducts.length / chunkSize
    );
    const newArray = [];

    for (let i = 0; i < numberOfArrays; i++) {
      newArray.push(
        offer.offerProducts &&
          offer.offerProducts.slice(i * chunkSize, (i + 1) * chunkSize)
      );
    }
    setProductToLead(newArray);
  }, [offer?.offerProducts]);

  useEffect(() => {
    handleGetOffer();
  }, []);

  useEffect(() => {
    getCurrentBusinessDetail();
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

  const getCurrentBusinessDetail = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const currentBusiness = await dispatch(
        getSingleBusinessDetail({
          payload: JSON.parse(storedUser).currentBusinessId
        })
      );
      const businessPayload = currentBusiness.payload;
      setBusinessData(businessPayload);
      setBusiness({
        companyName: businessPayload.businessName,
        contactPerson: businessPayload.businessEmail,
        deliveryDate: '',
        city: businessPayload.address,
        country: businessPayload.slogan
      });
    }
  };

  const handleGetOffer = async () => {
    const response = await dispatch(getSingleOffer({ payload: id }));
    setOffer(response.payload);
    if (response.payload.customer) {
      setOfferToData({
        companyName: response.payload.customer.companyName,
        contactPerson: response.payload.customer.firstName,
        customerNo: response.payload.customer.companyPhone,
        deliveryDate: '',
        city: response.payload.customer.city,
        country: response.payload.customer.country
      });
    }
  };

  const dropdownoptions = [
    { id: 1, name: 'option1', link: '/option1' },
    { id: 2, name: 'option2', link: '/option2' },
    { id: 3, name: 'option3', link: '/option3' }
  ];

  const columns = [
    { field: 'action', headerName: 'Action' },
    { field: 'productName', headerName: 'Product' },
    { field: 'description', headerName: 'Description' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'positionNo', headerName: 'Position No' },
    { field: 'unit', headerName: 'Unit' },
    { field: 'netPrice', headerName: 'Price' },
    { field: 'taxRate', headerName: 'Tax' },
    { field: 'discount', headerName: 'Discount' },
    { field: 'totalPrice', headerName: 'Total' }
  ];

  const handleOpenPopup = (event) => {
    event.preventDefault();
    setOpenPopup(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    router.push('/offer/view');
    setOpenPopup(false);
    localStorage.removeItem('getTemplateId');
    enqueueSnackbar('Draft Saved successfully', {
      variant: 'success'
    });
  };

  const handleBook = async () => {
    if (Number(searchParams.get('id'))) {
      const response = await dispatch(
        bookAnOffer({
          payload: id || Number(searchParams.get('id'))
        })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        setOpenPopup(false);
        localStorage.removeItem('getTemplateId');
        router.push('/offer/view');
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

  useEffect(() => {
    if (offer) {
      getSingleTemplateData(offer.offerTemplateId);
    }
  }, [offer]);

  useEffect(() => {
    if (templateData) {
      const header = [];
      const contact = [];
      const newTableFooterOptions = { ...tableFooterOptions };

      templateData?.sections?.forEach((section) => {
        const { sectionName } = section;
        if (sectionName === 'offerLogo' || sectionName === 'offerId') {
          header.push(section);
        }
        if (sectionName === 'offerTo' || sectionName === 'offerFrom') {
          contact.push(section);
        }
        if (sectionName === 'table') {
          const tableAttributes = section?.attributes?.map((attribute) => ({
            id: attribute.attributePosition,
            position: attribute.attributePosition || '',
            name: attribute.attributeName || true,
            backgroundColor: attribute.backgroundColor || '#fafafa'
          }));
          tableAttributes.sort((a, b) => {
            return a.position - b.position;
          });
          setTableData(tableAttributes || {});
        }
        if (sectionName === 'tableFooterOptions') {
          const attributes = section?.attributes || [];
          attributes.forEach((attribute) => {
            const { attributeName } = attribute;
            if (newTableFooterOptions.hasOwnProperty(attributeName)) {
              newTableFooterOptions[attributeName] = true;
            }
          });
        }
        if (sectionName === 'offerFooter') {
          const templateFooterAttributes = {};
          section?.attributes?.forEach((attribute) => {
            templateFooterAttributes[attribute.attributeName] = attribute;
          });
          setTemplateFooter(templateFooterAttributes);
        }
      });
      header.sort((a, b) => {
        return a.sectionPosition - b.sectionPosition;
      });
      contact.sort((a, b) => {
        return a.sectionPosition - b.sectionPosition;
      });
      setTableFooterOptions(newTableFooterOptions);
      setTemplateHeader(header);
      setTemplateContact(contact);
    }
  }, [templateData]);

  const extractTermsFromHtml = (html) => {
    const terms = {};
    // Strip HTML tags
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const textOnly = doc.body.textContent || '';
    // Extract terms using regex
    const regex = /(Payment terms|Delivery|Warranty):\s*([^\n]+)/g;
    let match;
    while ((match = regex.exec(textOnly)) !== null) {
      const key = match[1].trim();
      const value = match[2].trim();
      terms[key] = value;
    }
    return terms;
  };
  const termsAndConditionsData = extractTermsFromHtml(offer?.termsAndConditions);

  // to remove the html tag
  const stripHTML = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const mapColumnNameToProductKey = (columnName) => {
    switch (columnName) {
      case 'Product':
        return 'productName';
      case 'Description':
        return 'description';
      case 'Quantity':
        return 'quantity';
      case 'Unit':
        return 'unit';
      case 'Price':
        return 'netPrice';
      case 'Tax':
        return 'taxRate';
      case 'Discount':
        return 'lineItemDiscount';
      case 'Total':
        return 'Total';
      default:
        return null;
    }
  };

  return {
    ref,
    offer,
    dropdownoptions,
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
    productToLoad
  };
}

export default usePreview;
