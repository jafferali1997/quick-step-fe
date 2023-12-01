'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DOCUMENT_TABS from '@/common/constants/document-tabs.constant';
import CurrentData from '@/common/utils/current-date/current-date';
import { deleteDisclaimer } from '@/provider/features/disclaimer/disclaimer.slice';
import {
  createOfferBody,
  deleteOfferBody,
  getAllOfferBody,
  updateOfferBody
} from '@/provider/features/offer-body/offer-body.slice';
import {
  createOfferDisclaimer,
  getAllOfferDisclaimer,
  updateOfferDisclaimer
} from '@/provider/features/offer-disclaimer/offer-disclaimer.slice';
import { addPageStructure, getSingleOffer } from '@/provider/features/offer/offer.slice';

export default function useFooterDetails(handleTabClick, handleTabCompleted) {
  const ref = useRef(null);
  const confirmationRef = useRef(null);
  const editorRef = useRef(null);
  const editorRefTerms = useRef(null);
  const editorRefCopy = useRef(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [isSubmit, setIsSubmit] = useState(false);
  const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [allOfferDisclaimer, setAllOfferDisclaimer] = useState([]);
  const [termsAndConditions, setTermsAndConditions] = useState(
    "<p><strong>Payment terms:</strong> Payment is due within 30 days from the date of invoice.</p> <p><strong>Delivery:</strong> Delivery will be made within the time frame agreed upon by both parties.</p> <p><strong>Warranty:</strong> All products are covered by a manufacturer's warranty.</p>"
  );
  const [copyRight, setCopyRight] = useState(
    '<p>This document and its contents are the property of [Company Name] and are protected under copyright law. Any unauthorized use, reproduction, or distribution of this document or its contents is strictly prohibited.<p>'
  );
  const [id, setId] = useState('');

  // Body states
  const [deliveryDate, setDeliveryDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [openBodyPopUp, setOpenBodyPop] = useState(false);
  const [bodyTitle, setBodyTitle] = useState('');
  const [allBodyOffer, setAllBodyOffer] = useState([]);
  const [bodyOpen, setBodyOpen] = useState(false);
  const [selectedBodyOffer, setSelectedBodyOffer] = useState('');
  const [bodyForEdit, setBodyForEdit] = useState('');
  const [bodyOfferId, setBodyOfferId] = useState('');
  const [bodyDescription, setBodyDescription] = useState('');

  // Dislaimer States
  const [openDisclaimerPopup, setOpenDisclaimerPopup] = useState(false);
  const [disclaimerTitle, setDisclaimerTitle] = useState('');
  const [selectedDisclaimerOffer, setSelectedDisclaimerOffer] = useState('');
  const [disclaimerForEdit, setDisclaimerForEdit] = useState('');
  const [discalimerOfferId, setDiscalimerOfferId] = useState('');

  const [disclaimerDescription, setDisclaimerDescription] = useState();

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
      singleOfferHandler();
    }
  }, [searchParams, allOfferDisclaimer, allOfferDisclaimer]);

  useEffect(() => {
    handleGetAllOfferBody();
    singleOfferHandler();
    handleGetAllOfferDisclaimer();
    setExpiryDate(CurrentData());
    setDeliveryDate(CurrentData());
  }, []);

  useEffect(() => {
    setBodyOfferId(allBodyOffer && allBodyOffer.length && allBodyOffer[0]?.id);
    setDiscalimerOfferId(
      allOfferDisclaimer && allOfferDisclaimer.length && allOfferDisclaimer[0]?.id
    );
  }, [searchParams, allOfferDisclaimer, allOfferDisclaimer]);

  const singleOfferHandler = async () => {
    if (Number(searchParams.get('id'))) {
      const response = await dispatch(
        getSingleOffer({ payload: id || Number(searchParams.get('id')) })
      );

      // For Body
      response?.payload?.deliveryDate && setDeliveryDate(response?.payload?.deliveryDate);
      response?.payload?.expiryDate && setExpiryDate(response?.payload?.expiryDate);
      response?.payload?.offerBody &&
        setBodyDescription(response?.payload?.offerBody.bodyDescription);
      response?.payload.termsAndConditions &&
        setTermsAndConditions(response?.payload.termsAndConditions);
      response?.payload.copyRight && setCopyRight(response?.payload.copyRight);
      setBodyOfferId(
        selectedBodyOffer?.id || response.payload.offerBodyId || allBodyOffer[0]?.id
      );
      setSelectedBodyOffer(
        selectedBodyOffer || response?.payload?.offerBody || allBodyOffer[0]
      );

      // For Disclaimer
      response?.payload?.offerBody &&
        setDisclaimerDescription(response?.payload?.offerBody.disclaimerDescription);
      response?.payload.termsAndConditions &&
        setDiscalimerOfferId(
          selectedDisclaimerOffer?.id ||
            response.payload.offerDisclaimerId ||
            allOfferDisclaimer[0]?.id
        );
      setSelectedDisclaimerOffer(
        selectedDisclaimerOffer ||
          response?.payload?.offerDisclaimer ||
          allOfferDisclaimer[0]
      );
    }
  };

  const handleTermsAndConditionChange = (content) => {
    setTermsAndConditions(content);
  };

  const handleCopyRightChange = (content) => {
    if (content.length <= 575) {
      setCopyRight(content);
    }
  };

  // Functions for Offer body
  const handleAddBodyPopUp = () => {
    setOpenBodyPop(true);
    setBodyTitle('');
    setBodyDescription('');
  };

  const handleSelectedBodyOffer = (offer) => {
    setBodyDescription(offer.bodyDescription);
    setSelectedBodyOffer(offer);
    setBodyOfferId(offer.id);
    setBodyForEdit(offer.id);
    setBodyOpen(false);
  };

  const handleBodyTitle = (e) => {
    if (e.target.value.length <= 256) {
      setBodyTitle(e.target.value);
    }
  };

  const handleAddBody = async () => {
    const payload = {
      bodyTitle,
      bodyDescription
    };

    const response = bodyForEdit
      ? await dispatch(
          updateOfferBody({
            payload,
            id: bodyForEdit
          })
        )
      : await dispatch(createOfferBody({ payload }));

    if (response?.meta?.requestStatus === 'fulfilled') {
      handleClose();
      bodyForEdit &&
        setSelectedBodyOffer({
          id: bodyOfferId,
          bodyTitle,
          bodyDescription
        });
    }
  };

  const handleBodyChange = (content) => {
    if (content.length <= 5000) {
      setBodyDescription(content);
    }
  };

  const handleDeleteOfferBody = async (id) => {
    if (bodyForEdit) {
      const response = await dispatch(
        deleteOfferBody({
          payload: id
        })
      );
      if (response?.meta?.requestStatus === 'fulfilled') {
        setSelectedBodyOffer(allOfferDisclaimer && allOfferDisclaimer[0]);
        handleClose();
      }
    } else {
      const response = await dispatch(
        deleteDisclaimer({
          payload: id
        })
      );
      if (response?.meta?.requestStatus === 'fulfilled') {
        setSelectedDisclaimerOffer(allOfferDisclaimer && allOfferDisclaimer[0]);
        handleClose();
      }
    }
  };

  const handleEditOfferBody = async (offer) => {
    if (offer.id) {
      setOpenBodyPop(true);
      setBodyForEdit(offer.id);
      setBodyOfferId(offer.id);
      setBodyTitle(offer.bodyTitle);
      setBodyDescription(offer.bodyDescription);
    }
  };

  const handleDeleteBody = async () => {
    setOpenConfirmationPopup(true);
  };

  const handleDeliveryDate = (event) => {
    setDeliveryDate(event.target.value);
  };

  const handleExpiryDate = (event) => {
    setExpiryDate(event.target.value);
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

  // Functions for Offer disclaimer
  const handleAddDisclaimer = async () => {
    const payload = {
      disclaimerTitle,
      disclaimerDescription
    };

    const response = disclaimerForEdit
      ? await dispatch(
          updateOfferDisclaimer({
            payload,
            id: disclaimerForEdit
          })
        )
      : await dispatch(createOfferDisclaimer({ payload }));

    if (response?.meta?.requestStatus === 'fulfilled') {
      handleClose();
      disclaimerForEdit &&
        setSelectedDisclaimerOffer({
          id: discalimerOfferId,
          disclaimerTitle,
          disclaimerDescription
        });
    }
  };

  const handleGetAllOfferDisclaimer = async () => {
    const response = await dispatch(
      getAllOfferDisclaimer({
        payload: {
          page: 1,
          pageSize: 50,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: ''
        }
      })
    );

    // Extract the array of offer bodies from the response payload
    const offerBodies = response.payload;

    // Find the index of the offer body with the title "Disclaimer Text"
    const defaultTextIndex = offerBodies.findIndex(
      (offerBody) => offerBody.disclaimerTitle === 'Disclaimer Text'
    );

    // If the offer with the title "Disclaimer Text" is found, move it to the beginning
    if (defaultTextIndex !== -1) {
      const defaultTextOffer = offerBodies.splice(defaultTextIndex, 1)[0];
      offerBodies.unshift(defaultTextOffer);
    }

    setAllOfferDisclaimer(offerBodies);
  };

  const handleDisclaimerChange = (content) => {
    if (content.length <= 5000) {
      setDisclaimerDescription(content);
    }
  };

  const handleDeleteDisclaimer = async () => {
    setOpenConfirmationPopup(true);
  };

  const handleEditOfferDisclaimer = async (offer) => {
    if (offer.id) {
      setOpenDisclaimerPopup(true);
      setDiscalimerOfferId(offer.id);
      setDisclaimerTitle(offer.disclaimerTitle);
      setSelectedDisclaimerOffer(offer.disclaimerDescription);
    }
  };

  const handleSelectedDisclaimerOffer = (offer) => {
    setDisclaimerTitle(offer.disclaimerTitle);
    setDisclaimerDescription(offer.disclaimerDescription);
    setSelectedDisclaimerOffer(offer);
    setDiscalimerOfferId(offer.id);
    setDisclaimerForEdit(offer.id);
  };

  const handleClose = () => {
    setOpenBodyPop(false);
    setBodyForEdit('');
    setBodyTitle('');
    setBodyDescription('');
    setOpenConfirmationPopup(false);
    handleGetAllOfferBody();
    setDiscalimerOfferId('');

    setOpenDisclaimerPopup(false);
    setDisclaimerForEdit('');
    setDisclaimerTitle('');
    setDisclaimerDescription('');
    handleGetAllOfferDisclaimer();
  };

  const handleAddDiscalimerPopUp = () => {
    setOpenDisclaimerPopup(true);
    setDiscalimerOfferId('');
  };

  const handleDisclaimerTitle = (e) => {
    if (e.target.value.length <= 256) {
      setDisclaimerTitle(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      addPageStructure({
        payload: {
          offerId: Number(id),
          deliveryDate,
          expiryDate,
          offerBodyId: bodyOfferId,
          offerDisclaimerId: Number(discalimerOfferId),
          termsAndConditions,
          copyRight
        }
      })
    );
    if (response?.meta?.requestStatus === 'fulfilled') {
      handleTabClick(DOCUMENT_TABS.PREVIEW);
      handleTabCompleted(DOCUMENT_TABS.PAGE_STRUCTURE);
    }
  };

  return {
    isSubmit,
    setIsSubmit,
    onSubmit,
    ref,
    editorRef,
    bodyTitle,
    bodyDescription,
    disclaimerDescription,
    setBodyTitle,
    setBodyDescription,
    handleBodyChange,
    handleDisclaimerChange,
    handleDeleteOfferBody,
    handleAddBody,
    disclaimerOpen,
    setDisclaimerOpen,
    allOfferDisclaimer,
    bodyOfferId,
    handleEditOfferBody,
    handleSelectedBodyOffer,
    handleSelectedDisclaimerOffer,
    selectedBodyOffer,
    termsAndConditions,
    handleTermsAndConditionChange,
    handleCopyRightChange,
    copyRight,
    editorRefTerms,
    editorRefCopy,
    confirmationRef,
    openConfirmationPopup,
    setOpenConfirmationPopup,
    handleAddBodyPopUp,
    handleAddDiscalimerPopUp,
    handleClose,
    handleBodyTitle,
    handleDisclaimerTitle,
    disclaimerTitle,
    openBodyPopUp,
    openDisclaimerPopup,
    allBodyOffer,
    bodyOpen,
    setBodyOpen,
    bodyForEdit,
    handleDeleteBody,
    handleEditOfferDisclaimer,
    selectedDisclaimerOffer,
    handleDeleteDisclaimer,
    handleAddDisclaimer,
    discalimerOfferId,
    deliveryDate,
    expiryDate,
    handleDeliveryDate,
    handleExpiryDate
  };
}
