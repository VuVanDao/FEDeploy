import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { verifyUserAPI } from "~/apis";
import PageLoadingSpinner from "~/components/loading/PageLoadingSpinner";
const AccountVerification = () => {
  let [searchParams] = useSearchParams();

  const { email, token } = Object.fromEntries([...searchParams]);
  const [verified, setVerified] = useState(false);
  //goi api verify tai khoan
  //neu 1 trong 2 (email,token) ko co thi 404
  if (!email || !token) {
    <Navigate to={"/404"} />;
  }
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => {
        setVerified(true);
      });
    }
  }, [email, token]);
  if (!verified) {
    return <PageLoadingSpinner caption={"verifying account ...."} />;
  }
  return <Navigate to={`/login?verifiedEmail=${email}`} />;
};

export default AccountVerification;
