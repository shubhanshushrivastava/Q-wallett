import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RegiesterHead from "../components/UI/RegiesterHead";
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';
import { decryptSeedPhrase } from "../helpers/SeedPhraseVerify";
import { decryptData } from "../helpers/encryption";

export const Verifyphrase = () => {
  const { state } = useLocation("/secret-phrase");
  const { deviceKey, pin, seedArr } = state || "";
  const [showData, setShowData] = useState([]);
  const [addData, setAddData] = useState([]);
  const [checkForValid , setCheckForValid] = useState("");
    const navigate = useNavigate()



  useEffect(() => {
    const charArray = seedArr.split(" ");
    for (let i = charArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
    }
    setShowData(charArray);
  }, []);

  const HandleReArrange = (e) => {
    const removeData = showData.filter((items, index) => {
      return items !== e;
    });
    const AddData = showData.filter((items, index) => {
      if (items === e) {
        let sideArray = [...addData, items];
        setAddData(sideArray);
      }
      return;
    });
    setShowData(removeData);
  };

  const HandleFinalArray = (e) => {
    const removeData = addData.filter((items, index) => {
      return items !== e;
    });
    const AddData = addData.filter((items, index) => {
      if (items === e) {
        let sideArray = [...showData, items];
        setShowData(sideArray);
      }
    });
    setAddData(removeData);
  };

  useEffect(()=>{
      const finalString = addData.map((items, index) => {
        return `${items}`; 
    }).join(" "); 
    setCheckForValid(finalString)
  },[addData , showData])

  const FinalVerify = async () => {
    const checkForLength = seedArr.split(" ")
    if(addData?.length === checkForLength?.length){
      if(seedArr === checkForValid){
        const pass = Cookies.get('otp');
        
        const keyForPin = await decryptData(pass,"R#9gK7@L5mN4qP1jH3*");
        console.log("otp saved in cookies=========",keyForPin) // Retrieve the encrypted seed phrase from the cookie
        const encryptedSeedData = Cookies.get('encryptedSeedPhrase'); // Retrieve the encrypted seed phrase from the cookie
        const decryptedSeedPhrase =  decryptSeedPhrase(encryptedSeedData,keyForPin);

        try{ 
          const finalString = addData.map((items, index) => {
            return `${items}`;           
        }).join(" "); 
        console.log("final string ==============",finalString)
                 
       if( finalString  === decryptedSeedPhrase){ 
            toast.success("Wallet created successfully") 
            navigate("/dashboard_home")
          }  
        }catch(err){
          console.log(err);
        }
      }else{
        toast.error("Invalid format please rearrange")
      }
  }else{
    toast.warn("Please arrange all words")
  }
  }
  return (
    <>
      <RegiesterHead />
      <section className="signup-sec" id="sign_up">
        <ToastContainer/>
        <Container>
          <Row className="mt-5">
            <Col className="d-flex align-items-center m-auto" lg={6}>
              <div className="box w-100">
                {/* <div className="create-box-img">
                                    <img src="assets/images/coin-video-bg.png" alt="" />
                                </div> */}
                <h1>Your Secret phrase</h1>
                <p>
                  White down or copy these words in the right order and save{" "}
                  <br /> them somewhere safe.
                </p>
                <div className="bitter-select after-select">
                  {addData?.length > 0 &&
                  addData !== null &&
                  addData !== undefined
                    ? addData.map((items, index) => {
                        return (
                          <p>
                            {index + 1} {items}{" "}
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                HandleFinalArray(items);
                              }}
                            >
                              <i className="fa fa-close"></i>{" "}
                            </a>
                          </p>
                        );
                      })
                    : "please select your key"}
                  {/* <p>
                    2 ball{" "}
                    <a href="">
                      <i className="fa fa-close"></i>{" "}
                    </a>
                  </p>
                  <p>
                    3 cover{" "}
                    <a href="">
                      <i className="fa fa-close"></i>{" "}
                    </a>
                  </p> */}
                  {/* <p>
                    4 coin{" "}
                    <a href="">
                      <i className="fa fa-close"></i>{" "}
                    </a>
                  </p>
                  <p>
                    5 truck{" "}
                    <a href="">
                      <i className="fa fa-close"></i>{" "}
                    </a>
                  </p> */}
                </div>

                <div className="msg-box-wallet-create">
                  {checkForValid === seedArr ? <p className="failed-msg">Well done please continue</p> : <p className="failed-msg">Invalid order. try again!</p>}
                  {/* <p className="success-msg">Well done!</p> */}
                </div>

                <div className="bitter-select">
                  {showData?.length > 0 &&
                  showData !== null &&
                  showData !== undefined
                    ? showData.map((items, index) => {
                        return (
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              HandleReArrange(items);
                            }}
                          >
                            {items}
                          </a>
                        );
                      })
                    : ""}
                  {/* <a href="">2 crush</a>
                  <a href="">3 analyst</a>
                  <a href="">4 dune</a>
                  <a href="">5 ball</a>
                  <a href="">6 cover</a>
                  <a href="">7 gun</a>
                  <a href="">8 coin</a>
                  <a href="">9 truck</a>
                  <a href="">10 slot</a>
                  <a href="">11 crisp</a>
                  <a href="">12 spoil</a> */}
                </div>

                <Button variant="primary" className="sub_btn" onClick={()=>{FinalVerify()}}>
                  Continue
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
