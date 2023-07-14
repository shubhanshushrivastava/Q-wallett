import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import './accountSetting.css'
import { Link, Navigate } from 'react-router-dom';
import HomeHeaderOther from '../components/UI/HomeHeaderOther'

import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { decryptData } from './../helpers/encryption';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export default function AccountHistory() {
    const navigate = useNavigate();
   
    const [cookies, setCookie] = useCookies(['walletList']);
    const [walletList, setWalletList] = useState([]);
    const [walletAddre_name, setWalletAddre_name] = useState(Cookies.get("default_wallet_name"));
    const [walletAddre, setWalletAddre] = useState(Cookies.get("address"));
    const [wallet_default, setwallet_default] = useState({
        wallet_name: '',
        address: '',
        mnemonic: '',
        privateKey: ''

    })
    useEffect(async () => {

        const pass = Cookies.get("otp");
        const keyForPin = await decryptData(pass, "R#9gK7@L5mN4qP1jH3*");

        const a = Cookies.get("encryptedSeedPhrase")
        console.log(a, 'mko')
        const decryptedKeyasas = await decryptData(a, keyForPin);
        const decryptedKeysdsd = await decryptData(Cookies.get("privatekey"), keyForPin);
        setwallet_default({
            wallet_name: walletAddre_name,
            address: walletAddre,
            mnemonic: decryptedKeyasas,
            privateKey: decryptedKeysdsd
        })

    }, [])


    useEffect(() => {
        // Load wallet list from cookies when the component mounts
        if (cookies.walletList) {
            setWalletList(cookies.walletList);
        }

    }, []);
    console.log(walletList, 'wallet_defaultwallet_defaultwallet_defaultwallet_default')
const handleConfirm=(data)=>{
    navigate('/confirm-history',{state:{walletdata:data}})
}
   
    return (
        <>
            <HomeHeaderOther />

            <div className=' set-account-height' id="dash_home">
                <Container>
                    <Row className='justify-content-center'>
                        <Col md="6">
                            <div className='dash_box box-shadow-account'>
                                <div className='setting-button-set'>
                                    <h3>My Account</h3>

                                    {/* <div className="inner-links">
                                        <div>My Accounts</div>
                                        <div><i className='fa fa-arrow-right' aria-hidden="true"></i></div></div> */}


                                    <div style={{ padding: '20px' }}>
                                        <div className="small-heading"></div>
                                     {/* <div className="inner-links" onClick={()=>handleConfirm(wallet_default)}>
                                            <div>{wallet_default?.wallet_name ? wallet_default?.wallet_name :'Main Account'}</div>
                                            <div><i className='fa fa-arrow-right' aria-hidden="true"></i></div></div> */}
                                        {walletList &&
                                            walletList?.map((items, index) => {
                                                { console.log(items, "Wallet items") }

                                                return (
                                                    <div className="inner-links" onClick={()=>handleConfirm(items)}>
                                                        <div>{items?.wallet_name}</div>
                                                        <div><i className='fa fa-arrow-right' aria-hidden="true"></i></div></div>

                                                );
                                            })}
                                    </div>
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
