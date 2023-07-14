import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import './accountSetting.css'
import { Link, Navigate } from 'react-router-dom';
import HomeHeaderOther from '../components/UI/HomeHeaderOther'

import { Col, Container, Row } from 'react-bootstrap';

export default function AccountSetting() {

  const handlePolicy = () => {
    window.open('https://yusetoken.io/yuse-privacy-policy/', '_blank');
  }
  return (
    <>
    <HomeHeaderOther/>

      <div className=' set-account-height' id="dash_home">
        <Container>
          <Row className='justify-content-center'>
            <Col md="6">
              <div className='dash_box box-shadow-account'>
                <div className='setting-button-set'>
                  <h3>Account Settings</h3>
                  <div className="inner-links" onClick={handlePolicy}>
                    <div>Privacy Policy</div>
                    <div><i className='fa fa-arrow-right' aria-hidden="true"></i></div>
                  </div>
                  <Link to="/account-history"> <div className="inner-links">
                    <div>My Accounts</div>
                    <div><i className='fa fa-arrow-right' aria-hidden="true"></i></div></div></Link>
                  <div className="small-heading">Not updated yet...</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header
          >
            <Modal.Title>Account Setting</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Stack gap={5}>
              <div className="p-2" onClick={handlePolicy}>Privacy Policy</div>
              <div className="p-2">My Accounts</div>
              <div className="p-2">Not updated yet...</div>
            </Stack>
          </Modal.Body>


        </Modal.Dialog>
      </div> */}
    </>
  )
}
