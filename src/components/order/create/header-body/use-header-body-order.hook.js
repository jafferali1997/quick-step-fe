'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import { createHeaderBody, getSingleOrder } from '@/provider/features/order/order.slice';
import {
  createOrderBody,
  deleteOrderBody,
  getAllOrderBody,
  updateOrderBody
} from '@/provider/features/order-body/order-body.slice';

export default function useHeaderBodyOrder({ handleTabClick, handleTabCompleted }) {
  const ref = useRef(null);
  const confirmationRef = useRef(null);
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [isSubmit, setIsSubmit] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [allBodyOffer, setAllBodyOffer] = useState([]);
  const [offerId, setOfferId] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState();
  const [business, setBusiness] = useState('');
  const [bodyTitle, setBodyTitle] = useState('');
  const [forEdit, setForEdit] = useState('');
  const [bodyDescription, setBodyDescription] = useState(
    '<p style="font-size: 14px; font-weight: 500;">Dear Sir or Madam, </p>  <p> As discussed, we would like to make you the following offer</p>'
  );
  const [id, setId] = useState('');

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
      singleOfferHandler(Number(searchParams.get('id')));
    }
  }, [searchParams, allBodyOffer]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenPopup(false);
        setDisclaimerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    getCurrentBusinessDetail();
  }, []);

  useEffect(() => {
    handleGetAllOfferBody();
  }, [openPopup]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setDeliveryDate(formattedDate);
  }, []);

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

  const singleOfferHandler = async (id) => {
    if (id) {
      const response = await dispatch(
        getSingleOrder({ payload: id || Number(searchParams.get('id')) })
      );
      setOfferId(selectedOffer?.id || response.payload.orderBodyId || allBodyOffer[0].id);
      setSelectedOffer(selectedOffer || response?.payload.orderBody || allBodyOffer[0]);
      response?.payload.orderDate && setDeliveryDate(response?.payload.orderDate);
    }
  };

  const handleDuplicateDeliveryDate = (e) => {
    setDeliveryDate(e.target.value);
  };

  const handleAddBodyText = async () => {
    const payload = {
      bodyTitle,
      bodyDescription: editorRef.current && editorRef.current.getContent()
    };

    const response = forEdit
      ? await dispatch(
          updateOrderBody({
            payload,
            id: forEdit
          })
        )
      : await dispatch(createOrderBody({ payload }));

    if (response?.meta?.requestStatus === 'fulfilled') {
      editorRef.current && editorRef.current.setContent('');
      setOpenPopup(false);
      forEdit &&
        setSelectedOffer({
          id: offerId,
          bodyTitle,
          bodyDescription
        });
    }
  };

  const handleGetAllOfferBody = async () => {
    const response = await dispatch(
      getAllOrderBody({
        payload: {
          page: 1,
          pageSize: 100,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: '',
          attributes: []
        }
      })
    );
    // Extract the array of offer bodies from the response payload
    const offerBodies = response.payload;

    // Find the index of the offer body with the title "Default Text"
    const defaultTextIndex = offerBodies.findIndex(
      (offerBody) => offerBody.bodyTitle === 'Default Text'
    );

    // If the offer with the title "Default Text" is found, move it to the beginning
    if (defaultTextIndex !== -1) {
      const defaultTextOffer = offerBodies.splice(defaultTextIndex, 1)[0];
      offerBodies.unshift(defaultTextOffer);
    }

    setAllBodyOffer(offerBodies);
  };

  const handleEditorChange = (content) => {
    if (content.length <= 5000) {
      setBodyDescription(content);
    }
  };

  const handleDeleteOfferBody = async (id) => {
    const response = await dispatch(
      deleteOrderBody({
        payload: id
      })
    );
    if (response?.meta?.requestStatus === 'fulfilled') {
      setOpenPopup(false);
      setOfferId('');
      setBodyTitle('');
      setBodyDescription('');
      setOpenConfirmationPopup(false);
      handleGetAllOfferBody();
      setForEdit('');
      setSelectedOffer(allBodyOffer && allBodyOffer[0]);
    }
  };

  const handleEditOfferBody = async (offer) => {
    if (offer) {
      setOpenPopup(true);
      setForEdit(offer.id);
      setBodyTitle(offer.bodyTitle);
      setBodyDescription(offer.bodyDescription);
    }
  };

  const handleSelectedOffer = (offer) => {
    setSelectedOffer(offer);
    setOfferId(offer.id);
    setForEdit(offer.id);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      createHeaderBody({
        payload: {
          orderId: Number(id),
          orderBodyId: Number(offerId),
          orderDate: deliveryDate
        }
      })
    );
    if (response?.meta?.requestStatus === 'fulfilled') {
      handleTabClick('lineItems');
      handleTabCompleted('headerBody');
    }
  };

  const handleClose = () => {
    setOpenPopup(false);
    setForEdit('');
    setBodyTitle('');
    setBodyDescription('');
  };

  const handleAddBodyTextPopUp = () => {
    setOpenPopup(true);
    setForEdit('');
    setBodyTitle('');
    setBodyDescription('');
  };

  const handleBodyTitle = (e) => {
    if (e.target.value.length <= 256) {
      setBodyTitle(e.target.value);
    }
  };

  return {
    isSubmit,
    setIsSubmit,
    onSubmit,
    business,
    openPopup,
    setOpenPopup,
    disclaimerOpen,
    setDisclaimerOpen,
    ref,
    handleAddBodyText,
    bodyTitle,
    setBodyTitle,
    bodyDescription,
    setBodyDescription,
    editorRef,
    allBodyOffer,
    handleEditOfferBody,
    handleEditorChange,
    offerId,
    handleDeleteOfferBody,
    handleSelectedOffer,
    selectedOffer,
    handleDuplicateDeliveryDate,
    deliveryDate,
    confirmationRef,
    openConfirmationPopup,
    setOpenConfirmationPopup,
    setOfferId,
    forEdit,
    setForEdit,
    handleClose,
    handleAddBodyTextPopUp,
    handleBodyTitle
  };
}
