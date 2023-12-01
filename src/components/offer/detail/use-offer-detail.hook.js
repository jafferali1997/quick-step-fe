import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import { getAllOfferComment } from '@/provider/features/offer-comments/offer-comments.slice';
import { getSingleOffer } from '@/provider/features/offer/offer.slice';

export default function useOfferDetail() {
  const fileInputRef = useRef();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);

  const offerAttachment = useSelector((state) => state.offer.getSingleOffer);

  useEffect(() => {
    if (searchParams.get('id')) {
      fetchOffer();
      getAllComments();
    }
  }, []);

  const getOfferStatusClass = (status) => {
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

  const fetchOffer = async () => {
    const businessDetail = await fetchBusinessDetail();
    if (businessDetail) {
      const response = await dispatch(
        getSingleOffer({ payload: Number(searchParams.get('id')) })
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
      getAllOfferComment({ payload: searchParams.get('id') })
    );
    setComments(response?.payload);
  };

  return {
    offerId: searchParams.get('id'),
    data,
    getOfferStatusClass,
    comments,
    fileInputRef,
    handleUploadButtonClick,
    offerAttachment
  };
}
