'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { getSingleBusinessDetail } from '@/provider/features/business-detail/business-detail.slice';
import {
  createHeaderBody,
  getSingleDeliveryNotes
} from '@/provider/features/delivery-notes/delivery-notes.slice';
import {
  createDeliveryNotesBody,
  deleteDeliveryNotesBody,
  getAllDeliveryNotesBody,
  updateDeliveryNotesBody
} from '@/provider/features/delivery-notes-body/delivery-notes-body.slice';

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
  const [selectedDeliveryNotes, setSelectedDeliveryNotes] = useState('');
  const [allBodyDeliveryNotes, setAllBodyDeliveryNotes] = useState([]);
  const [deliveryNotesId, setDeliveryNotesId] = useState('');
  const [forEdit, setForEdit] = useState('');
  const [deliveryDate, setDeliveryDate] = useState();
  const [business, setBusiness] = useState('');
  const [bodyTitle, setBodyTitle] = useState('');
  const [bodyDescription, setBodyDescription] = useState(
    '<p style="font-size: 14px; font-weight: 500;">Dear Sir or Madam, </p>  <p> we deliver the following items to our terms and conditions.</p>'
  );
  const [id, setId] = useState('');

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
      singleDeliveryNotesHandler(Number(searchParams.get('id')));
    }
  }, [searchParams, allBodyDeliveryNotes]);

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
    handleGetAllDeliveryNotesBody();
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

  const singleDeliveryNotesHandler = async (id) => {
    if (id) {
      const response = await dispatch(
        getSingleDeliveryNotes({ payload: id || Number(searchParams.get('id')) })
      );

      response?.payload.deliveryNotesDate &&
        setDeliveryDate(response?.payload.deliveryNotesDate);
      setDeliveryNotesId(
        selectedDeliveryNotes?.id ||
          response?.payload.deliveryNotesBodyId ||
          selectedDeliveryNotes?.id ||
          allBodyDeliveryNotes[0]?.id
      );
      setSelectedDeliveryNotes(
        selectedDeliveryNotes ||
          response?.payload.deliveryNotesBody ||
          allBodyDeliveryNotes[0]
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
          updateDeliveryNotesBody({
            payload,
            id: forEdit
          })
        )
      : await dispatch(createDeliveryNotesBody({ payload }));

    if (response?.meta?.requestStatus === 'fulfilled') {
      editorRef.current && editorRef.current.setContent('');
      setOpenPopup(false);
      forEdit &&
        setSelectedDeliveryNotes({
          id: deliveryNotesId,
          bodyTitle,
          bodyDescription
        });
    }
  };

  const handleGetAllDeliveryNotesBody = async () => {
    const response = await dispatch(
      getAllDeliveryNotesBody({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: '',
          attributes: []
        }
      })
    );

    // Extract the array of deliveryNotes bodies from the response payload
    const deliveryNotesBodies = response.payload;

    // Find the index of the deliveryNotes body with the title "Default Text"
    const defaultTextIndex = deliveryNotesBodies.findIndex(
      (deliveryNotesBody) => deliveryNotesBody.bodyTitle === 'Default Text'
    );

    // If the deliveryNotes with the title "Default Text" is found, move it to the beginning
    if (defaultTextIndex !== -1) {
      const defaultTextDeliveryNotes = deliveryNotesBodies.splice(defaultTextIndex, 1)[0];
      deliveryNotesBodies.unshift(defaultTextDeliveryNotes);
    }

    setAllBodyDeliveryNotes(deliveryNotesBodies);
  };

  const handleEditorChange = (content) => {
    if (content.length <= 5000) {
      setBodyDescription(content);
    }
  };

  const handleDeleteDeliveryNotesBody = async (id) => {
    const response = await dispatch(
      deleteDeliveryNotesBody({
        payload: id
      })
    );
    if (response?.meta?.requestStatus === 'fulfilled') {
      setOpenPopup(false);
      setDeliveryNotesId('');
      setBodyTitle('');
      setBodyDescription('');
      setOpenConfirmationPopup(false);
      handleGetAllDeliveryNotesBody();
      setForEdit('');
      setSelectedDeliveryNotes(allBodyDeliveryNotes && allBodyDeliveryNotes[0]);
    }
  };

  const handleAddBodyTextPopUp = () => {
    setOpenPopup(true);
    setForEdit('');
    setBodyTitle('');
    setBodyDescription('');
  };

  const handleEditDeliveryNotesBody = async (deliveryNotes) => {
    if (deliveryNotes.id) {
      setOpenPopup(true);
      setForEdit(deliveryNotes.id);
      setBodyTitle(deliveryNotes.bodyTitle);
      setBodyDescription(deliveryNotes.bodyDescription);
    }
  };

  const handleSelectedDeliveryNotes = (deliveryNotes) => {
    setSelectedDeliveryNotes(deliveryNotes);
    setDeliveryNotesId(deliveryNotes.id);
    setForEdit(deliveryNotes.id);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      createHeaderBody({
        payload: {
          deliveryNotesId: Number(id),
          deliveryNotesBodyId: Number(deliveryNotesId),
          deliveryNotesDate: deliveryDate
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
    allBodyDeliveryNotes,
    handleEditDeliveryNotesBody,
    handleEditorChange,
    deliveryNotesId,
    handleDeleteDeliveryNotesBody,
    handleSelectedDeliveryNotes,
    selectedDeliveryNotes,
    handleDuplicateDeliveryDate,
    deliveryDate,
    confirmationRef,
    openConfirmationPopup,
    setOpenConfirmationPopup,
    setDeliveryNotesId,
    forEdit,
    handleAddBodyTextPopUp,
    handleClose,
    handleBodyTitle
  };
}
