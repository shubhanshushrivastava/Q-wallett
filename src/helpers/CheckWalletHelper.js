import Web3 from "web3"


const web3js = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/"));

const CheckWallet = async (publickey) => {
    console.log("public key", publickey);
  try
  {
    let wallet = web3js.utils.isAddress(publickey)
    return wallet

  }
  catch (error)
  {
      throw error 
  }

};


export default CheckWallet
