import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSingleTemplate } from '@/provider/features/template/template.slice';

const CONTACT_INFO = {
  companyName: 'Company Name',
  contactPerson: 'Contact Person',
  customerNo: 'Company No',
  deliveryDate: 'Delivery Date',
  city: 'City',
  country: 'Country'
};

export default function useViewTemplate() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const parmsId = searchParams.get('id');
  const docType = searchParams.get('docType');
  const templateData = useSelector((state) => state.template.getSingleTemplate.data);
  const [tableData, setTableData] = useState([]);
  const [templateHeader, setTemplateHeader] = useState([]);
  const [templateContact, setTemplateContact] = useState([]);
  const [templateFooter, setTemplateFooter] = useState({});
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
    if (templateData) {
      const header = [];
      const contact = [];

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
      setTemplateHeader(header);
      setTemplateContact(contact);
    }
  }, [templateData]);

  const goBack = () => {
    router.back();
  };

  return {
    templateFooter,
    templateHeader,
    templateContact,
    tableData,
    setTableData,
    CONTACT_INFO,
    docType,
    isLoading,
    goBack
  };
}
