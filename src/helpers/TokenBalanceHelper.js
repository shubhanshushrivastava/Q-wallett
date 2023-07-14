import Web3 from "web3"
import TokenABI from "../ABI/ERC20TokenAbi.json"

const ABI = TokenABI;

let web3js;

const Tokenbalance = async (publickey, chain, contract) => {
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
	try {
		let Token_balance = 0;
		let gasprice = 0;
		let gaslimit = 0;
		let nonce = 0;
		var tokenContract = new web3js.eth.Contract(ABI, contract);
		let decimal = await tokenContract.methods.decimals().call()
		let balance = await tokenContract.methods.balanceOf(publickey).call()
		Token_balance = balance / Math.pow(10, decimal);
		nonce = await web3js.eth.getTransactionCount(
			publickey,
			"latest"
		);
		let estimates_gas = await web3js.eth.estimateGas({
			'from': publickey,
			'to': contract,
			'data': tokenContract.methods.transfer(publickey, balance).encodeABI(),
		});

		gaslimit = web3js.utils.toHex(estimates_gas * 2);
		let gasPrice_bal = await web3js.eth.getGasPrice();
		gasprice = web3js.utils.toHex(gasPrice_bal * 2);
		gaslimit = parseInt(gaslimit);
		gasprice = parseInt(gasprice);
		let obj = {
			Token_balance,gasprice,gaslimit,nonce
		}
		return obj;
	}
	catch (error) {
		throw error
	}

};


export default Tokenbalance
