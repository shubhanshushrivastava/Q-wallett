import axios from "axios";

let api;
let explorer;
let imgLogo;
const OtherTokenTransaction = async (publickey, chain,contract) => {
	if (chain == "1") {
		imgLogo = "https://etherscan.io/images/ethereum-icon.png"
		explorer = "https://etherscan.io/tx/"
		api = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${(contract).toLowerCase()}&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else if (chain == "5") {
		imgLogo = "https://etherscan.io/images/ethereum-icon.png"
		explorer = "https://goerli.etherscan.io/tx/"
		api = `https://api-goerli.etherscan.io/api?module=account&action=tokentx&contractaddress=${(contract).toLowerCase()}&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else if (chain == "56") {
		imgLogo = "https://bscscan.com/images/svg/brands/bnb.svg"
		explorer = "https://bscscan.com/tx/"
		api = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${(contract).toLowerCase()}&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else if (chain == "97") {
		imgLogo = "https://bscscan.com/images/svg/brands/bnb.svg"
		explorer = "https://testnet.bscscan.com/tx/"
		api = `https://api-testnet.bscscan.com/api?module=account&action=tokentx&contractaddress=${(contract).toLowerCase()}&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else if (chain == "137") {
		imgLogo = "https://mumbai.polygonscan.com/images/svg/brands/poly.png"
		explorer = "https://polygonscan.com/tx/"
		api = `https://api.polygonscan.com/api?module=account&action=tokentx&contractaddress=${(contract).toLowerCase()}&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else if (chain == "80001") {
		imgLogo = "https://mumbai.polygonscan.com/images/svg/brands/poly.png"
		explorer = "https://mumbai.polygonscan.com/tx/"
		api = `https://api-testnet.polygonscan.com/api?module=account&action=tokentx&contractaddress=${(contract).toLowerCase()}&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else {
		imgLogo = "https://bscscan.com/images/svg/brands/bnb.svg"
		explorer = "https://testnet.bscscan.com/tx/"
		api = `https://api-testnet.bscscan.com/api?module=account&action=tokentx&contractaddress=${(contract).toLowerCase()}&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	}
	try {
		let mainTransaction = [];
		await axios.post(api)
			.then((Transactions_res) => {
				// console.log(Transactions_res);
				if (Transactions_res.data.status == "1") {
					let transactions = Transactions_res.data.result;
					transactions.forEach(element => {
						if (Number(element.value) > 0) {
							mainTransaction.push(element)
						}
					});
				}
			})
			let obj = {
				mainTransaction, explorer,imgLogo
			}
			return obj;
	}
	catch (error) {
		console.log(error);
	}
};
 

export default OtherTokenTransaction;
