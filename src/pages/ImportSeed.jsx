import React, { useState, useEffect } from "react";
import OTPInput from "otp-input-react";
import { Container, Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegiesterHead from "../components/UI/RegiesterHead";
import { ToastContainer, toast } from "react-toastify";
import { decryptData, encryptData } from "../helpers/encryption";

import Cookies from "js-cookie";
export const ImportSeed = () => {
  const crypto = require('crypto');

  const Web3 = require("web3");
  const web3 = new Web3("https://data-seed-prebsc-2-s2.binance.org:8545");
  const { ethers } = require("ethers");


  const { state } = useLocation("/confirm-pin-seed");
  const { deviceKey, pin } = state || "";
  const navigate = useNavigate();
  console.log(pin, 'qqqqq')
  console.log(state, '98989898')
  const [formError, setFormError] = useState("");
  const [createaccount, setCreateaccount] = useState({
    account_name: "",
  });
  const [inputPrivateKey, setInputPrivateKey] = useState({
    privatekey: "",
    Iaccount_name: "",
  });
  const [searchValue, setSearchValue] = useState({
    search: "",
  });
  const [showModal1, setShowmodal1] = useState();
  const [showModal2, setShowmodal2] = useState();
  const [showModal3, setShowmodal3] = useState();
  const [showModal4, setShowmodal4] = useState();

  const [openModel, setOpenModel] = useState(false);
  const [modelMessage, setModelMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [randomVal, setRandomVal] = useState("");
  const [sendStr, setSendStr] = useState("");

  const formdata = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCreateaccount({ ...createaccount, [name]: value });
    setInputPrivateKey({ ...inputPrivateKey, [name]: value });
    setSearchValue({ ...searchValue, [name]: value });
  };


  console.log(inputPrivateKey, 'oommmyg')

  const handleImportSubmit = async () => {
    console.log(inputPrivateKey.privatekey, "=======================================")
    const wordList = inputPrivateKey.privatekey.split(/[,\s]+/);
    console.log(wordList, wordList.length);

    if (!inputPrivateKey.Iaccount_name) {
      setFormError("Please enter wallet name");
    } else if (
      !inputPrivateKey.privatekey ||
      wordList.length !== 12
    ) {
      setFormError("Please enter your valid private key");
    } else {
      setDisabled(true);
      setModelMessage("Import Wallet is in processing");
      setOpenModel(true);
      setTimeout(() => {
        setRandomVal(Math.floor(Math.random() * 100 + 1));
      }, 500);
      // const id = toast.loading(
      //     "Import Wallet is in processing"
      // );
      setFormError("");
      try {

        const formattedSeedPhrase = wordList.join(' ');

        function importWalletFromSeedPhrase(formattedSeedPhrase) {
          // Validate seed phrase
          const isValid = ethers.utils.isValidMnemonic(formattedSeedPhrase);
          if (!isValid) {
            console.error('Invalid seed phrase');
            return null;
          }

          try {
            // Generate wallet from seed phrase
            const wallet = ethers.Wallet.fromMnemonic(formattedSeedPhrase);

            // Retrieve wallet address, private key, and seed phrase
            const address = wallet.address;
            const privateKey = wallet.privateKey;
            console.log(wallet, "=====================================121")
            return {
              address,
              privateKey,
              formattedSeedPhrase,
            };
          } catch (error) {
            console.error('Error importing wallet:', error);
            return null;
          }
        }
        const importedWallet = await importWalletFromSeedPhrase(formattedSeedPhrase);

        console.log("================================", importedWallet, "==========================================");
        if (importedWallet) {
          setModelMessage("Wallet imported successfully");
          setOpenModel(true);
          setTimeout(() => {
            setRandomVal(Math.floor(Math.random() * 100 + 1));
          }, 500);




          const pass = Cookies.get("otp");
          const keyForPin = await decryptData(pass, "R#9gK7@L5mN4qP1jH3*");



          const generateseedformat = {
           
            address: importedWallet.address,
            mnemonic: importedWallet.formattedSeedPhrase,
            privateKey: importedWallet.privateKey
          }
// console.log(generateseedformat,'ye rha shailendra ka output')

          const seedPhrase = generateseedformat.mnemonic;
          const privateKey = generateseedformat.privateKey;

          const senderAccount = await web3.eth.accounts.privateKeyToAccount(privateKey);
          const address = senderAccount.address;
          const default_wallet_name=

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
          Cookies.set("default_wallet_name", inputPrivateKey.Iaccount_name, { sameSite: 'none', secure: true });

          navigate('/dashboard_home')
        }
      } catch (error) {
        console.log("error", error);

        console.log("input private key==========", inputPrivateKey.privatekey)
        
      }
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
                <h1>Enter Seed</h1>
                <div>

                  <InputGroup className="">
                    <FormControl
                      className="create_acc purple-input"
                      type="text"
                      placeholder="Wallet name"
                      name="Iaccount_name"
                      onChange={formdata}
                      value={inputPrivateKey.Iaccount_name}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <FormControl
                      className="create_acc purple-input"
                      type="text"
                      placeholder="Enter your Seed Phrase here"
                      name="privatekey"
                      onChange={formdata}
                      value={inputPrivateKey.privatekey}
                    />
                  </InputGroup>
                  <h4 style={{ color: "red", textAlign: "center" }}>{formError}</h4>
                  <Button
                    className="create_name sub_btn"
                    onClick={() => {
                      handleImportSubmit();
                    }}
                  // disabled={disabled}
                  >
                    IMPORT
                  </Button>
                  {/* <Button
                    onClick={() => {
                      //   setShowmodal3(false);
                    }}
                    // disabled={disabled}
                    className="cancel_create w-100 justify-content-center">
                    CANCEL
                  </Button> */}

                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
