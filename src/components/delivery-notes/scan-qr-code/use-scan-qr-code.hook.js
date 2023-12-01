import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { scanQrCode } from '@/provider/features/qr-code-scan/qr-code-scan.slice';

function useScanQRCode() {
  const router = useRouter(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const documentId = Number(searchParams.get('documentId'));
  const token = searchParams.get('token');
  const [ip, setIP] = useState('');
  const [successRendering, setSuccessRendering] = useState(false);

  useEffect(() => {
    handleGetIPAddress();
  }, [searchParams, ip]);

  const handleGetIPAddress = () => {
    axios
      .get('https://api.ipify.org/?format=json')
      .then((res) => {
        axios
          .get(`https://ipapi.co/${res.data.ip}/json/`)
          .then((res) => {
            const { data } = res;
            const { ip } = data;
            setIP(ip);
          })
          .catch((err) => {
            console.error('Error while geting Info:', err);
          });
      })
      .catch((err) => {
        console.error('Error while geting IP:', err);
      });
  };

  const handleConfirmDelivery = async () => {
    const response = await dispatch(
      scanQrCode({
        payload: {
          documentId,
          token,
          ip
        }
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
    }
    setSuccessRendering(true);
  };

  const handleBackLogin = () => {
    router.push('/login');
    localStorage.removeItem('user');
  };

  return { handleBackLogin, handleConfirmDelivery, successRendering };
}

export default useScanQRCode;
