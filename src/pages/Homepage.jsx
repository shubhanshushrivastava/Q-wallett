import React, { useState, useEffect } from "react";
import HomeLayout from "../components/UI/HomeLayout";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import axiosMain from "../api";
import Slider from "react-slick";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducers/authReducers";
import { useDispatch } from "react-redux";

export default function Homepage() {

    const dispatch = useDispatch()

    const [showModal29, setShowModal29] = useState(false)
    const handleModalClose29 = () => {
        setShowModal29(false)
    }

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
    };


    const user_visted = async () => {
        const payload = {
            site_category: "Yuse-wallet-Netlify"
        }
        const response = await axiosMain.post("/user-visit", payload)
        console.log(response);
    }

    const [rate, setRate] = useState();
    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin%2Cethereum%2Ctether%2Cbinancecoin%2Cmatic-network%2Csolana&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
            )
            .then((res) => {
                setRate(res.data);
            });
    }, []);

    useEffect(() => {
        user_visted()
    }, [])
    useEffect(()=>{
        const data_for_jwt = sessionStorage.getItem("jwt" , "enable") 
        if(data_for_jwt !== "enable"){
            dispatch(logout())
        }
    },[])
    return (
        <>
            <HomeLayout>
                <section className="banner-section">
                    <Container>
                        <Row>
                            <Col md={10}>
                                <div>
                                    <h1>The best way to try and learn Cryptocurrency</h1>
                                    <h6>Your one stop solution to hold YuseCoins and use them throughout our ecosystem. You can Buy, Store, Send and Swap YuseCoins with Yusewallet!
                                    </h6>
                                    {/* join now btn */}
                                    {/* <div>

                                        <a href className="common-btn ml-0">Create Account</a>
                                        <a href className="gradient-border-btn">Create Account</a>
                                    </div> */}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="crypto-type-sec">
                    <Container>
                        <Row>
                            {rate &&
                                rate.map((items, index) => {
                                    return (
                                        <Col md={4} key={index}>
                                            <div className="crypto-inne-box"
                                            >
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <img src={items.image} style={{ maxWidth: "35px" }} />
                                                    <Link to="/dashboard_home" className="common-btn ml-0">Buy</Link>
                                                    {/* <Link to="/dashboard_home" className="gradient-border-btn">Trade</Link> */}
                                                </div>
                                                <h5>{(items.id).toUpperCase()}<span>{" "}{(items.symbol).toUpperCase()} </span></h5>
                                                <h3><span>{items.current_price}</span>
                                                    {items.price_change_percentage_24h > 0 ? (
                                                        <>
                                                            <span> <img src="assets/images/Homeimg/graph.png" /></span>
                                                            <small>({items.price_change_percentage_24h.toFixed(3)}%)</small>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span> <img src="assets/images/Homeimg/graph.png" /></span>
                                                            <small style={{ color: "red" }} >({items.price_change_percentage_24h.toFixed(3)}%)</small>
                                                        </>
                                                    )}
                                                </h3>
                                            </div>
                                        </Col>
                                    );
                                })}
                        </Row>
                        {/* <Row style={{ marginTop: "15px" }}>
                            <Col md={4}>
                                <div className="crypto-inne-box"
                                >
                                    <div className="d-flex align-items-center justify-content-between">
                                        <img src="assets/images/Homeimg/btc.png" />
                                        <a href="" className="common-btn ml-0">Buy</a>
                                        <a href="" className="gradient-border-btn">Trade</a>
                                    </div>
                                    <h5>MATIC <span>MATIC</span></h5>
                                    <h3><span>$354.976.00</span> <span> <img src="assets/images/Homeimg/graph.png" /></span> <small>1,18%</small></h3>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="crypto-inne-box" >
                                    <div className="d-flex align-items-center justify-content-between">
                                        <img src="assets/images/Homeimg/eth.png" />
                                        <a href="" className="common-btn ml-0">Buy</a>
                                        <a href="" className="gradient-border-btn">Trade</a>
                                    </div>
                                    <h5>Solana <span>SOL</span></h5>
                                    <h3><span>$354.976.00</span> <span> <img src="assets/images/Homeimg/graph.png" /></span> <small>1,18%</small></h3>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="crypto-inne-box" >
                                    <div className="d-flex align-items-center justify-content-between">
                                        <img src="assets/images/Homeimg/bnb.png" />
                                        <a href="" className="common-btn ml-0">Buy</a>
                                        <a href="" className="gradient-border-btn">Trade</a>
                                    </div>
                                    <h5>Tether <span>THE</span></h5>
                                    <h3><span>$354.976.00</span> <span> <img src="assets/images/Homeimg/graph.png" /></span> <small>1,18%</small></h3>
                                </div>
                            </Col>
                        </Row> */}
                    </Container>
                </section>


                <section id="features" className="crypto-type-sec feature-sec">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div id="features">
                                    <h2 className="white-heading text-center">The Features we also have for you</h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <div className="feature-box" >
                                    <img src="assets/images/Homeimg/feature1.png" />
                                    <h4>Security</h4>
                                    <p>We have a strong security system and ensure your account will remain secure</p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="feature-box" >
                                    <img src="assets/images/Homeimg/feature2.png" />
                                    <h4>Speed</h4>
                                    <p>We have more than 30 matching machines with an accuracy rate of 98.99%</p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="feature-box" >
                                    <img src="assets/images/Homeimg/feature3.png" />
                                    <h4>Monitoring</h4>
                                    <p>You can monitor your account 24 hours, as this can be opened anywhere.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section id="product" className="crypto-type-sec phone-sec">
                    <Container>
                        <Row className="align-items-center">
                            <Col className="m-auto" md={5}>
                                <div className="text-center">
                                    <img className="img-fluid" src="assets/images/Homeimg/Quest_iPhone_X.png" />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="poartfolio-box" >
                                    <h4>Crypto World with Yuse wallet App</h4>
                                    <ul>
                                        <li> <img className="img-fluid" src="assets/images/Homeimg/check.png" />Manage multiple crypto wallets with Yuse Wallet App</li>
                                        <li> <img className="img-fluid" src="assets/images/Homeimg/check.png" />Buy & Exchange Crypto Instantly</li>
                                        <li> <img className="img-fluid" src="assets/images/Homeimg/check.png" />Inbuilt with Multi chain/cryptocurrency </li>
                                        <li> <img className="img-fluid" src="assets/images/Homeimg/check.png" />Easily create, import & connect wallets</li>
                                        <li> <img className="img-fluid" src="assets/images/Homeimg/check.png" />Get all transaction history within the app</li>

                                    </ul>
                                </div>
                                <div className="play-store-btn">
                                    <button type="button" onClick={() => {
                                        setShowModal29(true)
                                    }} className="btn">
                                        <img src="assets\images\Homeimg\google-play-store.png" alt="" className="img-fluid app-img" />
                                    </button>
                                    <button type="button" onClick={() => {
                                        setShowModal29(true)
                                    }} className="btn">
                                        <img src="assets\images\Homeimg\app-store.png" alt="" className="img-fluid app-img" />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section id="testimonials" className="crypto-type-sec testimonial-sec">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div>
                                    <h2 className="white-heading text-center">What’s Customer Says</h2>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="m-auto" lg={10} md={12}>
                                <Slider {...settings}>
                                    <Row className="align-items-center">
                                        <Col md={8}>
                                            <div className="text-left customer-box" >
                                                <p>I've been using Yuse Wallet so far. It is the most secured platform for crypto exchange. Perfect for both beginners & Expert, easy to use interface, offer wide range of features.</p>
                                                <h6>Elvina Wijayanto</h6>
                                                {/* <p>UI Designer</p> */}
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div >
                                                <img style={{ height: "300px" }} className="img-fluid" src="assets\images\Homeimg\laura-chouette-nkWnc-W_GP8-unsplash.jpg" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="align-items-center">
                                        <Col md={8}>
                                            <div className="text-left customer-box" >
                                                <p>Yu Wallet is one of the best trusted wallet where you can easily exchange cryptos as per your choice. Simple, Easy, and Quick. The best quality of wallet is P2P which is very secure, keeps your assets  safe from hackers & scammers. </p>
                                                <h6>Kellsie Seminarioe</h6>
                                               {/* <p>UI Designer</p> */}
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div >
                                                <img style={{ height: "300px" }} className="img-fluid" src="assets/images/Homeimg/linkedin-sales-solutions-pAtA8xe_iVM-unsplash (1).jpg" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="align-items-center">
                                        <Col md={8}>
                                            <div className="text-left customer-box" >
                                                <p>Amazing trust wallet, offers lot of services, highly recommendable. Easy to use platform, you can easily purchase NFTs, see your collectibles. Art & NFTs in one place. </p>
                                                <h6>Braxton</h6>
                                                {/* <p>UI Designer</p> */}
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div >
                                                <img style={{ height: "300px" }} className="img-fluid" src="assets\images\Homeimg\m-brauer-W49xnqoy6oc-unsplash.jpg" />
                                            </div>
                                        </Col>
                                    </Row>
                                </Slider>
                            </Col>
                        </Row>



                        {/* <Modal
                            show={showModal1}
                            onHide={handleModalClose1}
                            backdrop="static"
                            keyboard={false}
                            animation={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              this is model 1
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleModalClose1}>
                                    Close
                                </Button>
                                <Button variant="primary">Understood</Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal
                            show={showModal2}
                            onHide={handleModalClose2}
                            backdrop="static"
                            keyboard={false}
                            animation={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                               this is model 2
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleModalClose2}>
                                    Close
                                </Button>
                                <Button variant="primary">Understood</Button>
                            </Modal.Footer>
                        </Modal> */}

                        <Modal
                            show={showModal29}
                            onHide={handleModalClose29}
                            backdrop="static"
                            keyboard={false}
                            animation={false}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            size="sm"
                            className="modal-comming-soon"
                        >
                            <Modal.Header closeButton={handleModalClose29}></Modal.Header>
                            <Modal.Body>
                                <h2 className="text-white text-center">Coming Soon....!!!</h2>
                            </Modal.Body>
                        </Modal>
                    </Container>
                </section>
            </HomeLayout>
        </>
    )
}