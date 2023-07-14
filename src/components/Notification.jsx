import React, { useState,useEffect } from 'react'
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';

export const Notification = (props) => {
    
    // alert(message)

    const [commonModel , setCommonModel] = useState(false)
    // console.log(props.action_mo);
    useEffect(()=>{
      if(props.action_mo == true){
        // console.log(props.action_mo);
        setCommonModel(true)
        setTimeout(() => {
          handleCommonModel()
        }, 4000);
      }

    },[props.message_mo , props.action_mo , props.random_val])
    const handleCommonModel = ()=>{
      setCommonModel(false)
      // props.action_mo = false
    }
    const handleCommonModelOp = ()=>{
      setCommonModel(true)
  }

    return (
    <>
        <Modal
         style={{opacity:1}}
          show={commonModel}
          onHide={handleCommonModel}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="sm"
          className="modal-comming-soon"
        >
          <Modal.Header style={{borderBottom:"1px solid #a77327"}} closeButton={handleCommonModel}></Modal.Header>
          <Modal.Body>
            <h4 className="text-white text-center" style={{fontSize:"22px"}}> {props.message_mo}</h4>
          </Modal.Body>
        </Modal>
        
    
    </>
    )
}
