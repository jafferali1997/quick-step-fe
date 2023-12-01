'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DOCUMENT_TABS from '@/common/constants/document-tabs.constant';
import CurrentData from '@/common/utils/current-date/current-date';
import {
  createBody,
  deleteBody,
  getAllBody,
  updateBody
} from '@/provider/features/body/body.slice';
import {
  createDisclaimer,
  deleteDisclaimer,
  getAllDisclaimer,
  updateDisclaimer
} from '@/provider/features/disclaimer/disclaimer.slice';
import {
  addPageStructure,
  getSingleInvoice
} from '@/provider/features/invoice/invoice.slice';

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
  const [allInvoiceDisclaimer, setAllInvoiceDisclaimer] = useState([]);
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
  const [allBodyInvoice, setAllBodyInvoice] = useState([]);
  const [bodyOpen, setBodyOpen] = useState(false);
  const [selectedBodyInvoice, setSelectedBodyInvoice] = useState('');
  const [bodyForEdit, setBodyForEdit] = useState('');
  const [bodyInvoiceId, setBodyInvoiceId] = useState('');
  const [bodyDescription, setBodyDescription] = useState('');

  // Dislaimer States
  const [openDisclaimerPopup, setOpenDisclaimerPopup] = useState(false);
  const [disclaimerTitle, setDisclaimerTitle] = useState('');
  const [selectedDisclaimerInvoice, setSelectedDisclaimerInvoice] = useState('');
  const [disclaimerForEdit, setDisclaimerForEdit] = useState('');
  const [discalimerInvoiceId, setDiscalimerInvoiceId] = useState('');

  const [disclaimerDescription, setDisclaimerDescription] = useState();

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
      singleInvoiceHandler();
    }
  }, [searchParams, allInvoiceDisclaimer, allInvoiceDisclaimer]);

  useEffect(() => {
    handleGetAllInvoiceBody();
    singleInvoiceHandler();
    handleGetAllInvoiceDisclaimer();
    setExpiryDate(CurrentData());
    setDeliveryDate(CurrentData());
  }, []);

  useEffect(() => {
    setBodyInvoiceId(allBodyInvoice && allBodyInvoice.length && allBodyInvoice[0]?.id);
    setDiscalimerInvoiceId(
      allInvoiceDisclaimer && allInvoiceDisclaimer.length && allInvoiceDisclaimer[0]?.id
    );
  }, [searchParams, allInvoiceDisclaimer, allInvoiceDisclaimer]);

  const singleInvoiceHandler = async () => {
    if (Number(searchParams.get('id'))) {
      const response = await dispatch(
        getSingleInvoice({ payload: id || Number(searchParams.get('id')) })
      );

      // For Body
      response?.payload?.deliveryDate && setDeliveryDate(response?.payload?.deliveryDate);
      response?.payload?.expiryDate && setExpiryDate(response?.payload?.expiryDate);
      response?.payload?.invoiceBody &&
        setBodyDescription(response?.payload?.invoiceBody.bodyDescription);
      response?.payload.termsAndConditions &&
        setTermsAndConditions(response?.payload.termsAndConditions);
      response?.payload.copyRight && setCopyRight(response?.payload.copyRight);
      setBodyInvoiceId(
        selectedBodyInvoice?.id || response.payload.invoiceBodyId || allBodyInvoice[0]?.id
      );
      setSelectedBodyInvoice(
        selectedBodyInvoice || response?.payload?.invoiceBody || allBodyInvoice[0]
      );

      // For Disclaimer
      response?.payload?.invoiceBody &&
        setDisclaimerDescription(response?.payload?.invoiceBody.disclaimerDescription);
      response?.payload.termsAndConditions &&
        setDiscalimerInvoiceId(
          selectedDisclaimerInvoice?.id ||
            response.payload.invoiceDisclaimerId ||
            allInvoiceDisclaimer[0]?.id
        );
      setSelectedDisclaimerInvoice(
        selectedDisclaimerInvoice ||
          response?.payload?.invoiceDisclaimer ||
          allInvoiceDisclaimer[0]
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

  // Functions for Invoice body
  const handleAddBodyPopUp = () => {
    setOpenBodyPop(true);
    setBodyTitle('');
    setBodyDescription('');
  };

  const handleSelectedBodyInvoice = (invoice) => {
    setBodyDescription(invoice.bodyDescription);
    setSelectedBodyInvoice(invoice);
    setBodyInvoiceId(invoice.id);
    setBodyForEdit(invoice.id);
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
          updateBody({
            payload,
            id: bodyForEdit
          })
        )
      : await dispatch(createBody({ payload }));

    if (response?.meta?.requestStatus === 'fulfilled') {
      handleClose();
      bodyForEdit &&
        setSelectedBodyInvoice({
          id: bodyInvoiceId,
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

  const handleDeleteInvoiceBody = async (id) => {
    if (bodyForEdit) {
      const response = await dispatch(
        deleteBody({
          payload: id
        })
      );
      if (response?.meta?.requestStatus === 'fulfilled') {
        setSelectedBodyInvoice(allInvoiceDisclaimer && allInvoiceDisclaimer[0]);
        handleClose();
      }
    } else {
      const response = await dispatch(
        deleteDisclaimer({
          payload: id
        })
      );
      if (response?.meta?.requestStatus === 'fulfilled') {
        setSelectedDisclaimerInvoice(allInvoiceDisclaimer && allInvoiceDisclaimer[0]);
        handleClose();
      }
    }
  };

  const handleEditInvoiceBody = async (invoice) => {
    if (invoice.id) {
      setOpenBodyPop(true);
      setBodyForEdit(invoice.id);
      setBodyInvoiceId(invoice.id);
      setBodyTitle(invoice.bodyTitle);
      setBodyDescription(invoice.bodyDescription);
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

  const handleGetAllInvoiceBody = async () => {
    const response = await dispatch(
      getAllBody({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: ''
        }
      })
    );

    // Extract the array of invoice bodies from the response payload
    const invoiceBodies = response.payload;

    // Find the index of the invoice body with the title "Default Text"
    const defaultTextIndex = invoiceBodies.findIndex(
      (invoiceBody) => invoiceBody.bodyTitle === 'Default Text'
    );

    // If the invoice with the title "Default Text" is found, move it to the beginning
    if (defaultTextIndex !== -1) {
      const defaultTextInvoice = invoiceBodies.splice(defaultTextIndex, 1)[0];
      invoiceBodies.unshift(defaultTextInvoice);
    }

    setAllBodyInvoice(invoiceBodies);
  };

  // Functions for Invoice disclaimer
  const handleAddDisclaimer = async () => {
    const payload = {
      disclaimerTitle,
      disclaimerDescription
    };

    const response = disclaimerForEdit
      ? await dispatch(
          updateDisclaimer({
            payload,
            id: disclaimerForEdit
          })
        )
      : await dispatch(createDisclaimer({ payload }));

    if (response?.meta?.requestStatus === 'fulfilled') {
      handleClose();
      disclaimerForEdit &&
        setSelectedDisclaimerInvoice({
          id: discalimerInvoiceId,
          disclaimerTitle,
          disclaimerDescription
        });
    }
  };

  const handleGetAllInvoiceDisclaimer = async () => {
    const response = await dispatch(
      getAllDisclaimer({
        payload: {
          page: 1,
          pageSize: 50,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: ''
        }
      })
    );

    // Extract the array of invoice bodies from the response payload
    const invoiceBodies = response.payload;

    // Find the index of the invoice body with the title "Disclaimer Text"
    const defaultTextIndex = invoiceBodies.findIndex(
      (invoiceBody) => invoiceBody.disclaimerTitle === 'Disclaimer Text'
    );

    // If the invoice with the title "Disclaimer Text" is found, move it to the beginning
    if (defaultTextIndex !== -1) {
      const defaultTextInvoice = invoiceBodies.splice(defaultTextIndex, 1)[0];
      invoiceBodies.unshift(defaultTextInvoice);
    }

    setAllInvoiceDisclaimer(invoiceBodies);
  };

  const handleDisclaimerChange = (content) => {
    if (content.length <= 5000) {
      setDisclaimerDescription(content);
    }
  };

  const handleDeleteDisclaimer = async () => {
    setOpenConfirmationPopup(true);
  };

  const handleEditInvoiceDisclaimer = async (invoice) => {
    if (invoice.id) {
      setOpenDisclaimerPopup(true);
      setDiscalimerInvoiceId(invoice.id);
      setDisclaimerTitle(invoice.disclaimerTitle);
      setSelectedDisclaimerInvoice(invoice.disclaimerDescription);
    }
  };

  const handleSelectedDisclaimerInvoice = (invoice) => {
    setDisclaimerTitle(invoice.disclaimerTitle);
    setDisclaimerDescription(invoice.disclaimerDescription);
    setSelectedDisclaimerInvoice(invoice);
    setDiscalimerInvoiceId(invoice.id);
    setDisclaimerForEdit(invoice.id);
  };

  const handleClose = () => {
    setOpenBodyPop(false);
    setBodyForEdit('');
    setBodyTitle('');
    setBodyDescription('');
    setOpenConfirmationPopup(false);
    handleGetAllInvoiceBody();
    setDiscalimerInvoiceId('');

    setOpenDisclaimerPopup(false);
    setDisclaimerForEdit('');
    setDisclaimerTitle('');
    setDisclaimerDescription('');
    handleGetAllInvoiceDisclaimer();
  };

  const handleAddDiscalimerPopUp = () => {
    setOpenDisclaimerPopup(true);
    setDiscalimerInvoiceId('');
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
          invoiceId: Number(id),
          deliveryDate,
          expiryDate,
          invoiceBodyId: bodyInvoiceId,
          invoiceDisclaimerId: Number(discalimerInvoiceId),
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
    handleDeleteInvoiceBody,
    handleAddBody,
    disclaimerOpen,
    setDisclaimerOpen,
    allInvoiceDisclaimer,
    bodyInvoiceId,
    handleEditInvoiceBody,
    handleSelectedBodyInvoice,
    handleSelectedDisclaimerInvoice,
    selectedBodyInvoice,
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
    allBodyInvoice,
    bodyOpen,
    setBodyOpen,
    bodyForEdit,
    handleDeleteBody,
    handleEditInvoiceDisclaimer,
    selectedDisclaimerInvoice,
    handleDeleteDisclaimer,
    handleAddDisclaimer,
    discalimerInvoiceId,
    deliveryDate,
    expiryDate,
    handleDeliveryDate,
    handleExpiryDate
  };
}
