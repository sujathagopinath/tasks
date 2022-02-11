import React, { useState } from "react";
import SignIn from "./signin";
const SignnIn = () => {
  const [verified, setVerified] = useState(false);

  return (
    <div className="signin-form">
      {verified === false ? <h4>Verify Your Email</h4> : <SignIn />}

      <div hidden={verified ? true : false}>
        <small>Click to proceed</small>
        <input
          type="checkbox"
          checked={verified}
          onChange={(e) => {
            setVerified(e.target.checked);
          }}
        />
      </div>
    </div>
  );
};
export default SignnIn;
