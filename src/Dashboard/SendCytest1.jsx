import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosMain from "../api";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import CheckWallet from "../helpers/CheckWalletHelper";
import useAuth from "../hooks/useAuth";



export default function SendCytest1() {

    const { user, walletAddress, isAuthenticated } = useAuth();

    const { state } = useLocation("/dashboard_tokens");
    const { chain, contract, name , net} = state;

    let userId = user._id


    const navigate = useNavigate()
    const [accountData ,setAccountData] = useState("")
    const [walletList, setWalletList] = useState(null)
    const [inputdata, setInputdata] = useState({
        check: accountData || ""
    })

    const formdata = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputdata({ ...inputdata, [name]: value })
    }

    const Account_call = async () => {
        try {
            const payload = {
                user_id: userId,
            }
            const wallet_res = await axiosMain.post("/wallet-list", payload)
            // console.log(wallet_res);
            if (wallet_res) {
                setWalletList(wallet_res.data.data)
            }
        }
        catch (error) {
            console.log(error.response.data.message);
        }
    }
    useEffect(() => {
        Account_call()
    }, [])

    const myfunction = async () => {
        let check1 = await CheckWallet(inputdata.check)
        let walletAdd = inputdata.check
        if (check1) {
            navigate("/sendCytest2", { state: { Address: walletAdd , chain: chain , contract: contract, name:name , net : net} })
        }
    }

    const emptyInput = () => {
        setInputdata({
            check: ""
        })
    }
    const show_function = () => {
        if(walletList){
            if(walletList.length > 1){
                document.getElementById("showbtn").style.display = "none"
            document.getElementById("hidebtn").style.display = "block"
            document.getElementById("showacc").style.display = "block"
        }
    }
    }
    const hide_function = () => {
        document.getElementById("showbtn").style.display = "block"
        document.getElementById("hidebtn").style.display = "none"
        document.getElementById("showacc").style.display = "none"
    }

    const call_account = async (items) =>{
        myfunction()
        console.log(items.wallet_address);
        const test = items.wallet_address
        setAccountData(test)
        setInputdata({
            check: test
        })
        let check1 = await CheckWallet(test)
        let walletAdd = test
        if (check1) {
            navigate("/sendCytest2", { state: { Address: walletAdd , chain: chain , contract: contract, name:name ,net : net} })
        }

        // setInputdata({...inputdata.check , ...test})
    }
    return (
        <>
            <HomeHeaderOther />
            <section className="section-outer-meta metamask-modal">
                <Container>
                    <Row >
                        <Col className="m-auto" lg={5} >
                            <div className="text-center border-box-meta" style={{ marginTop: "90px" }}>
                                <h3 className="mt-0">Send to <Link to="/dashboard_home" className="cancel-btn-meta">Cancel</Link></h3>
                                <div>
                                    <InputGroup className="search-box-new">
                                        <InputGroup.Text><i className="fa fa-search"></i></InputGroup.Text>
                                        <FormControl onKeyUp={() => {
                                            myfunction()
                                        }} placeholder="Search public address(0x)" name="check" value={inputdata.check} onChange={formdata} />
                                        <InputGroup.Text><img width={15} className="cross_img" onClick={() => {
                                            emptyInput()
                                        }} src="/assets/images/Dashboardimg/close (2).png" /></InputGroup.Text>
                                    </InputGroup>
                                </div>
                                <h2 className="text-left" id="showbtn"><a style={{textDecoration:"none" , color:"white"}} className="cross_img" onClick={() => {
                                    show_function()
                                }} >Transfer between my accounts</a></h2>
                                <h2 className="text-left" id="hidebtn"><a style={{textDecoration:"none" , color:"white"}} className="cross_img" onClick={() => {
                                    hide_function()
                                }} >Back To All</a></h2>

                                <hr />
                                <div id="showacc" className="cross_img">
                                {walletList && walletList.map((items, index) => {

                                    return (

                                        <>
                                      <div className="mainacc" onClick={()=>{
                                        call_account(items)
                                      }}>
                                            <h4 className="text-left">{!items.wallet_name ? "Main Account" : items.wallet_name}</h4>
                                            <h4 className="text-left">
                                                {items.wallet_address.replace(
                                                    items.wallet_address.substring(4, 35),
                                                    "...."
                                                )}
                                            </h4>
                                            <hr />
                                            </div>
                                          
                                        </>

                                    )
                                })}
                                  </div>
                                {/* <h6 className="text-left">Recents</h6>
                        <div className="resent-transaction-list">
                        <ul>
                            <li>
                                <div>
                                    <img src="/assets/images/Dashboardimg/Ethereum (ETH).png" alt="" />
                                    <p>0xdC4592C…eaE3</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="/assets/images/Dashboardimg/Ethereum (ETH).png" alt="" />
                                    <p>0xdC4592C…eaE3</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="/assets/images/Dashboardimg/Ethereum (ETH).png" alt="" />
                                    <p>0xdC4592C…eaE3</p>
                                </div>
                            </li>
                        </ul>
                        <div className="text-left"> 
                            <a href="" className="load-more-text">Load More</a>
                        </div>
                        </div> */}

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}