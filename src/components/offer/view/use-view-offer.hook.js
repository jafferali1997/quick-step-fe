/* eslint-disable react/jsx-filename-extension */

'use client';

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleDownloadCsv from '@/common/utils/document-file-download/download-csv';
import handleDownloadPdf from '@/common/utils/document-file-download/download-pdf';
import handleDownloadTxt from '@/common/utils/document-file-download/download-txt';
import handleDownloadExcel from '@/common/utils/document-file-download/download-xls';
import handleDownloadXml from '@/common/utils/document-file-download/download-xml';
import handleDownloadPdfAsZip from '@/common/utils/document-file-download/download-zip';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import { getAllOffers } from '@/provider/features/offer/offer.slice';
import DraftContent from './components/draft/draft.component';
import OverviewContent from './components/overview/overview.comopnent';
import RejectedContent from './components/rejected/rejected.component';
import TemplateContent from './components/templates/templates.component';

export default function useViewOffer() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [openZIPPopup, setZIPOpenPopup] = useState('');
  const [diffrenciator, setDiffrenciator] = useState(false);
  const [download, setDownload] = useState(false);
  const [data, setData] = useState([]);
  const [business, setBusiness] = useState('');
  const [open, setOpen] = useState('');
  const [invoiced, setInvoiced] = useState('');
  const [profit, setProfit] = useState('');

  const singleOffer = useSelector((state) => state.offer.getSingleOffer);

  useEffect(() => {
    getCurrentBusinessDetail();
  }, [download]);

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
        setDiffrenciator(false);
      }
    },
    {
      id: 3,
      name: 'Download XML File',
      onClick: () => {
        handleDownloadXml({
          data,
          module: 'offer'
        });
      }
    },
    {
      id: 4,
      name: 'Download CSV File',
      onClick: () => {
        handleDownloadCsv({
          data,
          module: 'offer'
        });
      }
    },
    {
      id: 5,
      name: 'Download TXT File',
      onClick: () => {
        handleDownloadTxt({
          data,
          module: 'offer'
        });
      }
    },
    {
      id: 6,
      name: 'Download .xls File',
      onClick: () => {
        handleDownloadExcel({
          data,
          module: 'offer'
        });
      }
    }
  ];

  const handleData = async (offers) => {
    const response = await dispatch(
      getAllOffers({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: { id: { $in: offers } }
        }
      })
    );

    response.payload?.data ? setData(response.payload?.data) : setData([]);
  };

  const handleGetAllData = (data) => {
    setOpen(data.open);
    setInvoiced(data.invoiced);
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
      label: 'Rejected',
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
      value: `€ ${open || 0}`,
      icon: '/assets/images/offers/open.svg'
    },
    {
      id: 2,
      status: 'Invoiced',
      value: `€ ${invoiced || 0}`,
      icon: '/assets/images/offers/invoiced.svg '
    },
    {
      id: 3,
      status: 'Profit',
      value: `€ ${profit || 0}`,
      icon: '/assets/images/offers/profit.svg'
    }
  ];

  const getCurrentBusinessDetail = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const currentBusiness = await dispatch(
        getSingleBusinessDetail({
          payload: JSON.parse(storedUser).currentBusinessId
        })
      );
      setBusiness(currentBusiness.payload);
    }
  };

  const handleDownloadBlankPdfFile = () => {
    openZIPPopup === 'zip'
      ? handleDownloadPdfAsZip({
          canvasElement: 'canvas-element-blank',
          data,
          module: 'offer',
          setOpenPopup,
          setZIPOpenPopup
        })
      : handleDownloadPdf({
          canvasElement: 'canvas-element-blank',
          data,
          module: 'offer',
          setOpenPopup,
          setZIPOpenPopup
        });
  };

  const handleDownloadPdfFile = () => {
    openZIPPopup === 'zip'
      ? handleDownloadPdfAsZip({
          canvasElement: 'canvas-element',
          data,
          module: 'offer',
          setOpenPopup,
          setZIPOpenPopup
        })
      : handleDownloadPdf({
          canvasElement: 'canvas-element',
          data,
          module: 'offer',
          setOpenPopup,
          setZIPOpenPopup
        });
  };

  const handleClose = () => {
    setOpenPopup(false);
    setZIPOpenPopup('');
    setDiffrenciator(false);
  };

  return {
    ref,
    openPopup,
    setOpenPopup,
    data,
    dropdownOptions,
    tabs,
    setDownload,
    offers,
    business,
    handleDownloadBlankPdfFile,
    handleDownloadPdfFile,
    singleOffer,
    openZIPPopup,
    handleClose,
    diffrenciator
  };
}

useViewOffer.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
