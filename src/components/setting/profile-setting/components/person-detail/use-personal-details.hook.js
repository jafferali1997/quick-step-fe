import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { getCurrentUser } from '@/provider/features/user/user.slice';
import { updateProfileFinancialBusiness } from '@/provider/features/profile-financial-business/profile-financial-business.slice';
import useCountryCity from '@/common/hooks/use-country-city.hook';
import { uploadSingleFile } from '@/provider/features/upload-file/upload-file.slice';

function usePersonalDetails() {
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.login.data);
  const [feildsEnable, setFeildsEnable] = useState(false);
  const [population, setPopulation] = useState('Select Company Population');
  const [city, setCity] = useState('Select city');
  const [country, setCurrentCountry] = useState('Select country');
  const [logo, setLogo] = useState();

  const { handleCountryChange, cities } = useCountryCity();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string()
      .required('User name is required')
      .max(30, 'Username must be at most 30 characters long'),
    city: Yup.string(),
    country: Yup.string(),
    businessName: Yup.string()
      .required('Company Name is required')
      .max(150, 'Company name must be 150 characters long')
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        'Company name can only contain alphanumeric characters'
      ),
    slogan: Yup.string()
      .required('slogan is required')
      .max(150, 'slogan must be 150 characters long')
      .matches(/^[a-zA-Z0-9\s]*$/, 'slogan can only contain alphanumeric characters'),
    businessEmail: Yup.string().required('Business Email is required'),
    address: Yup.string()
      .required('Address is required')
      .max(255, 'Address can contain maximum 255 characters'),
    population: Yup.string()
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  useEffect(() => {
    currentUser();
  }, []);

  const currentUser = async () => {
    const response = await dispatch(getCurrentUser({ successCallBack: () => {} }));
    const user = response.payload;

    if (user) {
      setValue('firstName', user.profile.firstName);
      setValue('lastName', user.profile.lastName);
      setValue('username', user.userName);
      setValue('iban', user.financialDetail.iban);
      setValue('vat', user.financialDetail.vat);
      setValue('businessName', user.businessDetail.businessName);
      // setValue('streatNo', user.businessDetail.businessName);
      // setValue('zipCode', user.businessDetail.businessName);
      setValue('slogan', user.businessDetail.slogan);
      setValue('businessEmail', user.businessDetail.businessEmail);
      setValue('address', user.businessDetail.address);
      setLogo(user.businessDetail.businessLogo);
      setCity({
        label: user.profile.city,
        value: user.profile.city
      });
      setCurrentCountry({
        label: user.profile.country,
        value: user.profile.country
      });
      setPopulation({
        label: user.businessDetail.population,
        value: user.businessDetail.population
      });
    }
  };

  const handleSelectCountry = ({ label, value }) => {
    setCurrentCountry({ value, label });
  };

  const handleSelectCity = ({ label, value }) => {
    setCity({ value, label });
  };

  const handleSelectCompanyPopulation = ({ label, value }) => {
    setPopulation({ value, label });
  };

  const onCountryChange = ({ label, value }) => {
    setCity({
      label: 'Select City',
      value: ''
    });
    const event = {
      target: {
        value: value && value.match(/[A-Za-z]+-[A-Z]{2}/)[0]
      }
    };
    handleCountryChange(event);
    setCurrentCountry({ value, label });
  };

  const onSubmit = async (values) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      country: values.country,
      city: values.city,
      businessName: values.businessName,
      address: values.address,
      slogan: values.slogan,
      businessEmail: values.businessEmail,
      iban: values.iban,
      vat: values.vat,
      businessLogo: logo,
      userName: values.username
    };
    const response = await dispatch(
      updateProfileFinancialBusiness({ payload, id: auth && auth.id })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      setFeildsEnable(false);
      currentUser();
    }
  };

  const handleUploadLogo = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (event) => {
    const { files } = event.target;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('module', 'ANY');

    const response = await dispatch(uploadSingleFile({ payload: formData }));
    setLogo(response.payload.url);

    // Reset the input element value
    event.target.value = '';
  };

  return {
    logo,
    feildsEnable,
    setFeildsEnable,
    register,
    handleSubmit,
    errors,
    cities,
    country,
    onCountryChange,
    onSubmit,
    population,
    city,
    handleSelectCity,
    handleSelectCountry,
    handleSelectCompanyPopulation,
    handleUploadLogo,
    fileInputRef,
    handleFileInputChange
  };
}

export default usePersonalDetails;
