/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-filename-extension */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSwitch from '@/common/components/custom-switch/custom-switch.component';
import {
  defaultTaxRateSet,
  getSingleBusinessDetail
} from '@/provider/features/business-detail/business-detail.slice';
import {
  createTaxRate,
  deleteTaxRate,
  getAllTaxRate,
  updateTaxRate
} from '@/provider/features/tax-rate/tax-rate.slice';

function useTaxRate() {
  const dispatch = useDispatch();
  const [taxRate, setTaxRate] = useState('');
  const [taxRateId, setTaxRateId] = useState('');
  const [searchText, setSearchText] = useState('');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [dataTotallRecords, setDataTotallRecords] = useState(null);
  const [tablePageNum, setTablePageNum] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openConfirmationPopUp, setOpenConfirmationPopUp] = useState(false);
  const [toggleSwitchValue, setToggleSwitchValue] = useState(false);

  const taxRates = useSelector((state) => state.taxRate.getAllTaxRate);
  const businessDetail = useSelector((state) => state.businessDetail.getSingle.data);
  const businessDetailId = businessDetail && businessDetail.defaultTaxRateId;

  const initialColumns = [
    { id: '1', name: 'taxRate', title: 'Tax Rate', selected: true },
    { id: '2', name: 'setDefault', title: 'Set as Default', selected: true },
    { id: '3', name: 'action', title: 'Action', selected: true }
  ];

  useEffect(() => {
    handleGetAllTaxRates();
    getCurrentBusinessDetail();
  }, [searchText, tablePageSize]);

  const handleDeleteTaxRate = (taxRate) => {
    setTaxRateId(taxRate.id);
    setOpenConfirmationPopUp(true);
  };

  const handleEditTaxRate = (taxRate, defaultTaxRate) => {
    setTaxRateId(taxRate.id);
    setTaxRate(taxRate.taxRate);
    setOpenCreateModal(true);
    setToggleSwitchValue(defaultTaxRate);
  };

  const handleSetDefaultTaxRate = async (taxRate) => {
    const response = await dispatch(
      defaultTaxRateSet({
        payload: { defaultTaxRateId: taxRate.id, id: businessDetail && businessDetail.id }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      handleGetAllTaxRates();
      getCurrentBusinessDetail();
    }
  };

  const getCurrentBusinessDetail = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      await dispatch(
        getSingleBusinessDetail({
          payload: JSON.parse(storedUser).currentBusinessId
        })
      );
    }
  };

  const modifiedData =
    taxRates?.data &&
    taxRates?.data
      ?.map((item) => ({
        ...item,
        setDefault: (
          <CustomSwitch
            type="switch"
            className="tw-h-5 tw-w-10 tw-flex-col-reverse"
            name="isVat"
            checked={Number(item.id) === Number(businessDetailId)}
            onChange={() => handleSetDefaultTaxRate(item)}
          />
        ),
        action: (
          <div className="tw-flex tw-items-center tw-gap-2">
            <img
              src="/assets/icons/edit-green.svg"
              alt="edit"
              className="tw-mt-[10px] tw-h-6 tw-w-6 hover:tw-cursor-pointer"
              onClick={() =>
                handleEditTaxRate(item, Number(item.id) === Number(businessDetailId))
              }
            />
            <img
              src="/assets/icons/delete-red.svg"
              alt="delete"
              className="tw-h-6 tw-w-6 hover:tw-cursor-pointer"
              onClick={() => handleDeleteTaxRate(item)}
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

  const handleGetAllTaxRates = async () => {
    await dispatch(
      getAllTaxRate({
        payload: {
          page: tablePageNum,
          pageSize: tablePageSize,
          sortColumn: 'id',
          sortOrder: 'DESC'
        }
      })
    );
  };

  const handleChangeTaxRate = (value) => {
    // Remove any non-numeric characters (e.g., commas or spaces)
    const numericValue = value.replace(/[^0-9.]/g, '');

    // Ensure the value is within the allowed range and has up to 2 decimal places
    if (numericValue >= 0 && numericValue <= 999.99) {
      // Convert the validated numeric value to a number with up to 2 decimal places
      const taxRate = parseFloat(numericValue).toFixed(2);
      setTaxRate(Number(taxRate));
    }
  };

  const handleClose = () => {
    setOpenCreateModal(false);
    setTaxRate('');
    setTaxRateId('');
    setOpenConfirmationPopUp(false);
    setSwitchChecked(false);
  };

  const handleSubmitClick = async () => {
    if (taxRateId) {
      const response = await dispatch(
        updateTaxRate({ payload: { taxRate, id: taxRateId, isDefault: switchChecked } })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        handleClose();
        handleGetAllTaxRates();
        getCurrentBusinessDetail();
      }
    } else {
      const response = await dispatch(
        createTaxRate({ payload: { taxRate, isDefault: switchChecked } })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        handleClose();
        handleGetAllTaxRates();
        getCurrentBusinessDetail();
      }
    }
  };

  const handleConfirmation = async () => {
    const response = await dispatch(deleteTaxRate({ payload: taxRateId }));
    if (response.meta.requestStatus === 'fulfilled') {
      handleGetAllTaxRates();
      handleClose();
    }
  };

  const handleCreateTaxRate = () => {
    setOpenCreateModal(true);
  };

  const handleDefaulTaxRateSwitch = (e) => {
    setSwitchChecked(e.target.checked);
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
    taxRate,
    taxRates,
    handleChangeTaxRate,
    handleClose,
    handleSubmitClick,
    modifiedData,
    taxRateId,
    openConfirmationPopUp,
    handleConfirmation,
    handleDefaulTaxRateSwitch,
    setSearchText,
    toggleSwitchValue
  };
}

export default useTaxRate;
