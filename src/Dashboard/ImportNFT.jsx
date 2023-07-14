import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axiosMain from "../api";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import { useSelector } from "react-redux";
import { CheckNFTContract, CheckContract } from "../helpers/contractDetail";
import { toast, ToastContainer } from "react-toastify";
import { Notification } from "../components/Notification";


export default function ImportNFT() {
    const navigate = useNavigate()

    const {
        value: { user, isAuthenticated },
        walletAddress,
        walletCreated,
    } = useSelector((state) => state.auth);

    const auth = useSelector((state) => state.auth.isChangeNetwork);
    const [openModel, setOpenModel] = useState(false)
    const [modelMessage, setModelMessage] = useState("")
    const [randomVal, setRandomVal] = useState("")

    const [inputdata, setInputdata] = useState("")
    const { state } = useLocation("/dashboard_home");
    const { inputnetwork } = state;

    console.log("inputnetwork", inputnetwork);

    const formdata = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputdata({ ...inputdata, [name]: value })
    }

    const [Symbol, setSymbol] = useState("")
    // const [Decimal, setDecimal] = useState("")
    const [disabled, setDisabled] = useState(true)

    const myfunction = async () => {
        let Detail = await CheckContract(inputdata.check, inputnetwork)
        console.log("Detail", Detail);
        if (Detail) {
            setModelMessage('Please add only NFT Token')
            setOpenModel(true)
            setTimeout(() => {
                setRandomVal(Math.floor((Math.random() * 100) + 1))
            }, 500);
            // toast.error('Please add only NFT Token')
        } else {
            Detail = await CheckNFTContract(inputdata.check, inputnetwork)
            console.log("Detail", Detail);
            setSymbol(Detail.Symbol)
            // setDecimal(Detail.Decimal)
            setDisabled(false)
        }


    }

    const importToken = async () => {
        try {

            setDisabled(true)
            // save token api code goes here
            let tokenPayload = {
                user_id: user._id,
                contractAddress: inputdata.check,
                chainId: inputnetwork,
                tokenType: "NFT",
                img_url: inputdata.url,
                symbol: Symbol,
                decimal: ""
            }
            await axiosMain.post("/save-token", tokenPayload)
                .then((token_res) => {
                    console.log(token_res);
                    if (token_res) {
                        setModelMessage("Token imported successfully")
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
        } catch (error) {
            // console.log(error);
            console.log(error.response.data.message);
            setModelMessage(error.response.data.message)
            setOpenModel(true)
            setTimeout(() => {
                setRandomVal(Math.floor((Math.random() * 100) + 1))
            }, 500);
            // toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <HomeHeaderOther />
            <section className="section-outer-meta import-wallet-uter-sec">
                <Notification message_mo={modelMessage} action_mo={openModel} random_val={randomVal} />
                <ToastContainer />
                <Container>
                    <Row>
                        <Col lg={5} className="m-auto">
                            <div className="dash_box import-token-box">
                                <div className="upper-header">
                                    <span onClick={() => [
                                        navigate("/dashboard_home")
                                    ]} className="close-icon cross_img"><i className="fa fa-close"></i></span>
                                    <h3>Import Token</h3>
                                    <p>Custom Token</p>
                                </div>
                                <div className="body-import-token">
                                    <div className="info-box">
                                        <i className="fa fa-info-circle"></i>
                                        Anyone can create a token, including creating fake versions of existing tokens. Learn more about
                                        <a href="">scams and security risks</a>.
                                    </div>

                                    <div className="form-import">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Token Contract Address</Form.Label>
                                            <Form.Control onKeyUp={() => {
                                                myfunction()
                                            }} type="text" placeholder="Enter Contract Address" name="check" value={inputdata.check} onChange={formdata} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Token Symbol</Form.Label>
                                            <Form.Control value={Symbol} type="text" placeholder="Symbol" />
                                        </Form.Group>
                                        {/* <Form.Group className="mb-3">
                                            <Form.Label>Token Decimal</Form.Label>
                                            <Form.Control value={Decimal} type="text" placeholder="Decimal" />
                                        </Form.Group> */}
                                        {/* <Form.Group className="mb-3">
                                            <Form.Label>Token URL (optional)</Form.Label>
                                            <Form.Control type="text" placeholder="Token URL" name="url" value={inputdata.url} onChange={formdata} />
                                        </Form.Group> */}
                                        <button disabled={disabled} onClick={() => {
                                            importToken()
                                        }} className="common-btn w-100 m-0">Add Custom Token</button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}