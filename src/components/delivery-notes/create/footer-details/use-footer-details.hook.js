'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteDisclaimer } from '@/provider/features/disclaimer/disclaimer.slice';
import DOCUMENT_TABS from '@/common/constants/document-tabs.constant';

import CurrentData from '@/common/utils/current-date/current-date';
import {
  createDeliveryNotesBody,
  deleteDeliveryNotesBody,
  getAllDeliveryNotesBody,
  updateDeliveryNotesBody
} from '@/provider/features/delivery-notes-body/delivery-notes-body.slice';
import {
  createDeliveryNotesDisclaimer,
  getAllDeliveryNotesDisclaimer,
  updateDeliveryNotesDisclaimer
} from '@/provider/features/delivery-notes-disclaimer/delivery-notes-disclaimer.slice';
import {
  addPageStructure,
  getSingleDeliveryNotes
} from '@/provider/features/delivery-notes/delivery-notes.slice';

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
  const [allDeliveryNotesDisclaimer, setAllDeliveryNotesDisclaimer] = useState([]);
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
  const [allBodyDeliveryNotes, setAllBodyDeliveryNotes] = useState([]);
  const [bodyOpen, setBodyOpen] = useState(false);
  const [selectedBodyDeliveryNotes, setSelectedBodyDeliveryNotes] = useState('');
  const [bodyForEdit, setBodyForEdit] = useState('');
  const [bodyDeliveryNotesId, setBodyDeliveryNotesId] = useState('');
  const [bodyDescription, setBodyDescription] = useState('');

  // Dislaimer States
  const [openDisclaimerPopup, setOpenDisclaimerPopup] = useState(false);
  const [disclaimerTitle, setDisclaimerTitle] = useState('');
  const [selectedDisclaimerDeliveryNotes, setSelectedDisclaimerDeliveryNotes] =
    useState('');
  const [disclaimerForEdit, setDisclaimerForEdit] = useState('');
  const [discalimerDeliveryNotesId, setDiscalimerDeliveryNotesId] = useState('');

  const [disclaimerDescription, setDisclaimerDescription] = useState();

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
      singleDeliveryNotesHandler();
    }
  }, [searchParams, allDeliveryNotesDisclaimer, allDeliveryNotesDisclaimer]);

  useEffect(() => {
    handleGetAllDeliveryNotesBody();
    singleDeliveryNotesHandler();
    handleGetAllDeliveryNotesDisclaimer();
    setExpiryDate(CurrentData());
    setDeliveryDate(CurrentData());
  }, []);

  useEffect(() => {
    setBodyDeliveryNotesId(
      allBodyDeliveryNotes && allBodyDeliveryNotes.length && allBodyDeliveryNotes[0]?.id
    );
    setDiscalimerDeliveryNotesId(
      allDeliveryNotesDisclaimer &&
        allDeliveryNotesDisclaimer.length &&
        allDeliveryNotesDisclaimer[0]?.id
    );
  }, [searchParams, allDeliveryNotesDisclaimer, allDeliveryNotesDisclaimer]);

  const singleDeliveryNotesHandler = async () => {
    if (Number(searchParams.get('id'))) {
      const response = await dispatch(
        getSingleDeliveryNotes({ payload: id || Number(searchParams.get('id')) })
      );

      // For Body
      response?.payload?.deliveryDate && setDeliveryDate(response?.payload?.deliveryDate);
      response?.payload?.expiryDate && setExpiryDate(response?.payload?.expiryDate);
      response?.payload?.deliveryNotesBody &&
        setBodyDescription(response?.payload?.deliveryNotesBody.bodyDescription);
      response?.payload.termsAndConditions &&
        setTermsAndConditions(response?.payload.termsAndConditions);
      response?.payload.copyRight && setCopyRight(response?.payload.copyRight);
      setBodyDeliveryNotesId(
        selectedBodyDeliveryNotes?.id ||
          response.payload.deliveryNotesBodyId ||
          allBodyDeliveryNotes[0]?.id
      );
      setSelectedBodyDeliveryNotes(
        selectedBodyDeliveryNotes ||
          response?.payload?.deliveryNotesBody ||
          allBodyDeliveryNotes[0]
      );

      // For Disclaimer
      response?.payload?.deliveryNotesBody &&
        setDisclaimerDescription(
          response?.payload?.deliveryNotesBody.disclaimerDescription
        );
      response?.payload.termsAndConditions &&
        setDiscalimerDeliveryNotesId(
          selectedDisclaimerDeliveryNotes?.id ||
            response.payload.deliveryNotesDisclaimerId ||
            allDeliveryNotesDisclaimer[0]?.id
        );
      setSelectedDisclaimerDeliveryNotes(
        selectedDisclaimerDeliveryNotes ||
          response?.payload?.deliveryNotesDisclaimer ||
          allDeliveryNotesDisclaimer[0]
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

  // Functions for DeliveryNotes body
  const handleAddBodyPopUp = () => {
    setOpenBodyPop(true);
    setBodyTitle('');
    setBodyDescription('');
  };

  const handleSelectedBodyDeliveryNotes = (deliveryNotes) => {
    setBodyDescription(deliveryNotes.bodyDescription);
    setSelectedBodyDeliveryNotes(deliveryNotes);
    setBodyDeliveryNotesId(deliveryNotes.id);
    setBodyForEdit(deliveryNotes.id);
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
          updateDeliveryNotesBody({
            payload,
            id: bodyForEdit
          })
        )
      : await dispatch(createDeliveryNotesBody({ payload }));

    if (response?.meta?.requestStatus === 'fulfilled') {
      handleClose();
      bodyForEdit &&
        setSelectedBodyDeliveryNotes({
          id: bodyDeliveryNotesId,
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

  const handleDeleteDeliveryNotesBody = async (id) => {
    if (bodyForEdit) {
      const response = await dispatch(
        deleteDeliveryNotesBody({
          payload: id
        })
      );
      if (response?.meta?.requestStatus === 'fulfilled') {
        setSelectedBodyDeliveryNotes(
          allDeliveryNotesDisclaimer && allDeliveryNotesDisclaimer[0]
        );
        handleClose();
      }
    } else {
      const response = await dispatch(
        deleteDisclaimer({
          payload: id
        })
      );
      if (response?.meta?.requestStatus === 'fulfilled') {
        setSelectedDisclaimerDeliveryNotes(
          allDeliveryNotesDisclaimer && allDeliveryNotesDisclaimer[0]
        );
        handleClose();
      }
    }
  };

  const handleEditDeliveryNotesBody = async (deliveryNotes) => {
    if (deliveryNotes.id) {
      setOpenBodyPop(true);
      setBodyForEdit(deliveryNotes.id);
      setBodyDeliveryNotesId(deliveryNotes.id);
      setBodyTitle(deliveryNotes.bodyTitle);
      setBodyDescription(deliveryNotes.bodyDescription);
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

  const handleGetAllDeliveryNotesBody = async () => {
    const response = await dispatch(
      getAllDeliveryNotesBody({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: ''
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

  // Functions for DeliveryNotes disclaimer
  const handleAddDisclaimer = async () => {
    const payload = {
      disclaimerTitle,
      disclaimerDescription
    };

    const response = disclaimerForEdit
      ? await dispatch(
          updateDeliveryNotesDisclaimer({
            payload,
            id: disclaimerForEdit
          })
        )
      : await dispatch(createDeliveryNotesDisclaimer({ payload }));

    if (response?.meta?.requestStatus === 'fulfilled') {
      handleClose();
      disclaimerForEdit &&
        setSelectedDisclaimerDeliveryNotes({
          id: discalimerDeliveryNotesId,
          disclaimerTitle,
          disclaimerDescription
        });
    }
  };

  const handleGetAllDeliveryNotesDisclaimer = async () => {
    const response = await dispatch(
      getAllDeliveryNotesDisclaimer({
        payload: {
          page: 1,
          pageSize: 50,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: ''
        }
      })
    );

    // Extract the array of deliveryNotes bodies from the response payload
    const deliveryNotesBodies = response.payload;

    // Find the index of the deliveryNotes body with the title "Disclaimer Text"
    const defaultTextIndex = deliveryNotesBodies.findIndex(
      (deliveryNotesBody) => deliveryNotesBody.disclaimerTitle === 'Disclaimer Text'
    );

    // If the deliveryNotes with the title "Disclaimer Text" is found, move it to the beginning
    if (defaultTextIndex !== -1) {
      const defaultTextDeliveryNotes = deliveryNotesBodies.splice(defaultTextIndex, 1)[0];
      deliveryNotesBodies.unshift(defaultTextDeliveryNotes);
    }

    setAllDeliveryNotesDisclaimer(deliveryNotesBodies);
  };

  const handleDisclaimerChange = (content) => {
    if (content.length <= 5000) {
      setDisclaimerDescription(content);
    }
  };

  const handleDeleteDisclaimer = async () => {
    setOpenConfirmationPopup(true);
  };

  const handleEditDeliveryNotesDisclaimer = async (deliveryNotes) => {
    if (deliveryNotes.id) {
      setOpenDisclaimerPopup(true);
      setDiscalimerDeliveryNotesId(deliveryNotes.id);
      setDisclaimerTitle(deliveryNotes.disclaimerTitle);
      setSelectedDisclaimerDeliveryNotes(deliveryNotes.disclaimerDescription);
    }
  };

  const handleSelectedDisclaimerDeliveryNotes = (deliveryNotes) => {
    setDisclaimerTitle(deliveryNotes.disclaimerTitle);
    setDisclaimerDescription(deliveryNotes.disclaimerDescription);
    setSelectedDisclaimerDeliveryNotes(deliveryNotes);
    setDiscalimerDeliveryNotesId(deliveryNotes.id);
    setDisclaimerForEdit(deliveryNotes.id);
  };

  const handleClose = () => {
    setOpenBodyPop(false);
    setBodyForEdit('');
    setBodyTitle('');
    setBodyDescription('');
    setOpenConfirmationPopup(false);
    handleGetAllDeliveryNotesBody();
    setDiscalimerDeliveryNotesId('');

    setOpenDisclaimerPopup(false);
    setDisclaimerForEdit('');
    setDisclaimerTitle('');
    setDisclaimerDescription('');
    handleGetAllDeliveryNotesDisclaimer();
  };

  const handleAddDiscalimerPopUp = () => {
    setOpenDisclaimerPopup(true);
    setDiscalimerDeliveryNotesId('');
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
          deliveryNotesId: Number(id),
          deliveryDate,
          expiryDate,
          deliveryNotesBodyId: bodyDeliveryNotesId,
          deliveryNotesDisclaimerId: Number(discalimerDeliveryNotesId),
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
    handleDeleteDeliveryNotesBody,
    handleAddBody,
    disclaimerOpen,
    setDisclaimerOpen,
    allDeliveryNotesDisclaimer,
    bodyDeliveryNotesId,
    handleEditDeliveryNotesBody,
    handleSelectedBodyDeliveryNotes,
    handleSelectedDisclaimerDeliveryNotes,
    selectedBodyDeliveryNotes,
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
    allBodyDeliveryNotes,
    bodyOpen,
    setBodyOpen,
    bodyForEdit,
    handleDeleteBody,
    handleEditDeliveryNotesDisclaimer,
    selectedDisclaimerDeliveryNotes,
    handleDeleteDisclaimer,
    handleAddDisclaimer,
    discalimerDeliveryNotesId,
    deliveryDate,
    expiryDate,
    handleDeliveryDate,
    handleExpiryDate
  };
}
