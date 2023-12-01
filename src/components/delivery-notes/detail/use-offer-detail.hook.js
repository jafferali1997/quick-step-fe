import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import { getAllDeliveryNotesComment } from '@/provider/features/delivery-notes-comments/delivery-notes-comments.slice';
import { getSingleDeliveryNotes } from '@/provider/features/delivery-notes/delivery-notes.slice';
import { getAllProduct } from '@/provider/features/product/product.slice';

export default function useDeliveryNotesDetail() {
  const fileInputRef = useRef();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);

  const deliveryNotesAttachment = useSelector(
    (state) => state.deliveryNotes.getSingleDeliveryNotes
  );

  useEffect(() => {
    if (searchParams.get('id')) {
      fetchDeliveryNotes();
      getAllComments();
    }
  }, []);

  const getDeliveryNotesStatusClass = (status) => {
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

  const fetchDeliveryNotes = async () => {
    const businessDetail = await fetchBusinessDetail();
    if (businessDetail) {
      const response = await dispatch(
        getSingleDeliveryNotes({ payload: Number(searchParams.get('id')) })
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
        const allProductIds = response.payload?.deliveryNotesProducts.map(
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

  const getAllComments = async () => {
    const response = await dispatch(
      getAllDeliveryNotesComment({ payload: searchParams.get('id') })
    );
    setComments(response?.payload);
  };

  const handleUploadButtonClick = (row) => {
    fileInputRef.current.click();
  };

  return {
    deliveryNotesId: searchParams.get('d-id'),
    data,
    getDeliveryNotesStatusClass,
    comments,
    fileInputRef,
    handleUploadButtonClick,
    deliveryNotesAttachment
  };
}
