import React, { useState, useEffect } from "react";
import OTPInput from "otp-input-react";
import { Container, Row, Col, Button, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegiesterHead from "../components/UI/RegiesterHead";
import { ToastContainer, toast } from "react-toastify";
import { encryptData } from "../helpers/encryption";
import { decryptData } from './../helpers/encryption';
import  Cookies  from 'js-cookie';

export const Confirmpinhistory = () => {




  const { state } = useLocation("/account-history");
 
  const { walletdata } = state;

  // console.log(walletdata,'%%%%%%%%%%%%%%%%%')

  const navigate = useNavigate();
  const [OTP, setOTP] = useState([]);
  const [cookieotp, setcookieotp] = useState(null)

 
  useEffect(async()=>{
    const pass = Cookies.get("otp");
    const keyForPin = await decryptData(pass, "R#9gK7@L5mN4qP1jH3*");
    setcookieotp(keyForPin)
  },[])
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    // const secureFlag = location.protocol === 'https:' ? 'Secure' : '';
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  
  const HamdleConfirmPin = async() => {
    if (OTP.length < 6) {
      toast.error("Please enter the full pin.");
    } else if (OTP !== cookieotp) {
      console.log("hello")
      toast.error("Pin and confirmation do not match.");
    } else {
      const keyForEncryption = "R#9gK7@L5mN4qP1jH3*";
      const encryptedOtp = await encryptData(OTP,keyForEncryption)
      setCookie("otp", encryptedOtp, 4000); 
      navigate("/secret-phrase-history", { state: { pin: OTP ,walletdatafinal:walletdata} });
    }
  };

  return (
    <>
      <RegiesterHead />
      <section className="signup-sec" id="sign_up">
        <ToastContainer />
        <Container>
          <Row>
            <Col className="m-auto" lg={6}>
              <div className="box w-100">
                <h1>Confirm Pin</h1>
                <div>
                  <InputGroup className="mb-3 otp_div">
                    <OTPInput
                      value={OTP}
                      onChange={setOTP}
                      autoFocus
                      className="otp_box"
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                      name="otp"
                    />
                  </InputGroup>
                  <Button variant="primary" className="sub_btn" onClick={HamdleConfirmPin}>
                    Submit
                  </Button>
                  <p>
                    Go back{" "}
                    <Link to="/enter-pin">
                      <span>Click Here</span>
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
