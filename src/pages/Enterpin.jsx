import React, { useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegiesterHead from "../components/UI/RegiesterHead";
import { ToastContainer, toast } from "react-toastify";

export const Enterpin = () => {
  const { state } = useLocation("/create-wallet");
  const { deviceKey } = state || "";
  const navigate = useNavigate()
  const [OTP, setOTP] = useState([]);

  const HandlePassword = () => {
    if(OTP.length < 6){
        toast.error("Please enter full pin...")
    }else{
        navigate("/Confirm-pin" , {state : {deviceKey : deviceKey , otp : OTP}})
    }

  }
 
  return (
    <>
      <RegiesterHead />
      <section className="signup-sec" id="sign_up">
        <ToastContainer/>
        <Container>
          <Row>
            <Col className="m-auto" lg={6}>
              <div className="box w-100">
                <h1>Create Pin</h1>
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
                  <Button variant="primary" className="sub_btn" onClick={()=>{HandlePassword()}}>
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
