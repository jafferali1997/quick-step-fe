'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import {
  createHeaderBody,
  getSingleInvoice
} from '@/provider/features/invoice/invoice.slice';
import {
  createBody,
  deleteBody,
  getAllBody,
  updateBody
} from '@/provider/features/body/body.slice';

export default function useHeaderBody({ handleTabClick, handleTabCompleted }) {
  const ref = useRef(null);
  const confirmationRef = useRef(null);
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [isSubmit, setIsSubmit] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState('');
  const [allBodyInvoice, setAllBodyInvoice] = useState([]);
  const [invoiceId, setInvoiceId] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState();
  const [forEdit, setForEdit] = useState('');
  const [business, setBusiness] = useState('');
  const [bodyTitle, setBodyTitle] = useState('');
  const [bodyDescription, setBodyDescription] = useState(
    '<p style="font-size: 14px; font-weight: 500;">Dear Sir or Madam, </p>  <p> As discussed, we would like to make you the following invoice</p>'
  );
  const [id, setId] = useState('');

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
      singleInvoiceHandler(Number(searchParams.get('id')));
    }
  }, [searchParams, allBodyInvoice]);

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
    handleGetAllInvoiceBody();
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

  const singleInvoiceHandler = async (id) => {
    if (id) {
      const response = await dispatch(
        getSingleInvoice({ payload: id || Number(searchParams.get('id')) })
      );
      response?.payload.invoiceDate && setDeliveryDate(response?.payload.invoiceDate);
      setInvoiceId(
        selectedInvoice?.id || response?.payload.invoiceBodyId || allBodyInvoice[0]?.id
      );
      setSelectedInvoice(
        selectedInvoice || response?.payload.invoiceBody || allBodyInvoice[0]
      );
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
          updateBody({
            payload,
            id: forEdit
          })
        )
      : await dispatch(createBody({ payload }));
    if (response?.meta?.requestStatus === 'fulfilled') {
      editorRef.current && editorRef.current.setContent('');
      setOpenPopup(false);
      forEdit &&
        setSelectedInvoice({
          id: invoiceId,
          bodyTitle,
          bodyDescription
        });
    }
  };

  const handleGetAllInvoiceBody = async () => {
    const response = await dispatch(
      getAllBody({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: { documentType: 'INVOICE' }
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

  const handleEditorChange = (content) => {
    if (content.length <= 5000) {
      setBodyDescription(content);
    }
  };

  const handleDeleteInvoiceBody = async (id) => {
    const response = await dispatch(
      deleteBody({
        payload: id
      })
    );
    if (response?.meta?.requestStatus === 'fulfilled') {
      setOpenPopup(false);
      setInvoiceId('');
      setBodyTitle('');
      setBodyDescription('');
      setOpenConfirmationPopup(false);
      handleGetAllInvoiceBody();
      setForEdit('');
      setSelectedInvoice(allBodyInvoice && allBodyInvoice[0]);
    }
  };

  const handleAddBodyTextPopUp = () => {
    setOpenPopup(true);
    setForEdit('');
    setBodyTitle('');
    setBodyDescription('');
  };

  const handleEditInvoiceBody = async (invoice) => {
    if (invoice.id) {
      setOpenPopup(true);
      setForEdit(invoice.id);
      setBodyTitle(invoice.title);
      setBodyDescription(invoice.description);
    }
  };

  const handleSelectedInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setInvoiceId(invoice.id);
    setForEdit(invoice.id);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      createHeaderBody({
        payload: {
          invoiceId: Number(id),
          invoiceBodyId: Number(invoiceId),
          invoiceDate: deliveryDate
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
    allBodyInvoice,
    handleEditInvoiceBody,
    handleEditorChange,
    invoiceId,
    handleDeleteInvoiceBody,
    handleSelectedInvoice,
    selectedInvoice,
    handleDuplicateDeliveryDate,
    deliveryDate,
    confirmationRef,
    openConfirmationPopup,
    setOpenConfirmationPopup,
    setInvoiceId,
    forEdit,
    handleAddBodyTextPopUp,
    handleClose,
    handleBodyTitle
  };
}
