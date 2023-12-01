/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-filename-extension */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUnit,
  deleteUnit,
  getAllUnit,
  updateUnit
} from '@/provider/features/unit/unit.slice';

function useUnits() {
  const dispatch = useDispatch();
  const [unit, setUnit] = useState('');
  const [unitId, setUnitId] = useState('');
  const [searchText, setSearchText] = useState('');
  const [dataTotallRecords, setDataTotallRecords] = useState(null);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openConfirmationPopUp, setOpenConfirmationPopUp] = useState(false);

  const units = useSelector((state) => state.unit.getAllUnit);

  const initialColumns = [
    { id: '1', name: 'unit', title: 'Units', selected: true },
    { id: '2', name: 'action', title: 'Action', selected: true }
  ];

  useEffect(() => {
    handleGetAllUnits();
  }, []);

  const handleDeleteUnit = (unit) => {
    setUnitId(unit.id);
    setOpenConfirmationPopUp(true);
  };

  const handleEditUnit = (unit) => {
    setUnitId(unit.id);
    setUnit(unit.unit);
    setOpenCreateModal(true);
  };

  const modifiedData =
    units?.data &&
    units?.data
      ?.map((item) => ({
        ...item,
        action: (
          <div className="tw-flex tw-items-center tw-gap-2">
            <img
              src="/assets/icons/edit-green.svg"
              alt="edit"
              className="tw-mt-[10px] tw-h-6 tw-w-6 hover:tw-cursor-pointer"
              onClick={() => handleEditUnit(item)}
            />
            <img
              src="/assets/icons/delete-red.svg"
              alt="delete"
              className="tw-h-6 tw-w-6 hover:tw-cursor-pointer"
              onClick={() => handleDeleteUnit(item)}
            />
          </div>
        )
      }))
      .filter((item) => {
        if (searchText) {
          const values = Object.values(item).map((value) => {
            if (typeof value === 'string') {
              return value.toLowerCase();
            } else {
              return value ? value.toString().toLowerCase() : ''; // Convert to string if possible
            }
          });
          return values.some((val) => val && val.includes(searchText.toLowerCase()));
        }
        return item;
      });

  const handleGetAllUnits = async () => {
    await dispatch(
      getAllUnit({
        payload: {
          page: tablePageNum,
          pageSize: tablePageSize,
          sortColumn: 'id',
          sortOrder: 'DESC'
        }
      })
    );
  };

  const handleCreateTaxRate = () => {
    setOpenCreateModal(true);
  };

  const handleChangeUnit = (value) => {
    // Remove any non-alphabetic characters and limit the length
    const alphabeticValue = value.replace(/[^A-Za-z]/g, '');

    if (alphabeticValue.length >= 0 && alphabeticValue.length <= 20) {
      setUnit(alphabeticValue);
    }
  };

  const handleClose = () => {
    setOpenCreateModal(false);
    setUnit('');
    setUnitId('');
    setOpenConfirmationPopUp(false);
  };

  const handleSubmitClick = async () => {
    if (unitId) {
      const response = await dispatch(
        updateUnit({ payload: { unit, id: unitId, isDefault: false } })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        handleGetAllUnits();
        handleClose();
      }
    } else {
      const response = await dispatch(
        createUnit({ payload: { unit, isDefault: false } })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        handleGetAllUnits();
        handleClose();
      }
    }
  };

  const handleConfirmation = async () => {
    const response = await dispatch(deleteUnit({ payload: unitId }));
    if (response.meta.requestStatus === 'fulfilled') {
      handleGetAllUnits();
      handleClose();
    }
  };

  return {
    initialColumns,
    data: modifiedData || [],
    dataTotallRecords,
    tablePageNum,
    tablePageSize,
    setTablePageNum,
    setTablePageSize,
    handleCreateTaxRate,
    openCreateModal,
    unit,
    units,
    handleChangeUnit,
    handleClose,
    handleSubmitClick,
    modifiedData,
    unitId,
    openConfirmationPopUp,
    handleConfirmation,
    setSearchText
  };
}

export default useUnits;
