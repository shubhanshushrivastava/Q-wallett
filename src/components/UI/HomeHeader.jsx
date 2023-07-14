import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { decryptData } from './../../helpers/encryption';

export default function HomeHeader() {
  const pass = Cookies.get("otp");
  const [cookiesOtp, setcookiesOtp] = useState('')
  const navigate = useNavigate();
  const {
    value: { isAuthenticated },
    metaMaskWallet,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    getOtp()
  }, [pass])
  const getOtp = async () => {
    if (pass) {
      const keyForPin = await decryptData(pass, "R#9gK7@L5mN4qP1jH3*");

      setcookiesOtp(keyForPin)
    }

    // console.log(keyForPin, '80809090909')
  }

  return (
    <>
      <header className="main-header">
        <Navbar expand="lg" sticky="top">
          <Container>
            <Row className="w-100">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <Navbar.Brand
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <img width={"140px"} src="assets/images/Homeimg/logo.png" />
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto m-auto">
                      <Nav.Link className="active" href="/">
                        Home
                      </Nav.Link>
                      <Nav.Link href="#features">Features</Nav.Link>
                      <Nav.Link href="#product">Product</Nav.Link>
                      <Nav.Link href="#testimonials">Testimonials</Nav.Link>
                      <Nav.Link href="/contact-us">Contact</Nav.Link>
                    </Nav>
                    {/* dropdown */}

                    <Link to="/create-wallet" className="common-btn">
                      Create Wallet
                    </Link>

                    (<Link to="/enter-pin-seed" className="common-btn">
                      Import Wallet
                    </Link>)
                    {cookiesOtp ? <Link to="/confirm_login" className="common-btn"> Login  </Link> : ''}



                  </Navbar.Collapse>
                </div>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
