import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DOCUMENT from '@/common/constants/document.constants';
import {
  getSingleDeliveryNotes,
  uploadDeliveryNotesFiles
} from '@/provider/features/delivery-notes/delivery-notes.slice';
import {
  getSingleInvoice,
  uploadInvoiceFiles
} from '@/provider/features/invoice/invoice.slice';
import { getSingleOffer, uploadOfferFiles } from '@/provider/features/offer/offer.slice';
import { getSingleOrder, uploadOrderFiles } from '@/provider/features/order/order.slice';
import { uploadSingleFile } from '@/provider/features/upload-file/upload-file.slice';
import {
  getSingleCustomer,
  uploadCustomerFiles
} from '@/provider/features/customer/customer.slice';

function useFileInput({ module, moduleName }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState('');
  const [alreadyExistPopup, setAlreadyExistPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleDocument, setSingleDocument] = useState([]);
  const [alreadyExistFileHandle, setAlreadyExistFileHandle] = useState([]); // Track already Exist files
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    module && getDocumentData();
  }, [status, alreadyExistPopup]);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const documentAttachments = singleDocument?.attachments
    ? singleDocument?.attachments?.map(({ file }) => {
        return {
          name: file.name,
          key: file.key,
          url: file.url,
          id: file.id
        };
      })
    : [];

  // Function to filter files that exceed the size limit (1 MB = 1024 * 1024 bytes)
  const handleFileSizeCheck = (files) => {
    if (files.length > 0) {
      const filteredFiles = Array.from(files).filter((file) => file.size <= 1024 * 1024);

      if (filteredFiles.length === 0) {
        enqueueSnackbar('The maximum file size shall be 1 MB', {
          variant: 'error'
        });
        setLoading(false);
        return [];
      }
      return filteredFiles;
    }
  };

  // Function to check the already exist files
  const alreadyExist = (files) => {
    const response =
      files.length &&
      files.filter((document) => {
        return documentAttachments.some((file) => document.name === file.name);
      });

    return response;
  };

  const getDocumentData = async () => {
    const payload = module.id;
    const getAllData =
      moduleName === DOCUMENT.OFFER
        ? await dispatch(getSingleOffer({ payload }))
        : moduleName === DOCUMENT.ORDER
        ? await dispatch(getSingleOrder({ payload }))
        : moduleName === DOCUMENT.INVOICE
        ? await dispatch(getSingleInvoice({ payload }))
        : moduleName === DOCUMENT.DELIVERY_NOTES
        ? await dispatch(getSingleDeliveryNotes({ payload }))
        : moduleName === DOCUMENT.CUSTOMER
        ? await dispatch(getSingleCustomer({ payload }))
        : null;

    setSingleDocument(getAllData.payload);
  };

  const handleAPIForModules = async (attachments) => {
    const payload = { attachments, id: module.id };
    switch (moduleName) {
      case DOCUMENT.OFFER:
        return dispatch(uploadOfferFiles({ payload }));
      case DOCUMENT.ORDER:
        return dispatch(uploadOrderFiles({ payload }));
      case DOCUMENT.INVOICE:
        return dispatch(uploadInvoiceFiles({ payload }));
      case DOCUMENT.DELIVERY_NOTES:
        return dispatch(uploadDeliveryNotesFiles({ payload }));
      case DOCUMENT.CUSTOMER:
        return dispatch(uploadCustomerFiles({ payload }));
      default:
        // Handle other cases if needed
        break;
    }
  };

  const handleUploadFileAPI = async (files) => {
    const formDataArray = []; // Create an array to store FormData for each image
    const filteredFiles = handleFileSizeCheck(files);

    for (let i = 0; i < filteredFiles.length; i++) {
      const formData = new FormData();
      formData.append('file', filteredFiles[i]);
      formData.append('module', moduleName);

      formDataArray.push(formData); // Add FormData to the array
    }

    const uploadPromises = formDataArray.map((formData) =>
      dispatch(uploadSingleFile({ payload: formData }))
    );
    const responses = await Promise.all(uploadPromises);

    const attachments = responses
      .filter((response) => response?.meta?.requestStatus === 'fulfilled')
      .map((response) => ({
        name: response.payload.name,
        key: response.payload.key,
        url: response.payload.url
      }));

    return attachments;
  };

  const handleFileInputChange = async (event) => {
    setLoading(true);
    const { files } = event.target;
    const filteredFiles = handleFileSizeCheck(files);
    const isAlreadyExist = alreadyExist(filteredFiles);

    if (isAlreadyExist.length) {
      setAlreadyExistFileHandle(isAlreadyExist);
      setUploadedFiles(filteredFiles);
      setAlreadyExistPopUp(true);

      // Reset the input element value
      event.target.value = '';
    } else {
      const response = await handleUploadFileAPI(files);
      const combinedAttachments = documentAttachments.concat(response);
      const result = await handleAPIForModules(combinedAttachments);
      setStatus(result);
      setLoading(false);

      // Reset the input element value
      event.target.value = '';
    }
  };

  const handleYesConfirmation = async () => {
    // Remove existing files from documents attachments array
    const removeExistingFile = documentAttachments
      .map((attachment) => {
        const matchingFile = alreadyExistFileHandle.find(
          (file) => file.name === attachment.name
        );

        if (matchingFile) {
          return null;
        }
        return attachment;
      })
      .filter((attachment) => attachment !== null);

    const response = await handleUploadFileAPI(uploadedFiles);
    const newAttachments = removeExistingFile.concat(response);
    const result = await handleAPIForModules(newAttachments);
    result && setLoading(false);
    setAlreadyExistFileHandle([]); // Clear the alreadyExistFileHandle state
    setUploadedFiles([]); // Clear the uploadedFiles state
    setStatus(result);
    setAlreadyExistPopUp(false); // Close the confirmation dialog
  };

  const handleCancel = async () => {
    // Remove existing files from uploaded files array
    const removeExistingFile = uploadedFiles
      .map((file) => {
        const matchingFile = documentAttachments.find(
          (attachment) => attachment.name === file.name
        );

        if (matchingFile) {
          return null;
        }
        return file;
      })
      .filter((file) => file !== null);

    if (removeExistingFile.length) {
      const response = await handleUploadFileAPI(removeExistingFile);
      const newAttachments = documentAttachments.concat(response);
      const result = await handleAPIForModules(newAttachments);
      setStatus(result);
    }
    setLoading(false);

    setAlreadyExistFileHandle([]); // Clear the alreadyExistFileHandle state
    setUploadedFiles([]); // Clear the uploadedFiles state
    setAlreadyExistPopUp(false); // Close the confirmation dialog
  };

  return {
    fileInputRef,
    handleUploadButtonClick,
    handleFileInputChange,
    loading,
    singleDocument,
    alreadyExistPopup,
    handleYesConfirmation,
    handleCancel
  };
}

export default useFileInput;
