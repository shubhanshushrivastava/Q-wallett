import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import RegiesterHead from "../components/UI/RegiesterHead";
import { ToastContainer, toast } from "react-toastify";
import axiosMain from "../api";
import { v4 as uuidv4 } from "uuid";
import { async } from "q";

export const Createwallet = () => {
  let UniqueId = uuidv4();
  const navigate = useNavigate();
  // console.log(UniqueId);

  const HandleDeviceKey = async () => {
    const payload = {
      deviceId: UniqueId,
    };
    try {
      // const deviceKey = await axiosMain.post("/newUser", payload);
      // console.log(deviceKey);
      if (1) {
        navigate("/enter-pin");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <RegiesterHead />
      <section className="signup-sec" id="sign_up">
        <Container>
          <Row className="mt-5">
            <Col className="d-flex align-items-center m-auto" lg={6}>
              <div className="box w-100">
                <div className="create-box-img">
                  <img src="assets/images/coin-video-bg.png" alt="" />
                </div>
                <h1>Private and Secure</h1>
                <p>Welcome to Yuse wallet</p>

                <Button
                  variant="primary"
                  className="sub_btn"
                  onClick={() => {
                    HandleDeviceKey();
                  }}
                >
                  Create a new wallet
                </Button>

                <p className="mb-0">
                  Already logged in{" "}
                  <Link to="/confirm_login">
                    <span>Click Here</span>
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
