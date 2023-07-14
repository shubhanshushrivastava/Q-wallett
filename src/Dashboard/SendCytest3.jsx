import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axiosMain from "../api";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { Notification } from "../components/Notification";



export default function SendCytest3() {

    const { state } = useLocation("/dashboardsend2");
    const { Address1, Amount, chainid, name, maxGas, gasPrice, gasLimit, Nonce, contract ,net } = state;

    
    const [openModel , setOpenModel] = useState(false)
    const [modelMessage , setModelMessage] = useState("")
    const [randomVal , setRandomVal] = useState("")

    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(false);
    const { user, walletAddress } = useAuth();
    let userId = user._id
    // console.log(userId);
    // console.log(user);
    // console.log(walletAddress);
    const confirm_payment = async () =>{
        setDisabled(true)
        setModelMessage("Please Wait...")
        setOpenModel(true)
        setTimeout(() => {
            setRandomVal(Math.floor((Math.random()*100)+1))
          }, 500);
        // const id = toast.loading(
        //     "Please Wait..."
        //   );
        const payload = {
            Amount : Amount,
            user_id : userId,
            reciver_wallet_address : Address1,
            sender_wallet_address : walletAddress,
            rawTransaction : {
                "from": walletAddress,
                "gasPrice": gasPrice * 1e9,
                "gasLimit": gasLimit,
                "chainId": Number(chainid),
                "nonce": Nonce,
                "to": contract,
                "data": ""
            }
        }
        try{
        await axiosMain.post("/send-cytest",payload)
        .then((response)=>{
            console.log(response);
            if(response){
                setModelMessage("Transaction success")
                setOpenModel(true)
                setTimeout(() => {
                    setRandomVal(Math.floor((Math.random()*100)+1))
                  }, 500);
                // toast.update(id, {
                //     render: "Transaction success",
                //     type: "success",
                //     isLoading: false,
                //   });
                  setTimeout(() => {
                      navigate("/dashboard_home")
                  }, 5000);
            }
        })
    } catch(error){
        setModelMessage("Transaction declined")
        setOpenModel(true)
        setTimeout(() => {
            setRandomVal(Math.floor((Math.random()*100)+1))
          }, 500);
        // toast.update(id, {
        //     render: "Transaction declined",
        //     type: "warn",
        //     isLoading: false,
        //   });
    }
    }


    return (
        <>
         <HomeHeaderOther />
            <section className="section-outer-meta metamask-modal">
            <Notification message_mo={modelMessage} action_mo={openModel} random_val={randomVal}/>
                <ToastContainer/>
                <Container>
                    <Row >
                        <Col className="m-auto" lg={5} >
                            <div className="text-center border-box-meta">
                                <h3 className="mt-0"><a href="" className="cancel-btn-meta edit-meta"> Edit</a></h3>
                                <div className="wallet-row-transaction-1">
                                    <div className="left-1">
                                        <img src="/assets/images/Dashboardimg/android-chrome-192x192 1.png" alt="" />
                                        <p>
                                            {walletAddress.replace(
                                                walletAddress.substring(3, 32),
                                                "...."
                                            )}
                                        </p>
                                    </div>
                                    <img className="img-center" src="/assets/images/Dashboardimg/arrow-right (2).png" alt="" />
                                    <div className="left-2">
                                        <img src="/assets/images/Dashboardimg/android-chrome-192x192 1.png" alt="" />
                                        <p> {Address1.replace(
                                            Address1.substring(3, 32),
                                            "...."
                                        )}</p>
                                    </div>
                                </div>
                                {/* <a className="address-click" href="">
                                    <div>
                                        New address detected! Click here to add to your address book.
                                    </div>
                                </a> */}
                                <h4 className="text-left"><a href="">{Amount} {name}</a></h4>
                                <hr />
                                <div className="estimated-fees-box text-left">
                                    <span>Estimated gas fee</span>
                                    <div className="text-right">
                                        {/* <a className="edit-trns" href="">EDIT</a> */}
                                        <p>{maxGas} {net} </p>
                                        {/* <p><b>{Amount} QCOIN</b></p> */}
                                        {/* <p>Max Fee: 0.003403 QCOIN </p> */}
                                    </div>
                                </div>
                                <hr />
                                <div className="estimated-fees-box text-left">
                                    <span><b>Total</b></span>
                                    <div className="text-right">

                                        {/* <p>0.003403 </p> */}
                                        <p><b>{Number(Amount)} {name} + {Number(maxGas).toFixed(6)} {net}</b></p>

                                    </div>
                                </div>
                                <div className="estimated-fees-box text-left">
                                    <span>Amount + gas fee</span>
                                    <div className="text-right">

                                        <p>Max Amount: {Number(Amount)} {name} + {Number(maxGas).toFixed(6)} {net} </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="btn-last-meta">
                                    <button disabled={disabled} onClick={() => {
                                        navigate("/dashboard_home")
                                    }} className="gradient-border-btn w-50">Reject</button>
                                    <button onClick={()=>{
                                        confirm_payment()
                                    }} disabled={disabled} className="common-btn ml-0 w-50">Confirm</button>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}