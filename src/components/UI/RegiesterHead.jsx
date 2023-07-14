import React from "react";
import { Navbar, Container,  Nav, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';




export default function RegiesterHead() {
 
    return (
        <>
            <header className="main-header dash-header">
            <Navbar  expand="lg" style={{border:"none"}} sticky="top">
                <Container>
                   <div className="d-flex align-items-center justify-content-between w-100">
                   <Navbar.Brand href="/">
                        <img width={"140px"} src="assets/images/Homeimg/logo.png" />
                    </Navbar.Brand>
                   </div>
                </Container>
            </Navbar>
            </header>
        </>
    )
}