import React, { useState, useEffect } from "react";
import { Container, Row, Col  } from "react-bootstrap";
import axiosMain from "../../api";
import { toast, ToastContainer } from "react-toastify";
import { Notification } from "../Notification";

export default function HomeFooter(){

    
    const [openModel , setOpenModel] = useState(false)
    const [modelMessage , setModelMessage] = useState("")
    const [randomVal , setRandomVal] = useState("")

    const [newsLetter, setNewsLetter] = useState("");
    const emailHandler = async (req, res) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newsLetter)) {
            setModelMessage("Enter Valid Email")
            setOpenModel(true)
            setTimeout(() => {
                setRandomVal(Math.floor((Math.random()*100)+1))
              }, 500);
        //   toast.error("Enter Valid Email");
          return;
        } else {
          try {
            const response = await axiosMain.post("/newsletter", {
              email: newsLetter,
            });
            if (response.data.status) {
                setModelMessage("You Have Subscribed Successfully")
                setOpenModel(true)
                setTimeout(() => {
                    setRandomVal(Math.floor((Math.random()*100)+1))
                  }, 500);
            //   toast.success("You Have Subscribed Successfully", {
            //     position: "top-center",
            //   });
            } else {
                setModelMessage("Invalid Details")
                setOpenModel(true)
                setTimeout(() => {
                    setRandomVal(Math.floor((Math.random()*100)+1))
                  }, 500);
            //   toast.error("Invalid Details", {
            //     position: "top-center",
            //   });
            }
          } catch (error) {
            setModelMessage(error.response.data.message)
            setOpenModel(true)
            setTimeout(() => {
                setRandomVal(Math.floor((Math.random()*100)+1))
              }, 500);
            // toast.error(error.response.data.message);
          }
          setNewsLetter("");
        }
      };
    return(
        <>
        <section id="footer" className="footer-new-cy">
        <Notification message_mo={modelMessage} action_mo={openModel} random_val={randomVal}/>
            <ToastContainer/>
            <Container>
              <Row>
                <Col md={3} sm={6} xs={12}>
                    <div className="logo-foot">
                        <img width={"150px"} src="/assets/images/Homeimg/logo.png" alt="" />
                        <p>The most popular way in the world to learn, sell, buy, trade cryptocurrencies. We can make you a professional tradder.</p>
                       

                    </div>
                </Col>
                <Col md={2} sm={6} xs={12}>
                    <h5>Quick Links</h5>
                    <ul>
                    <li>
                            <a href="dashboard_home">Yuse Wallet</a>
                        </li>
                        <li>
                            <a target="_blank" href="">Yuse NFT</a>
                        </li>
                        <li>
                            <a target="_blank" href="">Yuse CrossChain Swap</a>
                        </li>
                    </ul>
                </Col>
                <Col md={2} sm={6} xs={12}>
                    <h5>Ecosystem</h5>
                    <ul>
                        <li>
                            <a target="_blank"  href="">Global Projects</a>
                        </li>
                        <li>
                            <a target="_blank" href="">Yuse NFT</a>
                        </li>
                        <li>
                            <a target="_blank" href="">Yuse Token</a>
                        </li>
                        <li>
                            <a target="_blank" href="">Yuse Marketplace</a>
                        </li>
                    </ul>
                </Col>

                <Col md={2} sm={6} xs={12}>
                    <h5>Resources</h5>
                    <ul>
                        <li>
                            <a target="_blank" href="">Yuse Paper</a>
                        </li>
                        <li>
                            <a target="_blank" href="">Governance</a>
                        </li>
                        <li>
                            <a target="_blank" href="">Community</a>
                        </li>
                        <li>
                            <a target="_blank" href="">Security Policy</a>
                        </li>
                        <li>
                            <a target="_blank" href="">Ask me Anything</a>
                        </li>
                    </ul>
                </Col>
                <Col md={3} className="for-subscrib-box">
                   <h5>Stay up to date</h5>
                   <p>Stay updated with YuseCoins news, zero spam, we promise.</p>
                   <h5 className="mt-5">Subscribe</h5>
                      <div className="subscribe-form">
                            <input
                            type="email"
                            name="email"
                            value={newsLetter}
                            onChange={(e)=>setNewsLetter(e.target.value)}
                           
                            placeholder="Email Address"
                            required
                            className="form-control subscribe_form-text"
                            
                            />
                            <button
                            type="submit"
                            className="fa fa-telegram subbtn"
                            style={{ fontSize: "20px" }}
                            onClick={()=>{
                                emailHandler()
                            }}
                            
                            />
                        </div >

                        <div className="social_icon pt-3 mb-3">
                            <a
                                 href="https://twitter.com/"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                >
                                    <img
                                    style={{ margin: "4px" }}
                                    src="../../assets/images/twitter.png"
                                    height="22px"
                                    />
                                </a>
                                <a
                                    href="https://instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                    style={{ margin: "4px" }}
                                    src="../../assets/images/instagram.png"
                                    height="22px"
                                    />
                                </a>
                                <a
                                    href="https://discord.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                    style={{ margin: "4px" }}
                                    src="../../assets/images/discord.png"
                                    height="22px"
                                    />
                                </a>
                                <a
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                    style={{ margin: "4px" }}
                                    src="../../assets/images/linkedin.png"
                                    height="22px"
                                    />
                                </a>
                                <a
                                    href="https://telegram.me/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                    style={{ margin: "4px" }}
                                    src="../../assets/images/telegram.png"
                                    height="22px"
                                    />
                                </a>
                                <a
                            href="https://www.youtube.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            <img
                                src="../../assets/images/youtube.png"
                                height="26px"
                            />
                            </a>
                        </div>
                </Col>
                </Row>

                <div className="row mt-5">
                    <div className="col-sm-6">
                    <div className="copyright ">
                        © 2022 <span>Yuse Token.</span> All rights reserved
                    </div>
                    </div>
                    <div className="col-sm-6 ">
                    <h6 className="tnc-link">
                        <a target="_blank" href="">Terms &amp; Conditions </a> |{" "}
                        <a target="_blank" href="">Privacy Policy</a>
                    </h6>
                    </div>
                </div>
            </Container>
        </section>
        </>
    )
}