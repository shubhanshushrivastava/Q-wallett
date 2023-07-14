import React, { useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import RegiesterHead from "../components/UI/RegiesterHead";


export default function Otp_verification() {

    const [OTP, setOTP] = useState();
    
    return (
        <>
            <RegiesterHead />
            <section className="signup-sec" id="sign_up">
              
                <Container>
                    <Row>
                        <Col className="m-auto" lg={6}>
                            <div className="box w-100">
                                <h1>Verify OTP</h1>
                                <p>Enter OTP sent on your email ID</p>
                                <Form   >

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
                                    <Button variant="primary" className="sub_btn"  type="submit">
                                        Submit
                                    </Button>
                                    <p>Don’t have a Wallet? <Link to=""><span>Click Here</span></Link></p>
                                </Form>
                            </div>
                        </Col>
                        
                    </Row>
                </Container>
            </section>
        </>
    )
}