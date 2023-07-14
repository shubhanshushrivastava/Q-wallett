import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axiosMain from "../api";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { Notification } from "../components/Notification";
import { decryptData } from "../helpers/encryption";
import Cybalance from "../helpers/FatchBalanceHelper";
import Cookies from "js-cookie";


export default function SendOtherChain3() {
  const Web3 = require("web3");
  const { state } = useLocation("/sendotherchain2");
    const { Address1, Amount, chainid, network, maxGas, gasPrice, gasLimit, Nonce,fromwallet3 } = state;
let web3;
  if (chainid == "56") {
		 web3  = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/"));
	} else if (chainid == "1") {
		 web3  = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/a0c5c687788b471093524af62e5e1cec"));
	} else if (chainid == "137") {
		 web3  = new Web3(new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com"));
	} else if (chainid == "97") {
		 web3  = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s2.binance.org:8545/"));
	} else if (chainid == "5") {
		 web3  = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/a0c5c687788b471093524af62e5e1cec"));
	} else if (chainid == "80001") {
		 web3  = new Web3(new Web3.providers.HttpProvider("https://matic-mumbai.chainstacklabs.com"));
	} else {
		 web3  = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"));
	}
  // const web3 = new Web3("https://data-seed-prebsc-2-s2.binance.org:8545");
  const Tx = require('ethereumjs-tx').Transaction;
  const encryptedKey = Cookies.get("privatekey")
  const encryptedPass = Cookies.get("otp")
  const keyForPin = "R#9gK7@L5mN4qP1jH3*";



    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(false);
    // const { user , walletAddress } = useAuth();
    const { user } = useAuth();

    // let walletAddress = document.cookie.replace(
    //   /(?:(?:^|.*;\s*)address\s*\=\s*([^;]*).*$)|^.*$/,
    //   "$1"
    // );
    let walletAddress=fromwallet3.address;
    const [openModel, setOpenModel] = useState(false);
    const [modelMessage, setModelMessage] = useState("");
    const [randomVal, setRandomVal] = useState("");
console.log(fromwallet3,'9iuiytytyt@@@@@@@@@@@@@')
    let userId = user._id;
  const confirm_payment = async () => {
    setDisabled(true);
    setModelMessage("Please Wait...");
    setOpenModel(true);
    setTimeout(() => {
      setRandomVal(Math.floor(Math.random() * 100 + 1));
    }, 500);
    let Cybal = await Cybalance(walletAddress, chainid)
    console.log("balance of account using wallet address",Cybal.balance)
  if(Cybal>Amount){

    try {
      const pass = await decryptData(encryptedPass,keyForPin)
      // const privateKey = await decryptData(encryptedKey,pass);
      const privateKey=fromwallet3.privateKey
      console.log(privateKey,"private key=============");

      console.log("private=======",privateKey)
      const senderAccount = await web3.eth.accounts.privateKeyToAccount(privateKey);
      console.log(senderAccount.address,"address genereted from private key of cookie");
      console.log(walletAddress,"===============wallet-cookie")

      const nonce = await web3.eth.getTransactionCount(senderAccount.address);
      console.log("nonce=======",nonce)
		  const amt1 = Amount * Math.pow(10, 18);

      console.log(amt1,"ushdfjashfjashfdsf");  const txObject = {
        nonce: web3.utils.toHex(nonce),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
        to: Address1,
        value: web3.utils.toHex(amt1),
        data: "0x",

      };

      const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);


      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
        if (!error) {
          setModelMessage("Transaction Successfull");
    setOpenModel(true);
    setTimeout(() => {
      setRandomVal(Math.floor(Math.random() * 100 + 1));
    }, 500);
          console.log("🎉 The hash of your transaction is: ", hash, "");
          navigate("/dashboard_home");

        } else {
          console.log("❗Something went wrong while submitting your transaction:", error)
        }
       });

    } catch (error) {
      console.log(error);
      setModelMessage("Transaction declined");
      setOpenModel(true);
      setTimeout(() => {
        setRandomVal(Math.floor(Math.random() * 100 + 1));
      }, 500);
      // toast.update(id, {
      //     render: "Transaction declined",
      //     type: "warn",
      //     isLoading: false,
      // });
    }
  }
  else{
    setModelMessage("you don't have sufficient amount in wallet");
    setOpenModel(true);
    setTimeout(() => {
      setRandomVal(Math.floor(Math.random() * 100 + 1));
    }, 500);
  }
  }


return (
  <>
    <HomeHeaderOther />
    <section className="section-outer-meta metamask-modal">
      <Notification
        message_mo={modelMessage}
        action_mo={openModel}
        random_val={randomVal}
      />
      <ToastContainer />
      <Container>
        <Row>
          <Col className="m-auto" lg={5}>
            <div className="text-center border-box-meta">
              <h3 className="mt-0">
                <a href="" className="cancel-btn-meta edit-meta">
                  {" "}
                  Edit
                </a>
              </h3>
              <div className="wallet-row-transaction-1">
                <div className="left-1">
                  <img
                    src="/assets/images/Dashboardimg/android-chrome-192x192 1.png"
                    alt=""
                  />
                  <p>
                    {walletAddress.replace(
                      walletAddress.substring(3, 32),
                      "...."
                    )}
                  </p>
                </div>
                <img
                  className="img-center"
                  src="/assets/images/Dashboardimg/arrow-right (2).png"
                  alt=""
                />
                <div className="left-2">
                  <img
                    src="/assets/images/Dashboardimg/android-chrome-192x192 1.png"
                    alt=""
                  />
                  <p>
                    {" "}
                    {Address1.replace(Address1.substring(3, 32), "....")}
                  </p>
                </div>
              </div>
              <h4 className="text-left">
                <a href="">
                  {Amount} {network}
                </a>
              </h4>
              <hr />
              <div className="estimated-fees-box text-left">
                <span>Estimated gas fee</span>
                <div className="text-right">
                  <p>
                    {maxGas} {network}{" "}
                  </p>
                </div>
              </div>
              <hr />
              <div className="estimated-fees-box text-left">
                <span>
                  <b>Total</b>
                </span>
                <div className="text-right">
                  <p>
                    <b>
                      {(Number(Amount) + maxGas).toFixed(6)} {network}
                    </b>
                  </p>
                </div>
              </div>
              <div className="estimated-fees-box text-left">
                <span>Amount + gas fee</span>
                <div className="text-right">
                  <p>
                    Max Amount: {(Number(Amount) + maxGas).toFixed(6)}{" "}
                    {network}{" "}
                  </p>
                </div>
              </div>
              <hr />
              <div className="btn-last-meta">
                <button
                  disabled={disabled}
                  onClick={() => {
                    navigate("/dashboard_home");
                  }}
                  className="gradient-border-btn w-50">
                  Reject
                </button>
                <button
                  onClick={() => {
                    confirm_payment();
                  }}
                  disabled={disabled}
                  className="common-btn ml-0 w-50">
                  Confirm
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </>
);
}
  