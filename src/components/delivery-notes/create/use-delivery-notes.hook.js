import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function useDeliveryNotes() {
  const searchParams = useSearchParams();
  const [id, setId] = useState('');

  useEffect(() => {
    if (searchParams.get('id')) {
      setId(Number(searchParams.get('id')));
    }
  }, [searchParams]);

  return {
    id
  };
}

export default useDeliveryNotes;
