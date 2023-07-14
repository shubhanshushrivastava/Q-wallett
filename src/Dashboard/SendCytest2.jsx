import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import Cybalance from "../helpers/FatchBalanceHelper";
import Tokenbalance from "../helpers/TokenBalanceHelper";
import useAuth from "../hooks/useAuth";



export default function SendCytest2() {
    const navigate = useNavigate()

    const { state } = useLocation("/sendCytest1");
    const { Address, chain, contract, name, net } = state;

    const [userAdd, setUserAdd] = useState("")

    const { user, walletAddress } = useAuth();

    const [balance, setBalance] = useState()
    const [gasPrice, setGasPrice] = useState(0)
    const [gasLimit, setGasLimit] = useState(0)
    const [maxGas, setMaxGas] = useState(0)
    const [Nonce, setNonce] = useState(0)

    const fetch_balance = async () => {
        let Cybal = await Cybalance(walletAddress, chain)
        // console.log(Cybal);
        setBalance(Cybal.Cy_test_balance)
        setGasPrice((Cybal.gasprice) / 1e9)
        setGasLimit(Cybal.gaslimit)
        setNonce(Cybal.nonce)
        let gas = (((Cybal.gasprice) / 1e9) * Cybal.gaslimit) / 1e9;
        setMaxGas(gas)
    }

    const Token_balance = async () => {
        let bal = await Tokenbalance(walletAddress, chain, contract)
        setBalance(bal.Token_balance)
        setGasPrice((bal.gasprice) / 1e9)
        setGasLimit(bal.gaslimit)
        setNonce(bal.nonce)
        let gas = (((bal.gasprice) / 1e9) * bal.gaslimit) / 1e9;
        setMaxGas(gas)
    }
    const [formError, setFormError] = useState("")
    const [test, setTest] = useState(0)
    const [inputdata, setInputdata] = useState({
        check: test || ""
    })

    const formdata = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputdata({ ...inputdata, [name]: value })
    }

    useEffect(() => {
        fetch_balance()
        Token_balance();
        setUserAdd(Address)
    }, [])

    const maxamt = () => {
        setTest(Number(balance))
        let maxAmt = Number(balance)
        setInputdata({ ...inputdata, check: maxAmt })

    }


    const HandleNext = () => {
        if (!inputdata.check) {
            setFormError("Enter some amount")
        }
        else if (inputdata.check > (balance - 0.00606)) {
            setFormError("Low Balance")
        }
        else {
            setFormError("")
            let walletAdd = Address
            let Amt = inputdata.check
            navigate("/sendCytest3", {
                state: {
                    Address1: walletAdd,
                    Amount: Amt,
                    chainid: chain,
                    name: name,
                    maxGas: maxGas,
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    Nonce: Nonce,
                    contract: contract,
                    net: net
                }
            })
        }
    }

    return (
        <>
            <HomeHeaderOther />
            <section className="section-outer-meta metamask-modal">
                <Container>
                    <Row className="mt-5" >
                        <Col className="m-auto" lg={5} >
                            <div className="border-box-meta mt-5">
                                <h3 className="mt-0 text-center">Send</h3>
                                <div className="wallet-address-box">
                                    <img src="/assets/images/Dashboardimg/check.png" alt="" />
                                    <span>{userAdd}</span>
                                    <img className="cross_img" onClick={() => {
                                        navigate("/dashboard_home")
                                    }} src="/assets/images/Dashboardimg/close (3).png" alt="" />
                                </div>
                                {/* <a className="address-click" href="">
                                    <div>
                                        New address detected! Click here to add to your address book.
                                    </div>
                                </a> */}
                                <div className="outer-asset-box">
                                    <span>Asset: </span>
                                    <Dropdown className="dropdown-meta-value">
                                        <Dropdown.Toggle >
                                            <div className="inner-asset-box">
                                                <img src="/assets/images/Dashboardimg/android-chrome-192x192 1.png" alt="" />
                                                <div>
                                                    <h4>{name}</h4>
                                                    <p>Balance: <span>{balance}</span></p>
                                                </div>
                                            </div>
                                        </Dropdown.Toggle>


                                    </Dropdown>

                                </div>
                                <div className="outer-asset-box">
                                    <span>Amount:
                                        {!balance ? <button disabled className="max-box" >MAX</button> : <button className="max-box" onClick={() => {
                                            maxamt()
                                        }}>MAX</button>} </span>
                                    <div className="inner-asset-box amount-swap">

                                        <div>
                                            <InputGroup >
                                                <FormControl type="number" className="value-box" placeholder="Enter Amount" name="check" value={test || inputdata.check} onChange={formdata} />
                                                <InputGroup.Text className="value-box-text">{name}</InputGroup.Text>
                                            </InputGroup>
                                            {/* <input type="text" /> */}
                                        </div>
                                        <div>
                                            <img src="/assets/images/Dashboardimg/swap (1).png" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="outer-asset-box">
                                    <span></span>
                                    <div className="inner-asset-box amount-swap price-outer">

                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Gas Price</Form.Label>
                                                    <Form.Control type="number" disabled placeholder="" value="286" />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Gas Limit</Form.Label>
                                                    <Form.Control type="number" disabled placeholder="" value="21000" />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                    </div>
                                </div>

                                <hr />
                                <h4 style={{ color: "red", textAlign: "center" }}>{formError}</h4>
                                <div className="btn-last-meta">
                                    <button onClick={() => {
                                        navigate("/dashboard_home")
                                    }} className="gradient-border-btn w-50">Cancel</button>
                                    <button onClick={() => {
                                        HandleNext()
                                    }} className="common-btn ml-0 w-50">Next</button>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}