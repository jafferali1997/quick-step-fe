import React, { useState } from 'react';

export default function useFormPaymentDetails() {
  const [bankDetail, setBankDetail] = useState(true);
  const [cardDetail, setCardDetail] = useState(true);
  return { bankDetail, setBankDetail, cardDetail, setCardDetail };
}
