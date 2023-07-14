import React from 'react'
import HomeHeaderOther from '../components/UI/HomeHeaderOther'
import { Col, Container, Row } from 'react-bootstrap'

const MyAccounts = () => {
  return (
    <>
    <HomeHeaderOther/>
        <div className=' set-account-height' id="dash_home">
            <Container>
                <Row className='justify-content-center'>
                    <Col md="6">
                        <div className='dash_box box-shadow-account'>
                            <div className='account-detail-box'>
                                <div className='d-flex gap-2 align-items-center'>
                                    <div className='image-inner'>
                                        {/* <img src='' className='img-fluid'/> */}
                                        <i className='fa fa-user' aria-hidden="true"></i>
                                    </div>
                                    <h4 className='account-head-name'> Account 1</h4>
                                </div>
                                <div className=''>
                                    <img src='/assets/images/Dashboardimg/Icon.png' className='img-fluid'/>
                                </div>
                            </div>
                            <div className='account-detail-box'>
                                <div className='d-flex gap-2 align-items-center'>
                                    <div className='image-inner'>
                                        {/* <img src='' className='img-fluid'/> */}
                                        <i className='fa fa-user' aria-hidden="true"></i>
                                    </div>
                                    <h4 className='account-head-name'> Account 1</h4>
                                </div>
                                <div className=''>
                                    <img src='/assets/images/Dashboardimg/Icon.png' className='img-fluid'/>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    {/* </HomeHeaderOther> */}
    </>
  )
}

export default MyAccounts
