import axios from "axios";

let api;
let explorer;
let imgLogo;
const OtherTransaction = async (publickey, chain) => {
	if (chain == "1") {
		imgLogo = "https://etherscan.io/images/ethereum-icon.png"
		explorer = "https://etherscan.io/"
		api = `https://api.etherscan.io/api?module=account&action=txlist&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else if (chain == "5") {
		imgLogo = "https://etherscan.io/images/ethereum-icon.png"
		explorer = "https://goerli.etherscan.io/"
		api = `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else if (chain == "56") {
		imgLogo = "https://bscscan.com/images/svg/brands/bnb.svg"
		explorer = "https://bscscan.com/"
		api = `https://api.bscscan.com/api?module=account&action=txlist&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else if (chain == "97") {
		imgLogo = "https://bscscan.com/images/svg/brands/bnb.svg"
		explorer = "https://testnet.bscscan.com/"
		api = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else if (chain == "137") {
		imgLogo = "https://mumbai.polygonscan.com/images/svg/brands/poly.png"
		explorer = "https://polygonscan.com/"
		api = `https://api.polygonscan.com/api?module=account&action=txlist&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else if (chain == "80001") {
		imgLogo = "https://mumbai.polygonscan.com/images/svg/brands/poly.png"
		explorer = "https://mumbai.polygonscan.com/"
		api = `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	} else {
		imgLogo = "https://bscscan.com/images/svg/brands/bnb.svg"
		explorer = "https://testnet.bscscan.com/"
		api = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${(publickey).toLowerCase()}&sort=desc&tag=latest&apikey=`
	}
	try {
		let mainTransaction = [];
		await axios.post(api)
			.then((Transactions_res) => {
				if (Transactions_res.data.status == "1") {
					let transactions = Transactions_res.data.result;
					transactions.forEach(element => {
						if (element.input == "0x" && Number(element.value) > 0) {
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


export default OtherTransaction;
