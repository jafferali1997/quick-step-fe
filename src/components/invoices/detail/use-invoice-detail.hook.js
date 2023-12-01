import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import { getAllComment } from '@/provider/features/comment/comments.slice';
import { getSingleInvoice } from '@/provider/features/invoice/invoice.slice';
import { getAllProduct } from '@/provider/features/product/product.slice';

export default function useInvoiceDetail() {
  const fileInputRef = useRef();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);

  const invoiceAttachment = useSelector((state) => state.invoice.getSingleInvoice);

  useEffect(() => {
    if (searchParams.get('id')) {
      fetchInvoice();
      getAllComments();
    }
  }, []);

  const getInvoiceStatusClass = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'tw-bg-[#F1FFB9] tw-text-[#A58825]';
      case 'REJECTED':
        return 'tw-text-[#A60A0A] tw-bg-[#FFE8E8]';
      case 'INVOICED':
        return 'tw-text-[#0DA60A] tw-bg-[#DCFFDE]';
      case 'DRAFT':
        return 'tw-bg-[#EEEEEE]';
      case 'OPEN':
        return 'tw-bg-[#F2F2F2]';
      default:
        return '';
    }
  };

  const fetchBusinessDetail = async () => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      const businessDetailRes = await dispatch(
        getSingleBusinessDetail({ payload: user.currentBusinessId })
      );
      if (businessDetailRes?.payload?.id) {
        return businessDetailRes.payload;
      }
    }
    return null;
  };

  const fetchInvoice = async () => {
    const businessDetail = await fetchBusinessDetail();
    if (businessDetail) {
      const response = await dispatch(
        getSingleInvoice({ payload: Number(searchParams.get('id')) })
      );
      const allproducts = await dispatch(
        getAllProduct({
          payload: {
            sortColumn: 'id',
            sortOrder: 'DESC',
            condition: ''
          }
        })
      );

      const products = allproducts?.payload.data.filter((product) => {
        const { id } = product;
        const allProductIds = response.payload?.invoiceProducts.map(
          (product) => product.productId
        );

        return allProductIds.includes(id);
      });

      setData({
        ...response.payload,
        products: [...products],
        businessDetail
      });
    }
  };

  const handleUploadButtonClick = (row) => {
    fileInputRef.current.click();
  };

  const getAllComments = async () => {
    const response = await dispatch(getAllComment({ payload: searchParams.get('id') }));
    setComments(response?.payload);
  };

  return {
    invoiceId: searchParams.get('id'),
    data,
    getInvoiceStatusClass,
    comments,
    fileInputRef,
    handleUploadButtonClick,
    invoiceAttachment
  };
}
