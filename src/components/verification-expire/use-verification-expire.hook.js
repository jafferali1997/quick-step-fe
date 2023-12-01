import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
  generateForgetPasswordLink,
  regenerateEmailLink
} from '@/provider/features/user/user.slice';

export default function useVerificationExpire() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const resendLinkHandler = () => {
    let email = searchParams.get('email');
    const type = searchParams.get('type');

    if (email.includes('%2B')) email = email.replace('%2B', '+');

    if (type === 'email-verification') {
      dispatch(regenerateEmailLink({ payload: { email } }));
    } else {
      dispatch(generateForgetPasswordLink({ payload: { email } }));
    }
  };

  return { resendLinkHandler };
}
