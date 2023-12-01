import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createDeliveryTerm,
  deleteDeliveryTerm,
  getDeliveryTerm,
  updateDeliveryTerm
} from '@/provider/features/delivery-term/delivery-term.slice';

export default function useFormForDiscount(dataCustomer) {
  const [openDeliverPopup, setOpenDeliverPopup] = useState(false);
  const [openDeliverPopupUpdate, setOpenDeliverPopupUpdate] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [updateSelectedDeliver, setUpdateSelectedDeliver] = useState(null);
  const [values, setValues] = useState([]);
  const [deliveryAction, setDeliveryAction] = useState(false);
  const [deliveryActionId, setDeliveryActionId] = useState('');
  const [status, setStatus] = useState(false);
  const [vatStatus, setVatStatus] = useState(dataCustomer?.vatStatus);
  const [isPDF, setIsPDF] = useState(dataCustomer?.isPDF);
  const [selectedValueDelivery, setSelectedValueDelivery] = useState(null);

  const deliveryActionRef = useRef();

  useEffect(() => {
    if (dataCustomer?.termOfDelivery?.[0] !== undefined) {
      setSelectedValueDelivery(dataCustomer.termOfDelivery[0]);
    }
    setStatus(dataCustomer?.isStatus);
    setVatStatus(dataCustomer?.vatStatus);
    setIsPDF(dataCustomer?.isPDF);
  }, [dataCustomer]);
  const dispatch = useDispatch();

  const modalCloseHandler = () => {
    setOpenDeliverPopup(false);
  };

  useEffect(() => {
    if (values.length === 0) {
      fetchData();
    }
    if (dataCustomer?.termOfDelivery?.[0]) {
      setSelectedValueDelivery(dataCustomer?.termOfDelivery?.[0]);
    }
  }, []);

  const fetchData = async () => {
    const deliveryData = await dispatch(getDeliveryTerm());

    // const modifiedData = deliveryData?.payload?.map((item) => item.deliveryTerm);
    setValues(deliveryData?.payload);
  };
  const handleUpdateDeliveryTerm = async (objectId, updatedValue) => {
    // setValues((prevValues) => {
    //   const updatedValues = prevValues.map((obj) => {
    //     if (obj.id === objectId) {
    //       return { ...obj, ...updatedValue };
    //     }
    //     return obj;
    //   });
    //   return updatedValues;
    // });
    const response = await dispatch(
      updateDeliveryTerm({
        payload: {
          data: updatedValue,
          id: objectId
        }
      })
    );
    fetchData();
  };
  const handleDeleteDeliveryTerm = async (id) => {
    await dispatch(deleteDeliveryTerm({ payload: id }));

    setOpenPopup(false);
    fetchData();
  };
  const handleSubmitDelivery = async (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.inputValueDelivery.value;

    const response = await dispatch(
      createDeliveryTerm({ payload: { deliveryTerm: String(inputValue) } })
    );

    setValues([...values, response.payload]);
    e.target.reset();
    setOpenDeliverPopup(false);
    fetchData();
  };

  const handleRadioChangeDelivery = (value) => {
    const gitIdSetObject = {
      ...selectedValueDelivery,
      termOfDelivery: value.deliveryTerm
    };

    setSelectedValueDelivery(gitIdSetObject);
  };

  return {
    openDeliverPopup,
    setOpenDeliverPopup,
    modalCloseHandler,
    values,
    setValues,
    selectedValueDelivery,
    setSelectedValueDelivery,
    handleSubmitDelivery,
    handleRadioChangeDelivery,
    status,
    setStatus,
    vatStatus,
    setVatStatus,
    isPDF,
    setIsPDF,
    deliveryAction,
    setDeliveryAction,
    deliveryActionId,
    setDeliveryActionId,
    deliveryActionRef,
    openDeliverPopupUpdate,
    setOpenDeliverPopupUpdate,
    openPopup,
    setOpenPopup,
    updateSelectedDeliver,
    setUpdateSelectedDeliver,
    handleUpdateDeliveryTerm,
    handleDeleteDeliveryTerm
  };
}
