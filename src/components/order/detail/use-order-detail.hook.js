import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import { getAllOrderComment } from '@/provider/features/oder-comments/order-comments.slice';
import { getSingleOrder } from '@/provider/features/order/order.slice';

export default function useOrderDetail() {
  const fileInputRef = useRef();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);

  const orderAttachment = useSelector((state) => state.order.getSingleOrder);

  useEffect(() => {
    if (searchParams.get('id')) {
      fetchOrder();
      getAllComments();
    }
  }, []);

  const getOrderStatusClass = (status) => {
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

  const fetchOrder = async () => {
    const businessDetail = await fetchBusinessDetail();
    if (businessDetail) {
      const response = await dispatch(
        getSingleOrder({ payload: Number(searchParams.get('id')) })
      );
      if (response?.payload?.id) {
        setData({ ...response.payload, businessDetail });
      }
    }
  };

  const handleUploadButtonClick = (row) => {
    fileInputRef.current.click();
  };

  const getAllComments = async () => {
    const response = await dispatch(
      getAllOrderComment({ payload: searchParams.get('id') })
    );
    setComments(response?.payload);
  };

  return {
    orderId: searchParams.get('id'),
    data,
    getOrderStatusClass,
    comments,
    fileInputRef,
    handleUploadButtonClick,
    orderAttachment
  };
}
