'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DOCUMENT_TABS from '@/common/constants/document-tabs.constant';
import CurrentData from '@/common/utils/current-date/current-date';
import { deleteDisclaimer } from '@/provider/features/disclaimer/disclaimer.slice';
import {
  createOrderBody,
  deleteOrderBody,
  getAllOrderBody,
  updateOrderBody
} from '@/provider/features/order-body/order-body.slice';
import {
  createOrderDisclaimer,
  getAllOrderDisclaimer,
  updateOrderDisclaimer
} from '@/provider/features/order-disclaimer/order-disclaimer.slice';
import { addPageStructure, getSingleOrder } from '@/provider/features/order/order.slice';

export default function useFooterDetailsOrder(handleTabClick, handleTabCompleted) {
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
  const [allOrderDisclaimer, setAllOrderDisclaimer] = useState([]);
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
  const [allBodyOrder, setAllBodyOrder] = useState([]);
  const [bodyOpen, setBodyOpen] = useState(false);
  const [selectedBodyOrder, setSelectedBodyOrder] = useState('');
  const [bodyForEdit, setBodyForEdit] = useState('');
  const [bodyOrderId, setBodyOrderId] = useState('');
  const [bodyDescription, setBodyDescription] = useState('');

  // Dislaimer States
  const [openDisclaimerPopup, setOpenDisclaimerPopup] = useState(false);
  const [disclaimerTitle, setDisclaimerTitle] = useState('');
  const [selectedDisclaimerOrder, setSelectedDisclaimerOrder] = useState('');
  const [disclaimerForEdit, setDisclaimerForEdit] = useState('');
  const [discalimerOrderId, setDiscalimerOrderId] = useState('');
  const [disclaimerDescription, setDisclaimerDescription] = useState();

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
      singleOrderHandler();
    }
  }, [searchParams, allOrderDisclaimer, allOrderDisclaimer]);

  useEffect(() => {
    handleGetAllOrderBody();
    singleOrderHandler();
    handleGetAllOrderDisclaimer();
    setExpiryDate(CurrentData());
    setDeliveryDate(CurrentData());
  }, []);

  useEffect(() => {
    setBodyOrderId(allBodyOrder && allBodyOrder.length && allBodyOrder[0]?.id);
    setDiscalimerOrderId(
      allOrderDisclaimer && allOrderDisclaimer.length && allOrderDisclaimer[0]?.id
    );
  }, [searchParams, allOrderDisclaimer, allOrderDisclaimer]);

  const singleOrderHandler = async () => {
    if (Number(searchParams.get('id'))) {
      const response = await dispatch(
        getSingleOrder({ payload: id || Number(searchParams.get('id')) })
      );

      // For Body
      response?.payload?.deliveryDate && setDeliveryDate(response?.payload?.deliveryDate);
      response?.payload?.expiryDate && setExpiryDate(response?.payload?.expiryDate);
      response?.payload?.orderBody &&
        setBodyDescription(response?.payload?.orderBody.bodyDescription);
      response?.payload.termsAndConditions &&
        setTermsAndConditions(response?.payload.termsAndConditions);
      response?.payload.copyRight && setCopyRight(response?.payload.copyRight);
      setBodyOrderId(
        selectedBodyOrder?.id || response.payload.orderBodyId || allBodyOrder[0]?.id
      );
      setSelectedBodyOrder(
        selectedBodyOrder || response?.payload?.orderBody || allBodyOrder[0]
      );

      // For Disclaimer
      response?.payload?.orderBody &&
        setDisclaimerDescription(response?.payload?.orderBody.disclaimerDescription);
      response?.payload.termsAndConditions &&
        setDiscalimerOrderId(
          selectedDisclaimerOrder?.id ||
            response.payload.orderDisclaimerId ||
            allOrderDisclaimer[0]?.id
        );
      setSelectedDisclaimerOrder(
        selectedDisclaimerOrder ||
          response?.payload?.orderDisclaimer ||
          allOrderDisclaimer[0]
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

  // Functions for Order body
  const handleAddBodyPopUp = () => {
    setOpenBodyPop(true);
    setBodyTitle('');
    setBodyDescription('');
  };

  const handleSelectedBodyOrder = (order) => {
    setBodyDescription(order.bodyDescription);
    setSelectedBodyOrder(order);
    setBodyOrderId(order.id);
    setBodyForEdit(order.id);
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
          updateOrderBody({
            payload,
            id: bodyForEdit
          })
        )
      : await dispatch(createOrderBody({ payload }));

    if (response?.meta?.requestStatus === 'fulfilled') {
      handleClose();
      bodyForEdit &&
        setSelectedBodyOrder({
          id: bodyOrderId,
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

  const handleDeleteOrderBody = async (id) => {
    if (bodyForEdit) {
      const response = await dispatch(
        deleteOrderBody({
          payload: id
        })
      );
      if (response?.meta?.requestStatus === 'fulfilled') {
        setSelectedBodyOrder(allOrderDisclaimer && allOrderDisclaimer[0]);
        handleClose();
      }
    } else {
      const response = await dispatch(
        deleteDisclaimer({
          payload: id
        })
      );
      if (response?.meta?.requestStatus === 'fulfilled') {
        setSelectedDisclaimerOrder(allOrderDisclaimer && allOrderDisclaimer[0]);
        handleClose();
      }
    }
  };

  const handleEditOrderBody = async (order) => {
    if (order.id) {
      setOpenBodyPop(true);
      setBodyForEdit(order.id);
      setBodyOrderId(order.id);
      setBodyTitle(order.bodyTitle);
      setBodyDescription(order.bodyDescription);
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

  const handleGetAllOrderBody = async () => {
    const response = await dispatch(
      getAllOrderBody({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: ''
        }
      })
    );

    // Extract the array of order bodies from the response payload
    const orderBodies = response.payload;

    // Find the index of the order body with the title "Default Text"
    const defaultTextIndex = orderBodies.findIndex(
      (orderBody) => orderBody.bodyTitle === 'Default Text'
    );

    // If the order with the title "Default Text" is found, move it to the beginning
    if (defaultTextIndex !== -1) {
      const defaultTextOrder = orderBodies.splice(defaultTextIndex, 1)[0];
      orderBodies.unshift(defaultTextOrder);
    }

    setAllBodyOrder(orderBodies);
  };

  // Functions for Order disclaimer
  const handleAddDisclaimer = async () => {
    const payload = {
      disclaimerTitle,
      disclaimerDescription
    };

    const response = disclaimerForEdit
      ? await dispatch(
          updateOrderDisclaimer({
            payload,
            id: disclaimerForEdit
          })
        )
      : await dispatch(createOrderDisclaimer({ payload }));

    if (response?.meta?.requestStatus === 'fulfilled') {
      handleClose();
      disclaimerForEdit &&
        setSelectedDisclaimerOrder({
          id: discalimerOrderId,
          disclaimerTitle,
          disclaimerDescription
        });
    }
  };

  const handleGetAllOrderDisclaimer = async () => {
    const response = await dispatch(
      getAllOrderDisclaimer({
        payload: {
          page: 1,
          pageSize: 50,
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition: ''
        }
      })
    );

    // Extract the array of order bodies from the response payload
    const orderBodies = response.payload;

    // Find the index of the order body with the title "Disclaimer Text"
    const defaultTextIndex = orderBodies.findIndex(
      (orderBody) => orderBody.disclaimerTitle === 'Disclaimer Text'
    );

    // If the order with the title "Disclaimer Text" is found, move it to the beginning
    if (defaultTextIndex !== -1) {
      const defaultTextOrder = orderBodies.splice(defaultTextIndex, 1)[0];
      orderBodies.unshift(defaultTextOrder);
    }

    setAllOrderDisclaimer(orderBodies);
  };

  const handleDisclaimerChange = (content) => {
    if (content.length <= 5000) {
      setDisclaimerDescription(content);
    }
  };

  const handleDeleteDisclaimer = async () => {
    setOpenConfirmationPopup(true);
  };

  const handleEditOrderDisclaimer = async (order) => {
    if (order.id) {
      setOpenDisclaimerPopup(true);
      setDiscalimerOrderId(order.id);
      setDisclaimerTitle(order.disclaimerTitle);
      setSelectedDisclaimerOrder(order.disclaimerDescription);
    }
  };

  const handleSelectedDisclaimerOrder = (order) => {
    setDisclaimerTitle(order.disclaimerTitle);
    setDisclaimerDescription(order.disclaimerDescription);
    setSelectedDisclaimerOrder(order);
    setDiscalimerOrderId(order.id);
    setDisclaimerForEdit(order.id);
  };

  const handleClose = () => {
    setOpenBodyPop(false);
    setBodyForEdit('');
    setBodyTitle('');
    setBodyDescription('');
    setOpenConfirmationPopup(false);
    handleGetAllOrderBody();
    setDiscalimerOrderId('');

    setOpenDisclaimerPopup(false);
    setDisclaimerForEdit('');
    setDisclaimerTitle('');
    setDisclaimerDescription('');
    handleGetAllOrderDisclaimer();
  };

  const handleAddDiscalimerPopUp = () => {
    setOpenDisclaimerPopup(true);
    setDiscalimerOrderId('');
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
          orderId: Number(id),
          deliveryDate,
          expiryDate,
          orderBodyId: bodyOrderId,
          orderDisclaimerId: Number(discalimerOrderId),
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
    handleDeleteOrderBody,
    handleAddBody,
    disclaimerOpen,
    setDisclaimerOpen,
    allOrderDisclaimer,
    bodyOrderId,
    handleEditOrderBody,
    handleSelectedBodyOrder,
    handleSelectedDisclaimerOrder,
    selectedBodyOrder,
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
    allBodyOrder,
    bodyOpen,
    setBodyOpen,
    bodyForEdit,
    handleDeleteBody,
    handleEditOrderDisclaimer,
    selectedDisclaimerOrder,
    handleDeleteDisclaimer,
    handleAddDisclaimer,
    discalimerOrderId,
    deliveryDate,
    expiryDate,
    handleDeliveryDate,
    handleExpiryDate
  };
}
