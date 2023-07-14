import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegiesterHead from "../components/UI/RegiesterHead";
import { ToastContainer, toast } from "react-toastify";
import { decryptData, encryptData } from "../helpers/encryption";
import { generateSeedPhrase } from "../helpers/SeedPhraseGenerator";
import Cookies from "js-cookie";


export const StoreSeed = () => {
  const [showData, setShowData] = useState([]);
  const [sendStr, setSendStr] = useState("");
  const { state } = useLocation();
  const [walletList, setWalletList] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    getSeedData();
  }, []);
  
  const { seedData,seedArr,privateKey,address,count } = state || "";
  const getSeedData = async () => {
    const keyForPin = Cookies.get("otp");
    try {
      const seedPhrase=seedData.mnemonic; 
    setSendStr(seedPhrase);  
    let setData = seedPhrase.split(" ");
    setShowData(setData); 
    setWalletList((prevWallets) => [...prevWallets, seedData]);
    console.log(walletList);

  } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <RegiesterHead />
      <section className="signup-sec" id="sign_up">
        <ToastContainer />
        <Container>
          <Row className="mt-5">
            <Col className="d-flex align-items-center m-auto" lg={6}>
              <div className="box w-100">
                {/* <div className="create-box-img">
                                    <img src="assets/images/coin-video-bg.png" alt="" />
                                </div> */}
                <h1>Your Secret phrase</h1>
                <p>
                  White down or copy these words in the right order and save{" "}
                  <br /> them somewhere safe.
                </p>

                <div className="bitter-select">
  {showData?.length > 0 &&
    showData !== null &&
    showData !== undefined
    ? showData.map((items, index) => {
        return (
          <a href="" key={index}>
            {index + 1} {items}
          </a>
        );
      })
    : sendStr}
</div>

                <p>
                  <a
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => {
                      navigator.clipboard.writeText(showData);
                      toast.success("Copied....");
                    }}
                  >
                    <b>COPY</b>
                  </a>
                </p>

                <p className="note-text">
                  DO NOT share your phrase to anyone as this gives full access
                  to your wallet! Yuse Wallet support will Never reach out to
                  ask for it
                </p>

                <Button
                  variant="primary"
                  className="sub_btn"
                  onClick={() => {
                    navigate("/dashboard_home");
                  }}
                >
                  Continue
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
