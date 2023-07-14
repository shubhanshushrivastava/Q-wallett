import React, { useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegiesterHead from "../components/UI/RegiesterHead";
import { ToastContainer, toast } from "react-toastify";

export const EnterPinSeed = () => {
  const { state } = useLocation("/create-wallet");
  const { deviceKey } = state || "";
  const navigate = useNavigate()
  const [OTP, setOTP] = useState([]);
  console.log(state, '12zxcv')
  console.log(OTP, '898989')
  const HandlePassword = () => {
    if (OTP.length < 6) {
      toast.error("Please enter full pin...")
    } else {
      navigate("/confirm-pin-seed", { state: { deviceKey: deviceKey, otp: OTP } })
    }

  }

  return (
    <>
      <RegiesterHead />
      <section className="signup-sec" id="sign_up">
        <ToastContainer />
        <Container>
          <Row>
            <Col className="m-auto" lg={6}>
              <div className="box w-100">
                <h1>Enter pin </h1>
                {/* <p>Enter Security Pin sent on your email ID</p> */}
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
                      // secure
                      name="otp"
                    // onChange={formdata}
                    // value={inputdata.otp}
                    />
                  </InputGroup>
                  <Button variant="primary" className="sub_btn" onClick={() => { HandlePassword() }}>
                    Submit
                  </Button>
                  <p>
                    Go Back{" "}
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
