import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
  Modal,
  Dropdown,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axiosMain from "../api";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import Cybalance from "../helpers/FatchBalanceHelper";
import useAuth from "../hooks/useAuth";
import QRCode from "react-qr-code";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  changenetwork,
  setWalletAddress,
} from "../reducers/authReducers";

// import * as Icon from 'react-bootstrap-icons';
import OtherTransaction from "../helpers/FatchTransactionhelper";
import { Notification } from "../components/Notification";
import { Details } from "../helpers/RateHelper";
import { NFTDetail, NFTDetailByWallet } from "../helpers/FatchNFTHelper";
import axios from "axios";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "../helpers/encryption";
import Tokenbalance from "../helpers/TokenBalanceHelper";

export default function DashboardHome() {
  const crypto = require('crypto');

  const Web3 = require("web3");
  const web3 = new Web3("https://data-seed-prebsc-2-s2.binance.org:8545");
  const { ethers } = require("ethers");
  const auth = useSelector((state) => state.auth.isChangeNetwork);
  const [openModel, setOpenModel] = useState(false);
  const [modelMessage, setModelMessage] = useState("");
  const [randomVal, setRandomVal] = useState("");
  const [CollectionList, setCollectionList] = useState("");
  const [CollectionNFTList, setCollectionNFTs] = useState("");
  const [showModal5, setShowmodal5] = useState();
  const bip39 = require('bip39');
  const [sendStr, setSendStr] = useState("");
  const [cookies, setCookie] = useCookies(['walletList']);
  const [cookiesToken, setCookieToken] = useCookies(['tokenList']);
  const [tokenList, settokenList] = useState([]);
  const [walletAddre, setWalletAddre] = useState(Cookies.get("address"));
  const [walletAddre_name, setWalletAddre_name] = useState(Cookies.get("default_wallet_name"));
  const [transferwallet, settransferwallet] = useState({

    address: '',
    privateKey: ''
  })

  const [walletname_receive, setwalletname_receive] = useState('')
  // const [default_wallet, setdefault_wallet] = useState({
  //   wallet_name:Cookies.get("default_wallet_name"),
  //  address:Cookies.get("address"),
  //  mnemonic:importedWallet.seedPhrase,
  //  privateKey:importedWallet.privateKey

  // })


  const [wallet_default, setwallet_default] = useState({
    wallet_name: '',
    address: '',
    mnemonic: '',
    privateKey: ''

  })
  useEffect(async () => {

    const pass = Cookies.get("otp");
    const keyForPin = await decryptData(pass, "R#9gK7@L5mN4qP1jH3*");

    const a = Cookies.get("encryptedSeedPhrase")
    console.log(a, 'mko')
    const decryptedKeyasas = await decryptData(a, keyForPin);
    const decryptedKeysdsd = await decryptData(Cookies.get("privatekey"), keyForPin);
    setwallet_default({
      wallet_name: walletAddre_name,
      address: walletAddre,
      mnemonic: decryptedKeyasas,
      privateKey: decryptedKeysdsd
    })

    settransferwallet({
      address: Cookies.get("address"),
      privateKey: decryptedKeysdsd,
    })
  }, [])


  // useEffect(() => {
  //   if (cookiesToken.tokenList) {
  //     settokenList(cookiesToken.tokenList)
  //   }
  // }, [])
  console.log(tokenList, '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~****************')
  console.log(transferwallet, '1`1`1`##########################`1`1`1')
  useEffect(() => {
    setwalletname_receive(wallet_default.wallet_name ? wallet_default.wallet_name : '')
  }, [wallet_default.wallet_name])

  useEffect(() => {
    const val = localStorage.getItem("onetimemodel");
    if (val == "true") {
      setShowmodal5(true);
    }
  }, []);

  const handleModalClose5 = () => {
    setShowmodal5(false);
    localStorage.setItem("onetimemodel", "false");
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, walletAddress, isAuthenticated, walletMainAdd } = useAuth();

  const [walletName, setWalletName] = useState(
    localStorage.getItem("wallet_name")
  );



  const [walletMainAdd1, setWalletMainAdd1] = useState(walletMainAdd);

  const [count, setCount] = useState(1);

  console.log(walletAddre, "Wallet Address");
  useEffect(() => {
    fetch_balance();
    // Account_call();
  }, []);
  const [showModal1, setShowmodal1] = useState();
  const [showModal2, setShowmodal2] = useState();
  const [showModal3, setShowmodal3] = useState();
  const [showModal4, setShowmodal4] = useState();

  const handleModalClose1 = () => {
    setShowmodal1(false);
  };

  let userId = user._id;

  const [copy, setCopy] = useState(false);
  const [balance, setBalance] = useState(0);

  const [transactionOtherHistory, setOtherTransactionHistory] = useState(null);
  const [explorer, setExplorer] = useState(null);
  const [walletList, setWalletList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [network, setNetwork] = useState("BNB");
  const [imgLogo, setImgLogo] = useState("");
  const [inputnetwork, setInputNetwork] = useState(97);

  const check = inputnetwork;
  // console.log("check val",check);

  const fetch_balance = async () => {
    console.log("funtion Called");
    console.log(walletAddre, "Wallet Address in Balance fetch");
    let bal = await Cybalance(walletAddre, inputnetwork);
    setBalance(bal.balance);
    console.log(bal, "balance");
  };
  console.log(balance, "balance2");
  const [ERCArray, setTokenArray] = useState([]);
  // const fetch_contract_List = async () => {
  //   try {
  //     const payload = {
  //       user_id: "63189baa93aed474bf764a03",
  //       chainid: "97",
  //       publicKey: walletAddre,
  //     };
  //     await axios
  //       .post("https://q3.donative.in:3000/token-list", payload)
  //       .then((Transactions_res) => {
  //         if (Transactions_res) {
  //           setTokenArray(Transactions_res.data.data);
  //         }
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const Fetch_Collections = async () => {
    let NFT = await NFTDetail(inputnetwork, walletAddre);
    let collection = NFT.collection;
    setCollectionList(collection);
  };

  const NFTListPage = async (Tokenaddress, TokenName) => {
    navigate("/NFTlist", {
      state: {
        Tokenaddress: Tokenaddress,
        chainid: inputnetwork,
        wallet: walletAddre,
        TokenName: TokenName,
        explorer: explorer,
      },
    });
  };

  useEffect(() => {
    // fetch_contract_List();
    Fetch_Collections();
  }, [inputnetwork, walletAddre]);

  // useEffect(() => {
  //     Fetch_NFTs()
  // }, [CollectionList])

  const [rates, setRates] = useState("");

  const [Rate, setRate] = useState(0);
  const RateWithToken = async (e) => {
    let rate;
    if (network == "BNB") {
      rate = rates?.rateBNB;
      rate = rate * 1e9;
    } else if (network == "MATIC") {
      rate = rates?.rateBUSD;
      rate = 0 * 1e9;
    } else if (network == "ETH") {
      rate = rates?.rateEtH;
      rate = rate * 1e9;
    }
    rate = rate * balance;
    setRate(Number(rate));
  };

  const getRates = async () => {
    const api = await Details();
    setRates(api);
  };

  useEffect(() => {
    getRates();
    RateWithToken();
    getOtherTransactions();
  }, []);

  useEffect(() => {
    fetch_balance();
    // Account_call();
    changeNetwork();
    RateWithToken();
    getOtherTransactions();
  }, [check]);

  useEffect(() => {
    RateWithToken();
  }, [balance, network]);

  useEffect(() => {
    changeNetwork();
    RateWithToken();
    getOtherTransactions();
  }, [network]);

  const changeNetwork = () => {
    setOtherTransactionHistory("");
    setImgLogo("assets/images/Dashboardimg/moneda_transparent.gif");
    if (inputnetwork == "1") {
      setNetwork("ETH");
      dispatch(
        changenetwork({
          isChangeNetwork: "1",
        })
      );
    } else if (inputnetwork == "5") {
      setNetwork("ETH");
      dispatch(
        changenetwork({
          isChangeNetwork: "5",
        })
      );
    } else if (inputnetwork == "56") {
      setNetwork("BNB");
      dispatch(
        changenetwork({
          isChangeNetwork: "56",
        })
      );
    } else if (inputnetwork == "97") {
      setNetwork("BNB");
      dispatch(
        changenetwork({
          isChangeNetwork: "97", walletAddre
        })
      );
    } else if (inputnetwork == "137") {
      setNetwork("MATIC");
      dispatch(
        changenetwork({
          isChangeNetwork: "137",
        })
      );
    } else if (inputnetwork == "80001") {
      setNetwork("MATIC");
      dispatch(
        changenetwork({
          isChangeNetwork: "80001",
        })
      );
    } else {
      setNetwork("BNB");
    }
  };

  const getOtherTransactions = async () => {
    let obj = await OtherTransaction(walletAddre, inputnetwork);
    let otherTrx = obj.mainTransaction;
    let explore = obj.explorer;
    let imgLogo = obj.imgLogo;
    setOtherTransactionHistory(otherTrx);
    setExplorer(explore);
    setImgLogo(imgLogo);
  };

  const qtest = () => {
    document.getElementById("qtest").style.display = "block";
    document.getElementById("transfer_history").style.display = "none";
    document.getElementById("qaddclass").classList.add("active-btn");
    document.getElementById("qaddclass").classList.remove("testclass");
    document.getElementById("traddclass").classList.remove("active-btn");
    document.getElementById("traddclass").classList.add("testclass");
  };
  const transfer = () => {
    document.getElementById("transfer_history").style.display = "block";
    document.getElementById("qtest").style.display = "none";
    document.getElementById("traddclass").classList.add("active-btn");
    document.getElementById("traddclass").classList.remove("testclass");
    document.getElementById("qaddclass").classList.remove("active-btn");
    document.getElementById("qaddclass").classList.add("testclass");
  };

  const HandelSendOther = () => {
    if (balance <= 0) {
      setModelMessage("You don't have sufficient amount");
      setOpenModel(true);
      setTimeout(() => {
        setRandomVal(Math.floor(Math.random() * 100 + 1));
      }, 500);
      // toast.warn("You don't have sufficient amount")
    } else {
      console.log("===========121================", network, network.chainid)
      navigate("/sendotherchain1", {
        state: { walletlist: "abc", chainid: inputnetwork, network: network, fromwallet: transferwallet },
      });
    }
  };

  const Account_call = async () => {
    try {
      const payload = {
        user_id: userId,
      };

      const wallet_res = await axiosMain.post("/wallet-list", payload);
      if (wallet_res) {
        setWalletList(wallet_res.data.data);
        localStorage.setItem(
          "wallet_name",
          wallet_res.data.data[0].wallet_name
        );
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  const select_account = async (items) => {
    // console.log(items,'qsgcwdryjwgdhsyg')
    settransferwallet({
      address: items.address,
      privateKey: items.privateKey
    })
    let name = "Main Account";
    if (items.wallet_name) {
      name = items.wallet_name;
    }
    setwalletname_receive(items.wallet_name)
    // console.log(items.wallet_name, '_______________(((((((((((((7')
    localStorage.setItem("wallet_name", name);
    setWalletAddre(items.address);
    dispatch(
      login({
        user: user,
        isAuthenticated: isAuthenticated,
        walletCreated: items.address,
        walletMainAdd: walletMainAdd1,
      })
    );
    // fetch_balance();

    let bal = await Cybalance(items.address, inputnetwork);
    setBalance(bal.balance);
    console.log(walletMainAdd1);
    setTimeout(() => {
      // window.location.reload();
    }, 3000);
  };
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
  const [formError, setFormError] = useState("");
  const formdata = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCreateaccount({ ...createaccount, [name]: value });
    setInputPrivateKey({ ...inputPrivateKey, [name]: value });
    setSearchValue({ ...searchValue, [name]: value });
  };

  useEffect(() => {
    // Load wallet list from cookies when the component mounts
    if (cookies.walletList) {
      setWalletList(cookies.walletList);
    }

  }, []);
  console.log(walletList, "Wallet");
  const generateSeedPhrase = async () => {
    // Generate a new random seed phrase
    const mnemonic = await ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
    const wallet = await ethers.Wallet.fromMnemonic(mnemonic);
    console.log(wallet);

    // Derive the private key and address from the seed phrase
    const address = wallet.address;
    const privateKey = wallet.privateKey

    return {
      mnemonic,
      privateKey,
      address
    };
  };



  const create_wallet = async () => {
    const seedData = await generateSeedPhrase();

    const seedDataUpdate = {
      ...seedData,
      wallet_name: createaccount.account_name,
    }
    console.log(seedData);
    console.log(walletList)
    const updatedWalletList = [...walletList, seedDataUpdate];
    setWalletList(updatedWalletList);
    setCookie('walletList', updatedWalletList, { path: '/' });
    console.log(walletList)


    const seedPhrase = seedData.mnemonic;
    const privateKey = seedData.privateKey;
    setSendStr(seedPhrase);

    const senderAccount = await web3.eth.accounts.privateKeyToAccount(privateKey);
    const address = senderAccount.address;

    setCount(count + 1);

    console.log(privateKey, "private key");
    setShowmodal2(false);
    console.log("newWallet created while generating new sub-wallet=========:", seedData);
    navigate("/savePhrase", {
      state: {
        seedData: seedData,
        seedArr: sendStr,
        privateKey: privateKey,
        address: address,
        walletList: walletList,
        count: count,
        wallet_name: createaccount.account_name
      },
    });
  };



  const importaccount = async () => {
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
        // const import_payload = {
        //   user_id: userId,
        //   privateKey: inputPrivateKey.privatekey,
        //   wallet_name: inputPrivateKey.Iaccount_name,
        // };
        // const importAcc_res = await axiosMain.post(
        //   "/import-wallet",
        //   import_payload
        // );
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

        console.log('Account Address:', importedWallet.address);
        console.log('Seed Phrase:', importedWallet.seedPhrase);


        if (importedWallet) {
          setModelMessage("Wallet imported successfully");
          setOpenModel(true);
          setTimeout(() => {
            setRandomVal(Math.floor(Math.random() * 100 + 1));
          }, 500);








          const generateseedformat = {
            wallet_name: inputPrivateKey.Iaccount_name,
            address: importedWallet.address,
            mnemonic: importedWallet.seedPhrase,
            privateKey: importedWallet.privateKey
          }
          const updatedWalletList = [...walletList, generateseedformat];
          setWalletList(updatedWalletList);
          setCookie('walletList', updatedWalletList, { path: '/' });
          console.log(walletList)


          const seedPhrase = importedWallet.seedPhrase;
          const privateKey = importedWallet.privateKey;
          setSendStr(seedPhrase);

          const senderAccount = await web3.eth.accounts.privateKeyToAccount(privateKey);
          const address = senderAccount.address;

          setCount(count + 1);

          console.log(privateKey, "private key");
          setShowmodal2(false);






          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      } catch (error) {
        console.log("error", error);

        console.log("input private key==========", inputPrivateKey.privatekey)
        // setModelMessage("Failed to import account");
        // setOpenModel(true);
        // setTimeout(() => {
        //   setRandomVal(Math.floor(Math.random() * 100 + 1));
        // }, 500);
        // // toast.update(id, {
        // //     render: "Failed to import account",
        // //     type: "error",
        // //     isLoading: false,
        // // });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
      }
    }
  };

  const [editFormError, setEditFromError] = useState("");
  const [editnameval, setEditnameval] = useState({
    user_id: user._id,
    walletAdd: walletAddress,
    walletname: walletName || "",
  });
  const formeditname = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditnameval({ ...editnameval, [name]: value });
  };
  console.log(wallet_default.wallet_name, '################################################################')
  const edit_name = () => {
    if (walletAddress == walletMainAdd) {
      setModelMessage("You can not edit the name of main account");
      setOpenModel(true);
      setTimeout(() => {
        setRandomVal(Math.floor(Math.random() * 100 + 1));
      }, 500);
    } else {
      document.getElementById("editname").style.display = "none";
      document.getElementById("inputedit").style.display = "block";
      document.getElementById("editbtn").style.display = "none";
      document.getElementById("updatebtn").style.display = "block";
    }
  };
  const update_name = async () => {
    // /edit-wallet-name
    if (!editnameval.walletname) {
      setEditFromError("please enter name");
    } else {
      setEditFromError("");
      try {
        const res = await axiosMain.post("/edit-wallet-name", editnameval);
        console.log(res);
        if (res) {
          setModelMessage("Wallet name updated successfully");
          setOpenModel(true);
          setTimeout(() => {
            setRandomVal(Math.floor(Math.random() * 100 + 1));
          }, 500);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      } catch (error) {
        setModelMessage(error.response.data.message);
        setOpenModel(true);
        setTimeout(() => {
          setRandomVal(Math.floor(Math.random() * 100 + 1));
        }, 500);
        // toast.error(error.request.data.message)
      }
    }
  };
  //dropdown setting show
  const handleSetting = () => {
    navigate("/setting", {
      state: {
        walletAddress: walletAddre,
        walletList: walletList,
      },
    });
  }

  const handleLinkClick = (data) => {
    if (data == 'onmeta') {
      window.open("https://docs.onmeta.in/widget/widget-creation", "_blank");
    } else if (data == 'onramp') {
      window.open("https://onramp.money/main/buy/?appId=306442&walletAddress=0x25E8dCdF4ceF1536C38B815D1b06D6cF0E52E7F7", "_blank");
    } else if (data == 'onramper') {
      window.open("https://buy.onramper.com/?apiKey=pk_prod_D5QAh8jTWg0ysQQhGuJq0s_RY72E43Jt1H0GElHg0W40", "_blank");
    }
  }

  useEffect(async () => {

    console.log(inputnetwork, '0polzaaza')
    if (cookiesToken.tokenList) {
      const updateddata = await Promise.all(
        cookiesToken.tokenList.map(async (items, index) => {
          const tokenBalance = await Tokenbalance(walletAddre, inputnetwork, items.contractAddress)
          console.log(tokenBalance, '_____________________________________----*********************')
          if (tokenBalance) {
            return {
              ...items,
              balance: tokenBalance
            }
          } else {
            return [];
          }
          // return {

          // }
        }));
      if (updateddata) {
        settokenList(updateddata)
      } else {
        settokenList([])
      }
      console.log(updateddata, '0909909))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))')
      // settokenList(updateddata)
    }

  }, [inputnetwork, walletAddre])

  // console.log(inputnetwork, '%%%%%%%%%%%%%%%%%%~~~~~~~~~~~~~~~~~~$$$$$$$$$$$')

  return (
    <>
      <HomeHeaderOther />
      <section id="dash_home">
        <Notification
          message_mo={modelMessage}
          action_mo={openModel}
          random_val={randomVal}
        />
        <ToastContainer />
        <Container>
          <Row className="dash_row1">
            <Col lg={10} className="d-flex align-items-center">
              <div className="dash_box w-100">
                <div className="head">
                  <div>
                    {user.profilePic ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-person-circle"
                        viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-person-circle"
                        viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="head2">
                    <h4>{user.name}</h4>
                    <div className="d-flex">
                      <Dropdown className="dropdown-meta-value1 dropdown-home-dash">
                        <Dropdown.Toggle>
                          <div className="inner-asset-box">
                            <p
                              id="copytext1"
                              style={{
                                display: "inline-block",
                                marginRight: "5px",
                              }}>
                              {walletAddre}
                              {/* -{walletAddre_name} */}
                            </p>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>

                          <Dropdown.Item
                            onClick={() => {
                              select_account(wallet_default);
                            }}>
                            <div className="inner-asset-box">
                              <div>
                                <h4>
                                  {wallet_default.wallet_name
                                    ? wallet_default.wallet_name
                                    : "Main Account"}
                                </h4>
                                <p>{wallet_default.wallet_address}</p>
                              </div>
                            </div>
                          </Dropdown.Item>


                          {walletList &&
                            walletList.map((items, index) => {
                              { console.log(items, "Wallet items") }

                              return (

                                <Dropdown.Item
                                  onClick={() => {
                                    select_account(items);
                                  }}>
                                  <div className="inner-asset-box">
                                    <div>
                                      <h4>
                                        {items.wallet_name
                                          ? items.wallet_name
                                          : "Main Account"}
                                      </h4>
                                      <p>{items.wallet_address}</p>
                                    </div>
                                  </div>
                                </Dropdown.Item>
                              );
                            })}
                        </Dropdown.Menu>
                      </Dropdown>
                      <img
                        className="cross_img copy-img"
                        height={10}
                        onClick={() => {
                          navigator.clipboard.writeText(walletAddre);
                          setCopy(true);
                          setModelMessage("Copied to clipboard");
                          setOpenModel(true);
                          setTimeout(() => {
                            setRandomVal(Math.floor(Math.random() * 100 + 1));
                          }, 500);
                          // toast.success("Copied to clipboard")
                          setTimeout(() => {
                            setCopy(false);
                          }, [2500]);
                        }}
                        src="/assets/images/Dashboardimg/copy.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="head_side">
                    <div className="dropdown">
                      <button
                        className="side_btn"
                        type=""
                        id="menu1"
                        data-toggle="dropdown">
                        <img
                          src="/assets/images/Dashboardimg/Icon.png"
                          alt=""
                        />
                      </button>
                      <ul
                        className="dropdown-menu"
                        role="menu"
                        aria-labelledby="menu1">
                        <li>
                          <a
                            target="_blank"
                            href={`${explorer}/address/${walletAddre}`}>
                            <img
                              src="/assets/images/Dashboardimg/external-link.png"
                              alt=""
                            />
                            <p>View Account On Explorer</p>
                          </a>
                        </li>
                        <li>
                          <a
                            className="cross_img"
                            onClick={() => {
                              setShowmodal1(true);
                            }}>
                            <img
                              src="/assets/images/Dashboardimg/Group.png"
                              alt=""
                            />
                            <p>Account Details</p>
                          </a>
                        </li>
                        {/* <li><img src="/assets/images/Dashboardimg/Frame.png" alt="" /><p>View Network Assets</p></li>
                                                <li><img src="/assets/images/Dashboardimg/Frame (1).png" alt="" /><p>Connected Sites</p></li> */}
                        <li>
                          <a
                            onClick={() => {
                              setShowmodal2(true);
                            }}>
                            <img
                              src="/assets/images/Dashboardimg/plus-circle.png"
                              alt=""
                            />
                            <p className="cross_img">Create Account</p>
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              setShowmodal3(true);
                            }}>
                            <img
                              src="/assets/images/Dashboardimg/download (2).png"
                              alt=""
                            />
                            <p className="cross_img">Import Account</p>
                          </a>
                        </li>

                        <li>
                          <a onClick={() => handleSetting()}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                            </svg>
                            <p className="cross_img">Setting</p>
                          </a>


                          {/* 
                          <Dropdown className="dropdown-meta-value1 dropdown-home-dash">
                        <Dropdown.Toggle>
                          <div className="inner-asset-box">
                            <p
                              id="copytext1"
                              style={{
                                display: "inline-block",
                                marginRight: "5px",
                              }}>
                             dsfsdg
                        
                            </p>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>

                          <Dropdown.Item
                            onClick={() => {
                              select_account(wallet_default);
                            }}
                            >
                            <div className="inner-asset-box">
                              <div>
                                <h4>
                                  {wallet_default.wallet_name
                                    ? wallet_default.wallet_name
                                    : "Main Account"}
                                </h4>
                                <p>{wallet_default.wallet_address}</p>
                              </div>
                            </div>
                          </Dropdown.Item>


                       
                        </Dropdown.Menu>
                      </Dropdown> */}
                          <ul className="inner-dropdown-setting" id="inner-dropdown-setting">
                            <li>
                              <a><img src="" /><p className="cross_img"> Privacy POlicy</p></a>
                            </li>
                            <li><a><img src="" /><p className="cross_img">My Account</p></a></li>
                          </ul>
                        </li>

                        {/* <li><img src="/assets/images/Dashboardimg/settings.png" alt="" /><p>Settings</p><span className="coming_soon">Coming soon</span></li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <Row className="body1 mt-5">
                  <Col lg={3}></Col>
                  <Col lg={4} className="body1b">
                    <InputGroup className="mb-3">
                      <Form.Select
                        className="form-control formselect"
                        aria-label="Default select example"
                        placeholder="BNB Main Network"
                        name="network1"
                        onChange={(e) => setInputNetwork(e.target.value)}
                        value={inputnetwork}>
                        <option value="97">BNB Smart Chain Testnet</option>
                        <option value="56">BNB Smart Chain Mainnet</option>
                        <option value="1">Ethereum Mainnet</option>
                        <option value="5">Goerli Test Network</option>
                        <option value="137">Matic Mainnet</option>
                        <option value="80001">Polygon Testnet</option>
                      </Form.Select>
                    </InputGroup>
                    {/* <img src={val11} alt="" /> */}
                  </Col>
                </Row>
                <Row className="body2">
                  <Col lg={12}>
                    <img
                      width={40}
                      style={{ display: "flex", margin: "0 auto" }}
                      src={imgLogo}
                      alt=""
                    />
                    <h1>
                      {balance.toFixed(4)} {network}
                    </h1>
                    {/* <p>{((balance)).toFixed(4)} USD</p> */}
                  </Col>
                </Row>
                <Row className="body3 text-center">
                  <Col lg={12}>
                    {network == "BNB" ? (
                      <Button
                        onClick={() => {
                          setShowmodal4(true);
                        }}
                        className="send_btn">
                        BUY YuseCoin
                      </Button>
                    ) : (
                      <></>
                    )}
                    <Button
                      onClick={() => {
                        HandelSendOther();
                      }}
                      className="receive_btn">
                      SEND
                    </Button>
                    <Button
                      onClick={() => {
                        setShowmodal1(true);
                      }}
                      className="send_btn">
                      RECEIVE
                    </Button>
                    {/* <Button onClick={() => {
                                            navigate("/stakes")
                                        }} className="receive_btn">STAKE</Button> */}
                  </Col>
                </Row>
                <hr />
                <div>
                  <Row className="body3 mt-5">
                    <Col
                      lg={12}
                      className="transaction-btn-new"
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}>
                      <div
                        id="qaddclass"
                        onClick={() => {
                          qtest();
                        }}
                        className="active-btn">
                        Assets
                      </div>
                      <div
                        id="traddclass"
                        onClick={() => {
                          transfer();
                        }}
                        className="testclass">
                        Activity
                      </div>
                    </Col>
                  </Row>
                  <div id="transfer_history">
                    <Row className="body4 mt-5">
                      <Col lg={12}>
                        <h2>Transactions History</h2>
                      </Col>
                    </Row>

                    {transactionOtherHistory &&
                      transactionOtherHistory.length > 0 ? (
                      transactionOtherHistory &&
                      transactionOtherHistory.map((items, index) => {
                        return (
                          <Row className="body5">
                            <Col lg={4} md={6} sm={6} xs={6}>
                              <p>
                                {new Date(
                                  items.timeStamp * 1000
                                ).toDateString()}
                              </p>
                              <div className="tran_htoy">
                                <div>
                                  <img width={40} src={imgLogo} alt="" />
                                </div>
                                <div className="tran_htoy1">
                                  <h4>{network}</h4>
                                  {!items.hash ? (
                                    <a>null</a>
                                  ) : (
                                    <a
                                      target="_blank"
                                      href={`${explorer}/tx/${items.hash}`}>
                                      {items.hash.replace(
                                        items.hash.substring(15, 50),
                                        "...."
                                      )}
                                    </a>
                                  )}
                                </div>
                              </div>
                            </Col>
                            <Col
                              lg={4}
                              md={6}
                              sm={6}
                              xs={6}
                              className="amt_side">
                              {items.txreceipt_status == "1" ? (
                                <Button className="pend_btn1">Success</Button>
                              ) : (
                                <Button className="pend_btn">Pending</Button>
                              )}
                              <h3 className="coin1">
                                {(items.value / 1e18).toFixed(4)} {network}
                                {items.from ==
                                  `${walletAddre.toLowerCase()}` ? (
                                  <span style={{ margin: '10px' }} className="send-coin">Send</span>
                                ) : (
                                  <span style={{ margin: '10px' }} className="send-coin">Receive</span>
                                )}
                              </h3>
                            </Col>
                          </Row>
                        );
                      })
                    ) : (
                      <h1
                        style={{
                          textAlign: "center",
                          color: "white",
                          marginTop: "70px",
                        }}>
                        No transaction found
                      </h1>
                    )}
                  </div>
                  <div id="qtest">
                    <div className="tabs-inner-new">
                      <Tabs defaultActiveKey="tab1" className="mb-3 ">
                        <Tab eventKey="tab1" title="Token">
                          {tokenList.length > 0 ? (
                            tokenList &&
                            tokenList.map((items, index) => {
                              let newval = Math.floor(Math.random() * 5);

                              //  const tokenBalance = await Tokenbalance(walletAddre, inputnetwork, items.contractAddress)

                              let imgstr =
                                "assets/images/Token_logo/img_" +
                                newval +
                                ".png";
                              return (
                                <div key={index}>
                                  <Row className="body6">
                                    <Col lg={12} md={6} sm={6} xs={12}>
                                      <div className="flex-asset-row">
                                        <div
                                          className="tran_htoy"
                                          onClick={() => {
                                            if (items.tokenType == "ERC20") {
                                              navigate("/dashboard_tokens", {
                                                state: {
                                                  val: items.balance,
                                                  chain: inputnetwork,
                                                  contract:
                                                    items.contractAddress,
                                                  name: items.symbol,
                                                  imglogo:
                                                    items.img_url || imgstr,
                                                  net: network,
                                                },
                                              });
                                            } else {
                                              console.log("");
                                            }
                                          }}>
                                          {/* <div>
                                            {items.img_url == "" ? (
                                              <img
                                                src={imgstr}
                                                alt="not"
                                                style={{ height: "25px" }}
                                              />
                                            ) : (
                                              <img
                                                src={items.img_url}
                                                alt=""
                                                style={{ height: "25px" }}
                                              />
                                            )}
                                          </div> */}
                                          <div className="tran_htoy1">
                                            <h4 style={{ fontSize: "20px" }}>
                                              {items.balance.Token_balance}{" "}
                                              {items.symbol}
                                            </h4>
                                          </div>
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                  <hr />
                                </div>
                              );
                            })
                          ) : (
                            <h1
                              style={{
                                textAlign: "center",
                                color: "white",
                                marginTop: "70px",
                              }}>
                              No Assets found
                            </h1>
                          )}
                          <div className="text-center import-tag-link">
                            <hr />
                            <button
                              className=" tag-link"
                              onClick={() => {
                                navigate("/import_token", {
                                  state: { inputnetwork: inputnetwork, walletaddress: walletAddre },
                                });
                              }}>
                              Import Token
                            </button>
                          </div>
                          {/* <button className="common-btn" onClick={() => {
                                                        navigate("/import_NFT", { state: { inputnetwork: inputnetwork } })
                                                    }}>Import NFT</button> */}
                        </Tab>
                        <Tab eventKey="tab2" title="NFT">
                          <Row>
                            {CollectionList.length > 0 ? (
                              CollectionList &&
                              CollectionList.map((items, index) => {
                                return (
                                  <>
                                    <Col md={4} key={index}>
                                      <a
                                        onClick={() =>
                                          NFTListPage(
                                            (items?.TokenAddress).toLowerCase(),
                                            items?.Name
                                          )
                                        }>
                                        <div className="nft-item1">
                                          <div className="nft-item-image">
                                            <div className="portrait">
                                              {items?.metadata ? (
                                                <img
                                                  className=" nft__item_preview portrait"
                                                  alt="Collection Img"
                                                  src={`https://gateway.ipfs.io/ipfs/${JSON.parse(
                                                    items?.metadata
                                                  )?.image.slice(-46)}`}
                                                />
                                              ) : (
                                                <img
                                                  className=" nft__item_preview portrait"
                                                  alt="Collection Img"
                                                  src="/assets/images/nft1.png"
                                                />
                                              )}
                                            </div>
                                          </div>
                                          <div className="nft-item-inner">
                                            <div>
                                              <h4>
                                                {items?.Name} {"("}
                                                {items.Symbol}
                                                {")"}
                                              </h4>
                                            </div>
                                            <div className="nft-item-price">
                                              <span title="Quantity 1">
                                                {items?.TokenAddress.replace(
                                                  items?.TokenAddress.substring(
                                                    5,
                                                    35
                                                  ),
                                                  "...."
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </Col>
                                  </>
                                );
                              })
                            ) : (
                              <h1
                                style={{
                                  textAlign: "center",
                                  color: "white",
                                  marginTop: "70px",
                                }}>
                                No Assets found
                              </h1>
                            )}
                          </Row>
                        </Tab>
                      </Tabs>
                    </div>

                    {/* <button className="common-btn" onClick={()=>{
                                                navigate("/import_token", { state: { inputnetwork: inputnetwork } })
                                            }}>Import</button> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Modal
            show={showModal1}
            onHide={handleModalClose1}
            backdrop="static"
            keyboard={false}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          // style={{ display: "flex", alignItems: "center" }}
          >
            <Modal.Header
              style={{
                background: "black",
                color: "white",
                borderColor: "#c39a48",
              }}>
              <Modal.Title>Account Details</Modal.Title>
              <h1
                className="cross_img"
                onClick={() => {
                  setShowmodal1(false);
                }}
                style={{ margin: "0 0 0 auto", color: "#c39a48" }}>
                X
              </h1>
            </Modal.Header>
            <Modal.Body style={{ background: "black" }}>
              <Row>
                <p
                  style={{
                    fontSize: "15px",
                    textAlign: "center",
                    color: "white",
                  }}>
                  Wallet Address
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                  }}>
                  <p style={{ textAlign: "center" }} id="editname">
                    {walletname_receive ? walletname_receive : "Main Account"}
                  </p>
                  <input
                    type="text"
                    className="form-control buynow_form-text"
                    id="inputedit"
                    name="walletname"
                    onChange={formeditname}
                    value={editnameval.walletname}
                    placeholder={walletName}
                  />
                  <button
                    id="editbtn"
                    className="btn_edit"
                    onClick={() => {
                      edit_name();
                    }}>
                    Edit
                  </button>
                  <button
                    id="updatebtn"
                    className="btn_edit"
                    onClick={() => {
                      update_name();
                    }}>
                    update
                  </button>
                </div>
                <h4
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: "20px",
                  }}>
                  {formError}
                </h4>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p
                    className="address-wrap"
                    style={{
                      fontSize: "15px",
                      textAlign: "center",
                      color: "white",
                    }}>
                    {walletAddre}
                  </p>
                  <img
                    className="cross_img copy-img"
                    style={{
                      display: "flex",
                      width: "25px",
                      objectFit: "contain",
                      marginLeft: "10px",
                    }}
                    height={10}
                    onClick={() => {
                      navigator.clipboard.writeText(walletAddre);
                      setCopy(true);
                      setModelMessage("Copied to clipboard");
                      setOpenModel(true);
                      setTimeout(() => {
                        setRandomVal(Math.floor(Math.random() * 100 + 1));
                      }, 500);
                      // toast.success("Copied to clipboard")
                      setTimeout(() => {
                        setCopy(false);
                      }, [2500]);
                    }}
                    src="/assets/images/Dashboardimg/copy.png"
                    alt=""
                  />
                </div>
                <Col
                  lg={12}
                  style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ background: "white", padding: "16px" }}>
                    <QRCode value={walletAddre} />
                  </div>
                </Col>
                <Row style={{ marginTop: "20px" }}>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <a
                      target="_blank"
                      href={`${explorer}/address/${walletAddre}`}
                      className="view_ex">
                      View On Explorer
                    </a>
                    {/* <Button className="view_pk">Export Private Key</Button> */}
                  </Col>
                </Row>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal
            show={showModal2}
            // onHide={handleModalClose1}
            backdrop="static"
            keyboard={false}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          // style={{ display: "flex", alignItems: "center" }}
          >
            <Modal.Header
              style={{ background: "black", color: "white", border: "none" }}>
              {/* <Modal.Title>Create Account</Modal.Title> */}
              <h1>Create Account</h1>
            </Modal.Header>
            <Modal.Body style={{ background: "black" }}>
              <InputGroup className="mb-3">
                <FormControl
                  className="create_acc"
                  type="text"
                  placeholder="Account Name"
                  name="account_name"
                  onChange={formdata}
                  value={createaccount.account_name}
                />
              </InputGroup>
              <h4 style={{ color: "red", textAlign: "center" }}>{formError}</h4>
              <Button
                className="create_name"
                onClick={() => {
                  create_wallet();
                }}
                disabled={disabled}>
                CREATE
              </Button>
              <Button
                onClick={() => {
                  setShowmodal2(false);
                }}
                disabled={disabled}
                className="cancel_create">
                CANCEL
              </Button>
            </Modal.Body>
          </Modal>

          <Modal
            show={showModal3}
            id="sign_up"
            // onHide={handleModalClose1}
            backdrop="static"
            keyboard={false}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          // style={{ display: "flex", alignItems: "center" }}
          >
            <Modal.Header
              style={{ background: "black", color: "white", border: "none" }}>
              {/* <Modal.Title>Create Account</Modal.Title> */}
              <h1>Import Account</h1>
            </Modal.Header>
            <Modal.Body style={{ background: "black" }}>
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
                  placeholder="Enter your private key string here"
                  name="privatekey"
                  onChange={formdata}
                  value={inputPrivateKey.privatekey}
                />
              </InputGroup>
              <h4 style={{ color: "red", textAlign: "center" }}>{formError}</h4>
              <Button
                className="create_name sub_btn"
                onClick={() => {
                  importaccount();
                }}
                disabled={disabled}>
                IMPORT
              </Button>
              <Button
                onClick={() => {
                  setShowmodal3(false);
                }}
                disabled={disabled}
                className="cancel_create w-100 justify-content-center">
                CANCEL
              </Button>
            </Modal.Body>
          </Modal>

          <Modal
            show={showModal4}
            // onHide={handleModalClose1}
            backdrop="static"
            keyboard={false}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header
              style={{
                background: "black",
                color: "white",
                borderColor: "#c39a48",
              }}>
              <Modal.Title>QCoin</Modal.Title>
              <h1
                className="cross_img"
                onClick={() => {
                  setShowmodal4(false);
                }}
                style={{ margin: "0 0 0 auto", color: "#c39a48" }}>
                X
              </h1>
            </Modal.Header>
            <Modal.Body style={{ background: "black" }}>
              <Row
                style={{ padding: "20px 0", borderBottom: "1px solid gray" }}>
                <Col lg={2}>
                  <img
                    width={50}
                    src="/assets/images/Dashboardimg/meta_mask.png"
                    alt=""
                  />
                </Col>
                <Col lg={4}>
                  <h4
                    style={{
                      color: "#000",
                      paddingTop: "10px",
                      fontSize: "18px",
                    }}>
                    Buy -ONMETA
                  </h4>
                </Col>
                <Col lg={6}>
                  <button
                    className="create_buy common-btn m-0"
                    onClick={() => handleLinkClick('onmeta')}>
                    Continue
                  </button>
                </Col>
              </Row>

              <Row
                style={{ padding: "20px 0", borderBottom: "1px solid gray" }}>
                <Col lg={2}>
                  <img
                    width={50}
                    src="https://onramp.money/_app/immutable/assets/logo.06188b0f.svg"
                    alt=""
                  />
                </Col>
                <Col lg={4}>
                  <h4
                    style={{
                      color: "#000",
                      paddingTop: "10px",
                      fontSize: "18px",
                    }}>
                    Buy OnRamp
                  </h4>
                </Col>
                <Col lg={6}>
                  <button
                    className="create_buy common-btn m-0"
                    onClick={() => handleLinkClick('onramp')}>
                    Continue
                  </button>
                </Col>
              </Row>

              <Row
                style={{ pMetaMaskadding: "20px 0", borderBottom: "1px solid gray" }}>
                <Col lg={2}>
                  <img
                    width={50}
                    src="/assets/images/Dashboardimg/meta_mask.png"
                    alt=""
                  />
                </Col>
                <Col lg={4}>
                  <h4
                    style={{
                      color: "#000",
                      paddingTop: "10px",
                      fontSize: "18px",
                    }}>
                    Sell-OnRamp
                  </h4>
                </Col>
                <Col lg={6}>
                  <button
                    className="create_buy common-btn m-0"
                    onClick={() => {
                      // navigate("/buyfrom_metamask");
                    }}>
                    Coming soon
                  </button>
                </Col>
              </Row>
              <Row
                style={{ padding: "20px 0", borderBottom: "1px solid gray" }}>
                <Col lg={2}>
                  <img
                    width={50}
                    src="/assets/images/Dashboardimg/meta_mask.png"
                    alt=""
                  />
                </Col>
                <Col lg={4}>
                  <h4
                    style={{
                      color: "#000",
                      paddingTop: "10px",
                      fontSize: "18px",
                    }}>
                    Buy-OnRamper
                  </h4>
                </Col>
                <Col lg={6}>
                  <button
                    className="create_buy common-btn m-0"
                    onClick={() => handleLinkClick('onramper')}>
                    Continue
                  </button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal
            show={showModal5}
            onHide={handleModalClose5}
            backdrop="static"
            keyboard={false}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div className="text-center dashboard-popup">
                <img src="assets/images/Homeimg/wallet-bg.png" />

                <div className="text-center">
                  <h4>Welcome to the YuseCoin Wallet</h4>
                  <p>
                    Tap into Most Reliable & Secure Trust Wallet- YuseWallet
                    Grow, Buy, Sell & Exchange Crypto's, Store, Collect NFT's,
                    Earn Rewards Trusted by Million of Users Join Now!
                  </p>
                  {/* <p>Sed egestas a orci blandit condimentum. Mauris egestas pharetra urna, ac commodo quam convallis vel.</p> */}
                </div>
                <div>
                  <button
                    onClick={handleModalClose5}
                    className="common-btn ml-0">
                    Open Dashboard
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </Container>
      </section>
    </>
  );
}
