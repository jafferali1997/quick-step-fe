import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  createProductDocumentSetting,
  getDocumentSetting,
  updateProductDocumentSetting
} from '@/provider/features/setting/setting.slice';
import DOCUMENT from '@/common/constants/document.constants';

const validationSchema = yup.object().shape({
  productNumberPrefix: yup
    .string()
    .min(1, 'Product number prefix must be at least 1 character')
    .max(150, 'Product number prefix must be at most 150 characters'),

  productNumberSuffix: yup
    .string()
    .min(1, 'Product number suffix must be at least 1 character')
    .max(150, 'Product number suffix must be at most 150 characters')
});

export default function useProductSetting() {
  const dispatch = useDispatch();

  const documentSetting = useSelector((state) => state.setting.getDocumentSetting.data);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange'
  });

  useEffect(() => {
    getCurrentDocumentSetting();
  }, []);

  const getCurrentDocumentSetting = async () => {
    const response = await dispatch(
      getDocumentSetting({
        payload: {
          condition: { module: DOCUMENT.PRODUCT }
        }
      })
    );
    const setting = response.payload;
    setValue('productNumberPrefix', setting.prefix);
    setValue('productNumberSuffix', setting.suffix);
  };

  const handleProductSettingSubmit = async (values) => {
    const payload = {
      prefix: values.productNumberPrefix,
      suffix: values.productNumberSuffix
    };
    if (documentSetting) {
      await dispatch(updateProductDocumentSetting({ payload, id: documentSetting.id }));
    } else {
      await dispatch(createProductDocumentSetting({ payload }));
    }
    getCurrentDocumentSetting();
  };

  return {
    register,
    handleSubmit,
    errors,
    handleProductSettingSubmit
  };
}
