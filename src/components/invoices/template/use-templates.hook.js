/* eslint-disable import/no-cycle */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, usePathname } from 'next/navigation';
import StandardTab from './components/standard-tab.comoponent';
import GalleryTab from './components/gallery-tab-component';
import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  getSingleTemplate,
  updateTemplate
} from '@/provider/features/template/template.slice';
import { selectTemplate } from '@/provider/features/order/order.slice';
import useDebounce from '@/common/hooks/useDebounce';

export default function useTemplate() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const match = pathname.match(/^\/([^\/]+)/);
  const currentPathname = match[1];
  const allTemplateData = useSelector((state) => state.template.getAllTemplates.data);
  const [open, setOpen] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [actionType, setActionType] = useState('create');
  const [isLoading, setIsLoading] = useState(false);
  const [selectTemplateId, setSelectTemplateId] = useState(null);
  const [searchText, setSearchText] = useState('');

  const debouncedSearchQuery = useDebounce(searchText, 1000);

  const modalCloseHandler = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    templateName: yup
      .string()
      .min(5, 'Template name must be at least 5 characters long')
      .max(30, 'Template name must be at most 10 characters long')
      .required('Template Name is required')
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange'
  });

  const onSubmit = async (data) => {
    if (actionType === 'create') {
      data = {
        ...data,
        documentType: currentPathname.slice(0, -1).toUpperCase()
      };
      try {
        const response = await dispatch(createTemplate({ payload: data }));
        if (response.payload.id) {
          const temId = response.payload.id;
          const docType = response.payload.documentType;
          router.push(`/create-template?id=${temId}&docType=${docType}`);
          modalCloseHandler();
        }
      } catch (error) {
        console.error('Error creating offer template:', error);
      }
    } else {
      try {
        const result = await dispatch(
          updateTemplate({
            payload: { data, id: selectedId }
          })
        );
        if (result.payload) {
          reset();
          getAllTemplatesData();
          modalCloseHandler();
        }
      } catch (error) {
        console.error('Error creating offer template:', error);
      }
    }
  };

  const getAllTemplatesData = (condition = {}) => {
    condition = {
      ...condition,
      documentType: currentPathname.slice(0, -1).toUpperCase()
    };
    dispatch(
      getAllTemplates({
        payload: {
          sortColumn: 'id',
          sortOrder: 'DESC',
          condition
        }
      })
    );
  };

  useEffect(() => {
    getAllTemplatesData();
  }, []);

  const getSingleTemplateData = async () => {
    setIsLoading(true);
    try {
      if (selectedId) {
        const result = await dispatch(getSingleTemplate({ payload: selectedId }));
        if (result.payload.templateName) {
          setValue('templateName', result.payload.templateName);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleTemplateData();
  }, [selectedId, dispatch]);

  useEffect(() => {
    const storedTemplateId = localStorage.getItem('getTemplateId');
    if (storedTemplateId !== null) {
      setSelectTemplateId(storedTemplateId);
    }
  }, []);

  const tabs = [
    {
      id: 'tab1',
      label: 'Standard Template',
      // eslint-disable-next-line react/jsx-filename-extension
      content: <StandardTab />
    },
    {
      id: 'tab2',
      label: 'Your Gallery',
      content: <GalleryTab />
    }
  ];

  const confirmationModalCloseHandler = () => {
    setOpenConfirmationModal(false);
  };

  const handleDeleteTemplate = (templateId) => {
    setOpenConfirmationModal(true);
    setSelectedId(templateId);
  };

  const handleEditTemplate = (templateId) => {
    router.push(`/edit-template?id=${templateId}&docType=${currentPathname}`);
  };

  const handleViewTemplate = (templateId) => {
    router.push(`/view-template?id=${templateId}&docType=${currentPathname}`);
  };

  const handleRenameTemplate = (templateId) => {
    setActionType('update');
    setOpen(true);
    setSelectedId(templateId);
  };

  const confirmationModalHandler = async () => {
    if (selectedId) {
      const data = await dispatch(deleteTemplate({ payload: selectedId }));
      if (data?.payload) {
        getAllTemplatesData();
      }
      setOpenConfirmationModal(false);
    }
  };

  const getTemplateId = (id) => {
    dispatch(selectTemplate());
    const idStr = String(id);
    localStorage.setItem('getTemplateId', idStr);
    setSelectTemplateId(idStr);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useMemo(() => {
    if (debouncedSearchQuery !== null) {
      const query =
        debouncedSearchQuery.length !== 0
          ? { templateName: { $iLike: `%${debouncedSearchQuery}%` } }
          : {};
      getAllTemplatesData(query);
    }
  }, [debouncedSearchQuery]);

  return {
    tabs,
    allTemplateData,
    handleDeleteTemplate,
    open,
    setOpen,
    modalCloseHandler,
    register,
    handleSubmit,
    errors,
    onSubmit,
    confirmationModalCloseHandler,
    confirmationModalHandler,
    openConfirmationModal,
    handleEditTemplate,
    handleViewTemplate,
    currentPathname,
    handleRenameTemplate,
    isLoading,
    getTemplateId,
    selectTemplateId,
    handleSearch
  };
}
