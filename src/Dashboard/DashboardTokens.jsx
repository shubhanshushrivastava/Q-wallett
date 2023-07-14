import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosMain from "../api";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import OtherTokenTransaction from "../helpers/FatchTokenTransactionhelper";
import axios from "axios";


export default function DashboardTokens() {

    const navigate = useNavigate()

    const { state } = useLocation("/dashboard_home");
    // const { val, chain, contract, name, imglogo, net } = state;
    const { val, chain, name, imglogo, net } = state;
    const [cyTestVal, setCyTestVal] = useState("")
    const [imgLogo, setImgLogo] = useState("");
    const [transactionOtherHistory, setOtherTransactionHistory] = useState(null)
    const [explorer, setExplorer] = useState(null)

    // const { user, walletAddress, isAuthenticated, walletMainAdd } = useAuth();
    const { user } = useAuth();
    let walletAddress = "0x51EFE4987D9D22032aba856A8E6472913cf1Fa04"
    // let userId = user._id
    let contract = "0x56197f7446223ba2d336f256c713b7ecf1b92517"
    let userId = "63189baa93aed474bf764a03"


    const [transactionHistory, setTransactionHistory] = useState(null)

    useEffect(() => {
        setCyTestVal(val)
        if (name == "CyTest") {
            getTransactions()
        }
        if (net !== "QCOIN") {
            getOtherTransactions()
        }
    }, [])

    const getTransactions = async () => {
        try {
            const Transactions_payload = {
                user_id: userId,
                currency: "CYTEST",
                wallet_Address: walletAddress
            }
            await axios.post("https://q3.donative.in:3000/transaction-history", Transactions_payload)
                .then((Transactions_res) => {
                    console.log(Transactions_res);
                    if (Transactions_res) {
                        setTransactionHistory(Transactions_res.data.data)
                    }
                })
        }
        catch (error) {
            console.log(error);
        }
    }

    const getOtherTransactions = async () => {
        let obj = await OtherTokenTransaction(walletAddress, chain, contract)
        let otherTrx = obj.mainTransaction
        let explore = obj.explorer
        let imgLogo = obj.imgLogo
        setOtherTransactionHistory(otherTrx);
        setExplorer(explore);
        setImgLogo(imgLogo);
    }

    const sendCytest = async () => {
        navigate("/sendCytest1", { state: { chain: chain, contract: contract, name: name, net: net } })
    }



    return (
        <>
            <HomeHeaderOther />
            <section id="dash_home">
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
                                        <img width={60} style={{ display: "flex", margin: "0 auto" }} src={imglogo} alt="" />
                                        {/* {network == "QCOIN" ? <img width={80} style={{ display: "flex", margin: "0 auto" }} src="assets/images/Dashboardimg/moneda_transparent.gif" alt="" />
                                        : <img width={40} style={{ display: "flex", margin: "0 auto" }} src={imgLogo} alt="" />} */}
                                        <h1>

                                            {(cyTestVal * 1).toFixed(4)} {name}
                                        </h1>
                                        {/* {network == "QCOIN" ? <p>{((balance) * 6.66).toFixed(4)} USD</p> : network !== "MATIC" ? <p>{Rate} QCOIN</p> : <p></p>} */}
                                    </Col>
                                </Row>
                                <Row className="body3 text-center">
                                    <Col lg={12}>
                                        <Button onClick={() => {
                                            sendCytest()
                                            // HandelSendOther()
                                        }} className="receive_btn">SEND</Button>
                                        {/* <Button onClick={() => {
                                            // setShowmodal1(true)
                                        }} className="send_btn" >RECEIVE</Button> */}

                                    </Col>
                                </Row>
                                <hr />
                                <Row className="body4 mt-5">
                                    <Col lg={12}>
                                        <h2>Transactions History</h2>
                                    </Col>
                                </Row>
                               {net === "QCOIN" ?<div>
                                {transactionHistory && transactionHistory.map((items, index) => {
                                        return (
                                            <Row className="body5">
                                                <Col lg={4} md={6} sm={6} xs={6}>
                                                    <p> {moment(items.createdAt).format("lll")}</p>
                                                    <div className="tran_htoy">
                                                        <div>
                                                            <img src="/assets/images/Dashboardimg/android-chrome-192x192 1.png" alt="" />
                                                        </div>
                                                        <div className="tran_htoy1">
                                                            <h4>{items.currency}</h4>
                                                            {/* https://cyexplorer.com/tx/0x3f680e1cdd94bcf363678f78c02cb92a06680ce89bcd8f4db401933978972e46 */}
                                                            {!items.hash ? <a>null</a> : <a target="_blank" href={`https://cyexplorer.com/tx/${items.hash}`}>
                                                                {items.hash.replace(
                                                                    items.hash.substring(15, 50),
                                                                    "...."
                                                                )}
                                                            </a>}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={4} md={6} sm={6} xs={6} className="amt_side">
                                                    {items.status == "Success" ? <Button className="pend_btn1">{items.status}</Button> : <Button className="pend_btn">{items.status}</Button>}
                                                    <h3 className="coin1">{(items.cy_amount * 1).toFixed(4)} {name}  <span className="send-coin">{items.transaction_type}</span>
                                                    </h3>
                                                </Col>
                                            </Row>
                                        );
                                    })
                                }
                                </div>:
                                <div>
                                     {transactionOtherHistory && transactionOtherHistory.length > 0 ? (
                                                transactionOtherHistory && transactionOtherHistory.map((items, index) => {
                                                    return (
                                                        <Row className="body5">
                                                            <Col lg={4} md={6} sm={6} xs={6}>
                                                                <p>{new Date(items.timeStamp * 1000).toDateString()}</p>
                                                                <div className="tran_htoy">
                                                                    <div>
                                                                        <img width={40} src={imgLogo} alt="" />
                                                                    </div>
                                                                    <div className="tran_htoy1">
                                                                        <h4>{name}</h4>
                                                                        {!items.hash ? <a>null</a> : <a target="_blank" href={`${explorer}${items.hash}`}>
                                                                            {items.hash.replace(
                                                                                items.hash.substring(15, 50),
                                                                                "...."
                                                                            )}
                                                                        </a>}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col lg={4} md={6} sm={6} xs={6} className="amt_side">
                                                                <Button className="pend_btn1">Success</Button>
                                                                <h3 className="coin1">{(items.value / 1e18).toFixed(4)} {name}
                                                                    {items.from == `${(walletAddress).toLowerCase()}` ? <span className="send-coin">Send</span> : <span className="send-coin">Receive</span>}
                                                                </h3>
                                                                {/* {items.cy_amount < 0 ? <p className="amount1">{(items.cy_amount * 6.66).toFixed(4)} USD</p> : <p className="amount2">{(items.cy_amount * 6.66).toFixed(4)} USD</p>} */}
                                                            </Col>
                                                        </Row>
                                                    );
                                                })
                                            )
                                                : (
                                                    <h1 style={{ textAlign: "center", color: "#000", marginTop: "70px" }}>No transaction found</h1>
                                                )
                                            }
                                </div>
                                }

                            </div>

                        </Col>
                    </Row>


                </Container>
            </section>
        </>
    )
}