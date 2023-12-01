'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import {
  createOfferBody,
  deleteOfferBody,
  getAllOfferBody,
  updateOfferBody
} from '@/provider/features/offer-body/offer-body.slice';
import { createHeaderBody, getSingleOffer } from '@/provider/features/offer/offer.slice';

export default function useHeaderBody({ handleTabClick, handleTabCompleted }) {
  const ref = useRef(null);
  const confirmationRef = useRef(null);
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [isSubmit, setIsSubmit] = useState(false);
  const [bodytextPopup, setBodyTextPopup] = useState(false);
  const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [allBodyOffer, setAllBodyOffer] = useState([]);
  const [offerId, setOfferId] = useState('');
  const [forEdit, setForEdit] = useState('');
  const [deliveryDate, setDeliveryDate] = useState();
  const [business, setBusiness] = useState('');
  const [bodyTitle, setBodyTitle] = useState('');
  const [bodyDescription, setBodyDescription] = useState(
    '<p style="font-size: 14px; font-weight: 500;">Dear Sir or Madam, </p>  <p> As discussed, we would like to make you the following offer</p>'
  );
  const [id, setId] = useState('');

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
      singleOfferHandler(Number(searchParams.get('id')));
    }
  }, [searchParams, allBodyOffer, forEdit]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setBodyTextPopup(false);
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
  }, [bodytextPopup, forEdit]);

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
        getSingleOffer({ payload: id || Number(searchParams.get('id')) })
      );
      response?.payload.offerDate && setDeliveryDate(response?.payload.offerDate);
      setOfferId(
        selectedOffer?.id || response?.payload.offerBodyId || allBodyOffer[0]?.id
      );
      setSelectedOffer(selectedOffer || response?.payload.offerBody || allBodyOffer[0]);
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
          updateOfferBody({
            payload,
            id: forEdit
          })
        )
      : await dispatch(createOfferBody({ payload }));
    if (response?.meta?.requestStatus === 'fulfilled') {
      editorRef.current && editorRef.current.setContent('');
      setBodyTextPopup(false);
      setBodyTextPopup(false);
      handleGetAllOfferBody();
      forEdit &&
        setSelectedOffer({
          id: offerId,
          bodyTitle,
          bodyDescription
        });
    }
  };

  const handleAddBodyTextPopUp = () => {
    setBodyTextPopup(true);
    setBodyTextPopup(true);
    setForEdit('');
    setBodyTitle('');
    setBodyDescription('');
  };

  const handleGetAllOfferBody = async () => {
    const response = await dispatch(
      getAllOfferBody({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: ''
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
      deleteOfferBody({
        payload: id
      })
    );
    if (response?.meta?.requestStatus === 'fulfilled') {
      setBodyTextPopup(false);
      setOfferId('');
      setForEdit('');
      setBodyTitle('');
      setBodyDescription('');
      setOpenConfirmationPopup(false);
      handleGetAllOfferBody();
      setSelectedOffer(allBodyOffer && allBodyOffer[0]);
    }
  };

  const handleEditOfferBody = async (offer) => {
    if (offer) {
      setBodyTextPopup(true);
      setForEdit(offer.id);
      setBodyTitle(offer.bodyTitle);
      setBodyDescription(offer.bodyDescription);
      setSelectedOffer(offer);
    }
  };

  const handleSelectedOffer = (offer) => {
    setSelectedOffer(offer);
    setForEdit(offer.id);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      createHeaderBody({
        payload: {
          offerId: Number(id),
          offerBodyId: Number(offerId),
          offerDate: deliveryDate
        }
      })
    );
    if (response?.meta?.requestStatus === 'fulfilled') {
      handleTabClick('lineItems');
      handleTabCompleted('headerBody');
    }
  };

  const handleClose = () => {
    setBodyTextPopup(false);
    setBodyTextPopup(false);
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
    bodytextPopup,
    setBodyTextPopup,
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
    handleAddBodyTextPopUp,
    handleClose,
    handleBodyTitle
  };
}
