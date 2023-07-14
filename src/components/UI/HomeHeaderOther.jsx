import React, { useState, useEffect } from "react";
import {
  InputGroup,
  FormControl,
  Dropdown,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Navbar, Row, Container, Nav, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/authReducers";


export default function HomeHeaderOther() {
  const navigate = useNavigate();
  const [showModal1, setShowmodal1] = useState();

  const [showModal2, setShowmodal2] = useState(false);

  const dispatch = useDispatch();
  const handleModalClose1 = () => {
    setShowmodal1(false);
  };


  const handleModelLogout = () => {

    setShowmodal2(true)
  }
  const handle_logout = () => {


    const cookies = document.cookie.split(";");

    // Loop through cookies and delete them
    // cookies.forEach(cookie => {
    //   const [name] = cookie.split("=");
    //   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // });
    // dispatch(logout());
    navigate("/")
  };
  return (
    <>
      <header className="main-header dash-header">
        <Navbar expand="lg" style={{ border: "none" }} sticky="top">
          <Container>
            <div className="d-flex align-items-center justify-content-between w-100">
              <Navbar.Brand
                onClick={() => {
                  navigate("/");
                }}
              >
                <img width={"140px"} src="assets/images/Homeimg/logo.png" />
              </Navbar.Brand>
              <Button
                onClick={() => {
                  handleModelLogout();
                }}
                className="Logout-btn common-btn"
              >
                Logout
              </Button>
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
                  <Modal.Title>Warning</Modal.Title>
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

                    </div>

                    {/* <div style={{ display: "flex", justifyContent: "center" }}>
                 
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
                </div> */}
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
                  {/* <h1>Create Account</h1> */}
                </Modal.Header>
                <Modal.Body>
                  <div className="text-center dashboard-popup">

                    <div className="text-center">
                      <h4>Are you want to logout</h4>

                    </div>
                    <div style={{display:'flex'}}>
                      <Button
                        onClick={() => {
                          handle_logout();
                        }}
                        className="Logout-btn common-btn"
                      >
                        Yes,I want
                      </Button>

                      <Button
                        onClick={() => {
                          setShowmodal2(false)
                        }}
                        className="Logout-btn common-btn"
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>


            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
