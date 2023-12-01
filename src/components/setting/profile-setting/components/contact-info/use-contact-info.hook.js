import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  addPhoneAndGenerateOtp,
  generateOtp,
  getCurrentUser,
  updateEmail,
  verifyOtp
} from '@/provider/features/user/user.slice';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required')
});

export default function useContactInfo() {
  const router = useRouter();
  const [isOtpVerified, setIsOtpVerified] = useState(true);
  const otpNumber1 = useRef();
  const otpNumber2 = useRef();
  const otpNumber3 = useRef();
  const otpNumber4 = useRef();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [enableFeilds, setEnableFeilds] = useState(false);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTimerStop, setIsTimerStop] = useState(false);

  const auth = useSelector((state) => state.auth.login && state.auth.login.data);

  const {
    register,
    handleSubmit,
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
    setEmail(user.email);
    setPhone(user.phone);
  };

  const handleCancel = () => {
    setEmail(auth.email);
    setEnableFeilds(false);
  };

  const otpNumberChangeHandler = (e) => {
    const currentOtpNumberId = e.target.id;
    // eslint-disable-next-line no-eval
    const currentOtpNumberRef = eval(`otpNumber${currentOtpNumberId}`);
    currentOtpNumberRef.current.value = e.target.value;

    if (currentOtpNumberId >= 4 && e.target.value.length === 1) {
      setIsOtpVerified(false);
    } else {
      setIsOtpVerified(true);
    }
    if (currentOtpNumberId < 4 && e.target.value.length === 1) {
      currentOtpNumberRef.current.nextSibling.focus();
    } else if (currentOtpNumberId > 1 && e.target.value.length === 0) {
      currentOtpNumberRef.current.previousSibling.focus();
    }
    currentOtpNumberRef.current.value = e.target.value;
    setLoading(false);
  };

  const resendOtpHandler = () => {
    if (isTimerStop) {
      dispatch(
        generateOtp({
          successCallBack: () => {}
        })
      );
      setIsTimerStop(false);
    }
  };

  const handleVerifyEmail = async () => {
    const response = await dispatch(updateEmail({ payload: { email } }));
    if (response.meta.requestStatus === 'fulfilled') {
      currentUser();
      setEnableFeilds(false);
    }
  };

  const handleSendOtp = () => {
    setPopUpOpen(true);
    if (phone) {
      dispatch(addPhoneAndGenerateOtp({ payload: { phone } }));
    }
  };

  const moveRouter = (data) => {
    setIsOtpVerified(true);
    dispatch(getCurrentUser({ successCallBack: () => router.push('/dashboard') }));
  };

  const verifyOtpHandler = async () => {
    setLoading(true);
    const otp = Number(
      `${otpNumber1.current.value}${otpNumber2.current.value}${otpNumber3.current.value}${otpNumber4.current.value}`
    );
    if (otp > 0) {
      const response = await dispatch(
        verifyOtp({ payload: { otp }, successCallBack: moveRouter })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        setLoading(false);
        setEnableFeilds(false);
      }
    }
  };

  return {
    popUpOpen,
    setPopUpOpen,
    register,
    handleSubmit,
    errors,
    email,
    setEmail,
    auth,
    setEnableFeilds,
    enableFeilds,
    handleCancel,
    phone,
    setPhone,
    otpNumberChangeHandler,
    otpNumber1,
    otpNumber2,
    otpNumber3,
    otpNumber4,
    resendOtpHandler,
    isTimerStop,
    setIsTimerStop,
    handleVerifyEmail,
    handleSendOtp,
    isOtpVerified,
    verifyOtpHandler,
    loading
  };
}
