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
import { getAllOrders } from '@/provider/features/order/order.slice';
import DraftContent from './components/draft/draft.component';
import OverviewContent from './components/overview/overview.comopnent';
import RejectedContent from './components/rejected/rejected.component';
import TemplateContent from './components/templates/templates.component';

export default function useViewOrder() {
  const ref = useRef(null);
  const [download, setDownload] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [openZIPPopup, setZIPOpenPopup] = useState('');
  const [diffrenciator, setDiffrenciator] = useState(false);
  const [business, setBusiness] = useState('');
  const [open, setOpen] = useState('');
  const [invoiced, setInvoiced] = useState('');
  const [profit, setProfit] = useState('');
  const [rejected, setRejected] = useState('');

  const singleOrder = useSelector((state) => state.order.getSingleOrder);

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
      }
    },
    {
      id: 3,
      name: 'Download XML File',
      onClick: () => {
        handleDownloadXml({
          data,
          module: 'order'
        });
      }
    },
    {
      id: 4,
      name: 'Download CSV File',
      onClick: () => {
        handleDownloadCsv({
          data,
          module: 'order'
        });
      }
    },
    {
      id: 5,
      name: 'Download TXT File',
      onClick: () => {
        handleDownloadTxt({
          data,
          business,
          module: 'order'
        });
      }
    },
    {
      id: 6,
      name: 'Download .xls File',
      onClick: () => {
        handleDownloadExcel({
          data,
          module: 'order'
        });
      }
    }
  ];

  const handleData = async (orders) => {
    const response = await dispatch(
      getAllOrders({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: { id: { $in: orders } }
        }
      })
    );
    response.payload?.data ? setData(response.payload?.data) : setData([]);
  };

  const handleGetAllData = (data) => {
    setOpen(data.open);
    setInvoiced(data.invoiced);
    setProfit(data.profit);
    setRejected(data.rejected);
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
      value: `€ ${(open && open.toFixed(2)) || 0}`,
      icon: '/assets/images/offers/open.svg'
    },
    {
      id: 2,
      status: 'Invoiced',
      value: `€ ${(invoiced && invoiced.toFixed(2)) || 0}`,
      icon: '/assets/images/offers/invoiced.svg '
    },
    {
      id: 3,
      status: 'Profit',
      value: `€ ${(profit && profit.toFixed(2)) || 0}`,
      icon: '/assets/images/offers/profit.svg'
    },
    {
      id: 4,
      status: 'Rejected',
      value: `€ ${rejected || 0}`,
      icon: '/assets/images/offers/rejected.svg'
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
          module: 'order',
          setOpenPopup,
          setZIPOpenPopup
        })
      : handleDownloadPdf({
          canvasElement: 'canvas-element-blank',
          data,
          module: 'order',
          setOpenPopup,
          setZIPOpenPopup
        });
  };

  const handleDownloadPdfFile = () => {
    openZIPPopup === 'zip'
      ? handleDownloadPdfAsZip({
          canvasElement: 'canvas-element',
          data,
          module: 'order',
          setOpenPopup,
          setZIPOpenPopup
        })
      : handleDownloadPdf({
          canvasElement: 'canvas-element',
          data,
          module: 'order',
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
    data,
    dropdownOptions,
    tabs,
    setDownload,
    offers,
    business,
    ref,
    openPopup,
    setOpenPopup,
    handleDownloadBlankPdfFile,
    handleDownloadPdfFile,
    singleOrder,
    openZIPPopup,
    handleClose,
    diffrenciator
  };
}

useViewOrder.propTypes = {
  handleTabClick: PropTypes.func.isRequired,
  handleTabCompleted: PropTypes.func.isRequired
};
