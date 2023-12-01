'use client';

import { useRouter } from 'next/navigation';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useDispatch } from 'react-redux';
import { loginAndSignUpWithLinkedin } from '@/provider/features/auth/auth.slice';

function LoginWithLinkedIn() {
  const dispatch = useDispatch();
  const router = useRouter(null);
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

  const redirectUri = `${typeof window === 'object' && window.location.origin}/linkedin`;

  const moveRouter = (data) => {
    if (data.isPhoneVerified && data?.currentBusinessId) {
      router.push(`/two-factor-auth?userId=${data.id}&phone=${data.phone}`);
    } else {
      router.push(
        `/profile?userName=${data.userName}&email=${data.email}&userId=${data.id}`
      );
    }
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: clientId,
    redirectUri: redirectUri,
    onSuccess: (code) => {
      const payload = {
        grantType: 'authorization_code',
        code: code,
        redirectURI: redirectUri,
        clientId: clientId,
        clientSecret: clientSecret
      };
      dispatch(loginAndSignUpWithLinkedin({ payload, successCallBack: moveRouter }));
    },
    scope: 'r_liteprofile r_emailaddress',
    onError: (error) => {
      console.log(error);
    }
  });

  return (
    <div>
      <button onClick={linkedInLogin} className="login-provider-btn" type="button">
        <img
          src="/assets/images/linkedin-icon.svg"
          alt="login with Linkedin"
          className="tw-h-[19.2px] tw-w-[19.2px]"
        />
      </button>
    </div>
  );
}

export default LoginWithLinkedIn;
