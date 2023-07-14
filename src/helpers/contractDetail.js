import Web3 from "web3"
import TokenABI from "../ABI/ERC20TokenAbi.json"
import NFTABI from "../ABI/NFTAbi.json"

const CyTestABI = TokenABI;

const NFTABi = NFTABI;

let web3js;

export const CheckContract = async (contract, chain) => {
  try
  {
    if (chain == "97") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"));
	} else if (chain == "1") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/a0c5c687788b471093524af62e5e1cec"));
	} else if (chain == "137") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com"));
	} else if (chain == "97") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"));
	} else if (chain == "5") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/a0c5c687788b471093524af62e5e1cec"));
	} else if (chain == "80001") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://matic-mumbai.chainstacklabs.com"));
	} else {
		web3js = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"));
	}

    var tokenContract = new web3js.eth.Contract(CyTestABI, contract);


    let Name = await tokenContract.methods.name().call()
	console.log(Name,"chain=================2323==============")

    let Symbol = await tokenContract.methods.symbol().call()
	console.log(Symbol,"chain=================2323==============")

    let Decimal = await tokenContract.methods.decimals().call()
	console.log(Decimal,"chain=================2323==============")
    let obj = {
        Name, Symbol, Decimal
    }
    return obj;

  }
  catch (error)
  {
	console.log(error);
    //   throw error 
  }

};

export const CheckNFTContract = async (contract, chain) => {
	try
	{
	  if (chain == "56") {
		  web3js = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/"));
	  } else if (chain == "1") {
		  web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/a0c5c687788b471093524af62e5e1cec"));
	  } else if (chain == "137") {
		  web3js = new Web3(new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com"));
	  } else if (chain == "97") {
		  web3js = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"));
	  } else if (chain == "5") {
		  web3js = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/a0c5c687788b471093524af62e5e1cec"));
	  } else if (chain == "80001") {
		  web3js = new Web3(new Web3.providers.HttpProvider("https://matic-mumbai.chainstacklabs.com"));
	  } else {
		  web3js = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"));
	  }
  
	  const caddress = web3js.utils.toChecksumAddress(contract);

	  var tokenContract = new web3js.eth.Contract(NFTABi, caddress);
  
  
	  let Name = await tokenContract.methods.name().call()

	  let Symbol = await tokenContract.methods.symbol().call()
	  
	  let obj = {
		  Name, Symbol
	  }
	  return obj;
  
	}
	catch (error)
	{
		console.log(error);
		throw error 
	}
  
  };