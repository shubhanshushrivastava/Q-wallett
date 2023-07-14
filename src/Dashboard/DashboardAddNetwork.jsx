import React from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";



export default function DashboardAddNetwork() {

    return (
        <>
            <HomeHeaderOther />
            <section id="dash_home">
                <Container>
                    <Row className="dash_row1">
                        <Col lg={10} className="d-flex align-items-center">
                            <div className="dash_box w-100">
                                <Row className="main1">
                                    <Col lg={4}>
                                        <img src="/assets/images/Dashboardimg/Icon (2).png"
                                            alt="" />
                                        <h4>Settings</h4>
                                    </Col>
                                    <Col lg={4} className="set_gen1">
                                        <InputGroup className="">
                                            <InputGroup.Text id="basic-addon1"><img src="/assets/images/Dashboardimg/Icon (3).png" alt="" /></InputGroup.Text>
                                            <FormControl
                                                type="text" placeholder="Search in settings"
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="set_gen2 mt-5">
                                    <Col lg={3}>
                                        <div className="side_set">
                                            <ul>
                                                <li>General</li>
                                                <li>Advanced</li>
                                                <li>Security & Privacy</li>
                                                <li>Alerts</li>
                                                <li>Networks</li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col lg={9}>
                                        <div className="rit_set">
                                            <Row>
                                                <Col lg={4}>
                                                    <h2>
                                                    Add a Network
                                                    </h2>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="network_contant">
                                            <h3>Network Name</h3>
                                            <InputGroup >
                                            <FormControl className="net_input"
                                                type="text" placeholder="Network Name"
                                            />
                                        </InputGroup>
                                        <h3>New RPC URL</h3>
                                            <InputGroup >
                                            <FormControl className="net_input"
                                                type="text" placeholder="New RPC URL"
                                            />
                                        </InputGroup>
                                        <h3>Chain ID</h3>
                                            <InputGroup >
                                            <FormControl className="net_input"
                                                type="text" placeholder="Chain ID"
                                            />
                                        </InputGroup>
                                        <h3>Currency Symbol</h3>
                                            <InputGroup >
                                            <FormControl className="net_input"
                                                type="text" placeholder="Currency Symbol"
                                            />
                                        </InputGroup>
                                        <h3>Block Explorer URL(Optional)</h3>
                                            <InputGroup >
                                            <FormControl className="net_input"
                                                type="text" placeholder="Block Explorer URL"
                                            />
                                        </InputGroup>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}