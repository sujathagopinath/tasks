import React, { useState } from "react";
import { PaymentInputsContainer } from "react-payment-inputs";

export default function PaymentInputs() {
  const [cardNumber, setCardnumber] = useState("");
  const [expiryDate, setChangeExpiryDate] = useState("");
  const [cvc, setChangeCVC] = useState("");

  const handleChangeCardNumber = (e) => {
    setCardnumber(e.target.value);
  };

  const handleChangeExpiryDate = (e) => {
    setChangeExpiryDate(e.target.value);
  };

  const handleChangeCVC = (e) => {
    setChangeCVC(e.target.value);
  };

  return (
    <PaymentInputsContainer>
      {({ meta, getCardNumberProps, getExpiryDateProps, getCVCProps }) => (
        <div>
          <input
            {...getCardNumberProps({ onChange: handleChangeCardNumber })}
            value={cardNumber}
            required
          />
          <input
            {...getExpiryDateProps({ onChange: handleChangeExpiryDate })}
            value={expiryDate}
            required
          />
          <input
            {...getCVCProps({ onChange: handleChangeCVC })}
            value={cvc}
            required
          />
          {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
        </div>
      )}
    </PaymentInputsContainer>
  );
}
