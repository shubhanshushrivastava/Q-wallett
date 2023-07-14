import React, { useState } from "react";
import OTPInput from "otp-input-react";
import { Container, Row, Col, Button, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegiesterHead from "../components/UI/RegiesterHead";
import { ToastContainer, toast } from "react-toastify";
import { decryptData, encryptData } from "../helpers/encryption";
import Cookies from "js-cookie";

export const Confirmpin2 = () => {
  const [OTP, setOTP] = useState(""); // State for OTP input
  const location = useLocation();
  const pass = Cookies.get("otp");
  const keyForPin = "R#9gK7@L5mN4qP1jH3*";
  const navigate = useNavigate();


  

  const handleConfirmPin = async () => {
    const coock = await Cookies.otp
    if(coock === "undefined"){
      
      console.log("otp======================",Cookies.otp)
      toast.error("Existed wallet not found.",typeof(otp));
    }
    else{
      const otp = await decryptData(pass, keyForPin);
      console.log(otp,"otp======================")
      if (OTP.length < 6) {
        toast.error("Please enter the full pin.");
      console.log(otp,"otp======================1")
  
      } else if (OTP !== otp) {
          console.log(otp,"otp======================2")
  
          toast.error("Password do not match.");
      } else {
          console.log(otp,"otp======================3")
        navigate("/dashboard_home", {
  
          // state: { deviceKey: location.state.deviceKey, pin: OTP },
        });
      }
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
                  <Button
                    variant="primary"
                    className="sub_btn"
                    onClick={handleConfirmPin}
                  >
                    Submit
                  </Button>
                  <p>
                    Go back{" "}
                    <Link to="/create-wallet">
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
