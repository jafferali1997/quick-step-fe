import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function useInvoice() {
  const searchParams = useSearchParams();
  const [id, setId] = useState('');
  const displayId = searchParams.get('d-id');

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
    }
  }, [searchParams]);

  return {
    id,
    displayId
  };
}

export default useInvoice;
