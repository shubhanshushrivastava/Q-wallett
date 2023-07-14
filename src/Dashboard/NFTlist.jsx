import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosMain from "../api";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import OtherTokenTransaction from "../helpers/FatchTokenTransactionhelper";
import { NFTDetailByWallet } from "../helpers/FatchNFTHelper";
import CheckWallet from "../helpers/CheckWalletHelper";
import { useSelector } from "react-redux";
import { Notification } from "../components/Notification";

export const NFTlist = () => {

    const navigate = useNavigate()

    const {
        value: { user, isAuthenticated },
        walletAddress,
        walletCreated,
    } = useSelector((state) => state.auth);

    const { state } = useLocation("/dashboard_home");
    const { chainid } = state;
    const { Tokenaddress } = state;
    const { TokenName } = state;
    const { wallet } = state;
    const { explorer } = state;

    const [CollectionNFTList, setCollectionNFTs] = useState("")


    const Fetch_NFTs = async (contract) => {
        let NFT = await NFTDetailByWallet(chainid, wallet, Tokenaddress);
        setCollectionNFTs(NFT)
    }

    useEffect(() => {
        Fetch_NFTs()
    }, [Tokenaddress, wallet])

    const [showModal, setShowModal] = useState(false);
    const [recieverWallet, setRecieverWallet] = useState("");
    const [tokenid, settokenid] = useState("");
    const [disabled, setDisabled] = useState(false)
    const [modelMessage, setModelMessage] = useState("")
    const [openModel, setOpenModel] = useState(false)
    const [randomVal, setRandomVal] = useState("")

    const handleModalClose = () => {
        setShowModal(false);
      };

    const handlerecieverWallet = (e) => {
        let value = e.target.value;
        setRecieverWallet(value);
    };

    const transferHandler = async () => {
        try {

            console.log("recieverWallet", recieverWallet);
            let check1 = await CheckWallet(recieverWallet)
            if(check1){
                console.log("proceed", tokenid, Tokenaddress);
                setDisabled(true)
    
                let tokenPayload = {
                    user_id: user._id,
                    contractAddress: Tokenaddress,
                    chainId: chainid,
                    tokenType: "NFT",
                    tokenid : tokenid,
                    recieverWallet : recieverWallet,
                    sender_wallet_address : wallet,
                }

                await axiosMain.post("/transfer-NFT", tokenPayload)
                .then((token_res) => {
                    console.log(token_res);
                    if (token_res) {
                        setModelMessage("NFT transfered successfully")
                        setOpenModel(true)
                        setTimeout(() => {
                            setRandomVal(Math.floor((Math.random() * 100) + 1))
                        }, 500);
                        // toast.success("Token imported successfully")
                        setTimeout(() => {
                            navigate("/dashboard_home")
                        }, 2000);
                        // setTransactionHistory(Transactions_res.data.data)
                    }
                })
            }else{
                setDisabled(false)
             
                setModelMessage("Please enter valid wallet address")
                setOpenModel(true)
                setTimeout(() => {
                    setRandomVal(Math.floor((Math.random() * 100) + 1))
                }, 500);
            }
            // save token api code goes here
        } catch (error) {
            // console.log(error);
            setDisabled(false)
            console.log(error.response.data.message);
            setModelMessage(error.response.data.message)
            setOpenModel(true)
            setTimeout(() => {
                setRandomVal(Math.floor((Math.random() * 100) + 1))
            }, 500);
            setTimeout(() => {
                setShowModal(false);
            }, 500);
        

            // toast.error(error.response.data.message)
        }

    };

    const submitHandler = () => {
        setShowModal(true);
    };  

    return (
        <>
            <HomeHeaderOther />
            <section id="dash_home">
            <Notification message_mo={modelMessage} action_mo={openModel} random_val={randomVal} />

                <ToastContainer />
                <Container>
                    <Row className="dash_row1">
                        <Col lg={10} className="d-flex align-items-center">
                            <div className="dash_box w-100">
                                <Row>
                                    <Col lg={12}>
                                        <Link to="/dashboard_home" className="common-btn" style={{ padding: "3px 10px" }}><i class="fa fa-arrow-left"></i></Link>
                                    </Col>
                                </Row>

                                <Row className="body2">
                                    <Col lg={12}>
                                        <h1>
                                            {TokenName}
                                        </h1>
                                        
                                            <a style={{ textDecoration: 'none' }} href={`${explorer}/address/${Tokenaddress}`} target="_blank" rel="noopener noreferrer">
                                            <p className="text-center">{Tokenaddress}</p></a>
                                            
                                    </Col>
                                </Row>

                                <hr />
                                <Row className="body4 mt-5">
                                    <Col lg={12}>
                                        <h2>NFT List</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    {CollectionNFTList.length > 0 ? (
                                        CollectionNFTList && CollectionNFTList.map((items, index) => {
                                            return (
                                                <>
                                                    <Col md={4} key={index}>
                                                        <div className="nft-item1">

                                                            <div className="nft-item-image">
                                                                <div className="portrait">
                                                                    {items?.metadata ?
                                                                        <img
                                                                            className=" nft__item_preview portrait"
                                                                            alt="NFT Img"
                                                                            src={`https://gateway.ipfs.io/ipfs/${((JSON.parse(items?.metadata)?.image).slice(-46))}`}
                                                                        />
                                                                        :
                                                                        <img
                                                                            className=" nft__item_preview portrait"
                                                                            alt="NFT Img"
                                                                            src="/assets/images/login_pageimg/Sign Up-01 1.png"
                                                                        />
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                                                <div className="nft-item-inner">
                                                                    <div>
                                                                        <h4>Name : {items?.metadata 
                                                                            ?  
                                                                            JSON.parse(items?.metadata)?.Name 
                                                                            ? 
                                                                            (JSON.parse(items?.metadata)?.Name) 
                                                                            : 
                                                                            items?.name
                                                                            : 
                                                                            items?.name
                                                                        }</h4>
                                                                    </div>
                                                                    <div className="nft-item-price">
                                                                        <span title="Quantity 1">TokenId : {items?.token_id}</span>
                                                                    </div>

                                                                    {/* <div className="nft-item-price" >
                                                                        (A$376.84)
                                                                    </div> */}
                                                                </div>
                                                                <div>
                                                                    <button onClick={() => {
                                                                        settokenid(items?.token_id)
                                                                            submitHandler();
                                                                    
                                                                        }} className="common-btn">Transfer NFT</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </>
                                            )
                                        })) : (
                                        <h1 style={{ textAlign: "center", color: "white", marginTop: "70px" }}>No Assets found</h1>
                                    )}
                                </Row>

                            </div>

                        </Col>
                    </Row>
                    <Modal
              size="sm"
              show={showModal}
              onHide={handleModalClose}
              backdrop="static"
              keyboard={false}
              animation={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton={handleModalClose}>
                <Modal.Title>
                  <h1>Enter Wallet Address</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="input-modal-data">
                  <div className="form-group ">
                    <p>Please Enter wallet address here where you wish to transfer NFT's</p>
                    <input
                        
                          onChange={(e) => handlerecieverWallet(e)}
                          type="text"
                          name=""
                          value={recieverWallet}
                          className="form-control trasnfer-input"
                          placeholder="Wallet Address"
                          // defaultValue
                        />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
              <Button
                onClick={transferHandler}
                className="btn common-btn popup-btn"
                disabled={disabled}
                type="submit"
                style={{ color: "black" }}
              >
                {disabled == true ? "Processing" : 'Confirm'}
              </Button>
              {/* <Button className="button-footer1" variant="primary" type="submit" >
              Submit
          </Button> */}
            </Modal.Footer>
            </Modal>

                </Container>
            </section>
        </>
    )
}
