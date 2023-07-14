import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegiesterHead from "../components/UI/RegiesterHead";
import { ToastContainer, toast } from "react-toastify";
import { decryptData, encryptData } from "../helpers/encryption";
import Cookies from "js-cookie";
import { ConsensusType } from "@ethereumjs/common";

export const Secretphrase = () => {
  const Web3 = require("web3");
  const ethers = require('ethers');

  const web3 = new Web3("https://data-seed-prebsc-2-s2.binance.org:8545");
  const { state } = useLocation("/Confirm-pin");
  const { deviceKey, pin } = state || "";
  const bip39 = require('bip39');
  const crypto =  require('crypto');

  const navigate = useNavigate();

  const [showData, setShowData] = useState([]);
  const [sendStr, setSendStr] = useState("");

  useEffect(() => {
    getSeedData();
  }, []);

  const generateSeedPhrase = async() => {
    // Generate a new random seed phrase
    // const entropyBytes = crypto.randomBytes(16); // 16 bytes for 128 bits of entropy
    const mnemonic = await ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
const wallet = ethers.Wallet.fromMnemonic(mnemonic);
console.log("===============11",wallet);
   
    const address = wallet.address;
    const privateKey = wallet.privateKey
   
    return {
      mnemonic,
      privateKey,
      address
    };
  };
  
  const getSeedData = async () => {
    const pass = Cookies.get("otp");
    const keyForPin = await decryptData(pass, "R#9gK7@L5mN4qP1jH3*");
  
    try {
      const seedData = await generateSeedPhrase();
      const seedPhrase = seedData.mnemonic;
      const privateKey = seedData.privateKey;
    
      const senderAccount = await web3.eth.accounts.privateKeyToAccount(privateKey);
      const address = senderAccount.address;
  
      console.log(privateKey, "private key");
      console.log("address before conversion from privateKey", address);
  
      const encryptedSeedData = await encryptData(seedPhrase, keyForPin);
      const encryptedPrivateData = await encryptData(privateKey, keyForPin);
      const decryptedKey = await decryptData(encryptedPrivateData, keyForPin);
      console.log("decrypted key", decryptedKey);
      console.log(senderAccount.address, "address generated from privateKey of cookie");
  
      Cookies.set("encryptedSeedPhrase", encryptedSeedData, { sameSite: 'none', secure: true });
      Cookies.set("address", address, { sameSite: 'none', secure: true });
      Cookies.set("privatekey", encryptedPrivateData, { sameSite: 'none', secure: true });
      
      setSendStr(seedPhrase);
      let setData = seedPhrase.split(" ");
      setShowData(setData); 
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
                  Write down or copy these words in the right order and save{" "}
                  <br /> them somewhere safe.
                </p>

                <div className="bitter-select">
                  {showData?.length > 0 &&
                  showData !== null &&
                  showData !== undefined
                    ? showData.map((items, index) => {
                        return (
                          <a href="">
                            {index + 1} {items}
                          </a>
                        );
                      })
                    : ""}
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
                    navigate("/verify-phrase", {
                      state: {
                        deviceKey: deviceKey,
                        pin: pin,
                        seedArr: sendStr,
                      },
                    });
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
